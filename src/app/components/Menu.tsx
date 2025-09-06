"use client";

import React, { useEffect, useState } from "react";
import { ShoppingCart, Plus, Minus, X, CreditCard, Check } from "lucide-react";

type MenuItem = {
  _id: string;
  name: string;
  price: string;
  description: string;
  image: string;
  intensity: number;
  popular: boolean;
  category: string;
};

type CartItem = {
  item: MenuItem;
  quantity: number;
};

type Transaction = {
  id: string;
  items: CartItem[];
  total: number;
  date: Date;
  status: 'completed' | 'pending' | 'failed';
};

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState("hot");
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      const res = await fetch("/api/menu");
      const data = await res.json();
      setMenuItems(data);
    };
    fetchItems();
  }, []);

  const categories = [
    { id: "hot", name: "Hot Coffees", icon: "☕" },
    { id: "cold", name: "Cold Brews", icon: "🧊" },
  ];

  // Helper function to parse price
  const parsePrice = (price: string): number => {
    return parseFloat(price.replace(/[^0-9.]/g, ''));
  };

  // Add item to cart
  const addToCart = (menuItem: MenuItem) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.item._id === menuItem._id);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.item._id === menuItem._id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevCart, { item: menuItem, quantity: 1 }];
      }
    });
  };

  // Remove item from cart
  const removeFromCart = (itemId: string) => {
    setCart(prevCart => prevCart.filter(cartItem => cartItem.item._id !== itemId));
  };

  // Update quantity
  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(cartItem =>
        cartItem.item._id === itemId
          ? { ...cartItem, quantity: newQuantity }
          : cartItem
      )
    );
  };

  // Calculate total
  const calculateTotal = (): number => {
    return cart.reduce((total, cartItem) => {
      return total + (parsePrice(cartItem.item.price) * cartItem.quantity);
    }, 0);
  };

  // Get cart item count
  const getCartItemCount = (): number => {
    return cart.reduce((count, cartItem) => count + cartItem.quantity, 0);
  };

  // Process transaction
  const processTransaction = async () => {
    if (cart.length === 0) return;

    setIsProcessing(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    const transaction: Transaction = {
      id: Date.now().toString(),
      items: [...cart],
      total: calculateTotal(),
      date: new Date(),
      status: 'completed'
    };

    setTransactions(prev => [transaction, ...prev]);
    setCart([]);
    setShowCheckout(false);
    setShowCart(false);
    setIsProcessing(false);

    // Show success message
    alert(`Transaction successful! Order ID: ${transaction.id}`);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-amber-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-64 h-64 bg-amber-400 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-400 rounded-full blur-3xl" />
      </div>

      {/* Cart Button */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={() => setShowCart(true)}
          className="bg-amber-500 text-white p-3 rounded-full shadow-lg hover:bg-amber-600 transition-colors relative"
        >
          <ShoppingCart size={24} />
          {getCartItemCount() > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
              {getCartItemCount()}
            </span>
          )}
        </button>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="text-6xl">☕</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black mb-6">
            <span className="bg-gradient-to-r from-amber-600 via-orange-500 to-red-500 bg-clip-text text-transparent">
              Our Menu
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Crafted with passion, served with love. Each cup tells a story of premium beans and artisan expertise.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex justify-center gap-4 mb-8">
          <div className="bg-white rounded-full p-2 shadow-xl border border-gray-100">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 mx-1 ${
                  activeCategory === cat.id
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg transform scale-105'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <span className="mr-2">{cat.icon}</span>
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {menuItems
            .filter((item) => item.category === activeCategory)
            .map((item) => (
              <div key={item._id} className="p-4 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <img src={item.image} alt={item.name} className="rounded-md mb-4 w-full h-48 object-cover" />
                <h3 className="text-xl font-semibold">{item.name}</h3>
                <p className="text-gray-600 mb-2">{item.description}</p>
                {item.popular && (
                  <span className="inline-block bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full mb-2">
                    Popular
                  </span>
                )}
                <div className="flex justify-between items-center mt-4">
                  <span className="font-bold text-amber-600 text-lg">{item.price}</span>
                  <button
                    onClick={() => addToCart(item)}
                    className="bg-amber-500 text-white px-4 py-2 rounded hover:bg-amber-600 transition-colors flex items-center gap-2"
                  >
                    <Plus size={16} />
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
        </div>

        {/* Tasting Flight Section */}
        <div className="text-center mt-16">
          <div className="inline-block bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
            <h3 className="text-2xl font-bold mb-4 text-gray-800">
              Can't decide? Try our 
              <span className="text-amber-600"> Tasting Flight!</span>
            </h3>
            <p className="text-gray-600 mb-6">
              Sample three of our signature drinks in perfect portions
            </p>
            <button className="bg-gradient-to-r from-gray-800 to-gray-900 text-white px-8 py-3 rounded-full font-semibold hover:from-gray-900 hover:to-black transform hover:scale-105 transition-all duration-300 shadow-lg">
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Cart Modal */}
      {showCart && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[80vh] overflow-y-auto">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="text-xl font-bold">Your Cart</h3>
              <button onClick={() => setShowCart(false)}>
                <X size={24} />
              </button>
            </div>
            
            <div className="p-4">
              {cart.length === 0 ? (
                <p className="text-gray-500 text-center py-8">Your cart is empty</p>
              ) : (
                <>
                  {cart.map((cartItem) => (
                    <div key={cartItem.item._id} className="flex items-center gap-4 py-4 border-b">
                      <img 
                        src={cartItem.item.image} 
                        alt={cartItem.item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold">{cartItem.item.name}</h4>
                        <p className="text-amber-600 font-bold">{cartItem.item.price}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(cartItem.item._id, cartItem.quantity - 1)}
                          className="p-1 rounded-full bg-gray-200 hover:bg-gray-300"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="font-semibold">{cartItem.quantity}</span>
                        <button
                          onClick={() => updateQuantity(cartItem.item._id, cartItem.quantity + 1)}
                          className="p-1 rounded-full bg-gray-200 hover:bg-gray-300"
                        >
                          <Plus size={16} />
                        </button>
                        <button
                          onClick={() => removeFromCart(cartItem.item._id)}
                          className="p-1 rounded-full bg-red-200 hover:bg-red-300 text-red-600 ml-2"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                  
                  <div className="pt-4">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-xl font-bold">Total: ${calculateTotal().toFixed(2)}</span>
                    </div>
                    <button
                      onClick={() => setShowCheckout(true)}
                      className="w-full bg-amber-500 text-white py-3 rounded-lg hover:bg-amber-600 transition-colors flex items-center justify-center gap-2"
                    >
                      <CreditCard size={20} />
                      Proceed to Checkout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      {showCheckout && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="text-xl font-bold">Checkout</h3>
              <button onClick={() => setShowCheckout(false)}>
                <X size={24} />
              </button>
            </div>
            
            <div className="p-4">
              <div className="mb-6">
                <h4 className="font-semibold mb-2">Order Summary</h4>
                {cart.map((cartItem) => (
                  <div key={cartItem.item._id} className="flex justify-between py-1">
                    <span>{cartItem.item.name} x{cartItem.quantity}</span>
                    <span>${(parsePrice(cartItem.item.price) * cartItem.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between font-bold">
                    <span>Total:</span>
                    <span>${calculateTotal().toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Card Number</label>
                  <input 
                    type="text" 
                    placeholder="1234 5678 9012 3456"
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium mb-1">Expiry</label>
                    <input 
                      type="text" 
                      placeholder="MM/YY"
                      className="w-full p-2 border rounded-lg"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium mb-1">CVV</label>
                    <input 
                      type="text" 
                      placeholder="123"
                      className="w-full p-2 border rounded-lg"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Name on Card</label>
                  <input 
                    type="text" 
                    placeholder="John Doe"
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
              </div>

              <button
                onClick={processTransaction}
                disabled={isProcessing}
                className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-2 mt-6 disabled:opacity-50"
              >
                {isProcessing ? (
                  <>Processing...</>
                ) : (
                  <>
                    <Check size={20} />
                    Complete Order
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}