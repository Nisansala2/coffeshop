"use client";

import React, { useEffect, useState } from "react";
import { ShoppingCart, Plus, Minus, X, CreditCard, Check } from "lucide-react";

type MenuItem = {
  _id: string;
  name: string;
  price: number;
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
      return total + (cartItem.item.price * cartItem.quantity);
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
    <section className="relative py-20 overflow-hidden bg-gradient-to-br from-gray-50 via-white to-amber-50">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute w-64 h-64 rounded-full top-20 left-10 bg-amber-400 blur-3xl" />
        <div className="absolute bg-orange-400 rounded-full bottom-20 right-10 w-96 h-96 blur-3xl" />
      </div>

      {/* Cart Button */}
      <div className="fixed z-50 top-4 right-4">
        <button
          onClick={() => setShowCart(true)}
          className="relative p-3 text-white transition-colors rounded-full shadow-lg bg-amber-500 hover:bg-amber-600"
        >
          <ShoppingCart size={24} />
          {getCartItemCount() > 0 && (
            <span className="absolute flex items-center justify-center w-6 h-6 text-xs text-white bg-red-500 rounded-full -top-2 -right-2">
              {getCartItemCount()}
            </span>
          )}
        </button>
      </div>

      <div className="container relative z-10 px-4 mx-auto">
        {/* Header Section */}
        <div className="mb-16 text-center">
          <div className="inline-block mb-4">
            <span className="text-6xl">☕</span>
          </div>
          <h2 className="mb-6 text-5xl font-black md:text-6xl">
            <span className="text-transparent bg-gradient-to-r from-amber-600 via-orange-500 to-red-500 bg-clip-text">
              Our Menu
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-xl leading-relaxed text-gray-600">
            Crafted with passion, served with love. Each cup tells a story of premium beans and artisan expertise.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex justify-center gap-4 mb-8">
          <div className="p-2 bg-white border border-gray-100 rounded-full shadow-xl">
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
        <div className="grid grid-cols-1 gap-8 mx-auto md:grid-cols-2 lg:grid-cols-3 max-w-7xl">
          {menuItems
            .filter((item) => item.category === activeCategory)
            .map((item) => (
              <div key={item._id} className="p-4 transition-shadow bg-white rounded-lg shadow-lg hover:shadow-xl">
                <img src={item.image} alt={item.name} className="object-cover w-full h-48 mb-4 rounded-md" />
                <h3 className="text-xl font-semibold">{item.name}</h3>
                <p className="mb-2 text-gray-600">{item.description}</p>
                {item.popular && (
                  <span className="inline-block px-2 py-1 mb-2 text-xs rounded-full bg-amber-100 text-amber-800">
                    Popular
                  </span>
                )}
                <div className="flex items-center justify-between mt-4">
                  <span className="text-lg font-bold text-amber-600">${item.price.toFixed(2)}</span>
                  <button
                    onClick={() => addToCart(item)}
                    className="flex items-center gap-2 px-4 py-2 text-white transition-colors rounded bg-amber-500 hover:bg-amber-600"
                  >
                    <Plus size={16} />
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
        </div>

        {/* Tasting Flight Section */}
        <div className="mt-16 text-center">
          <div className="inline-block p-8 bg-white border border-gray-100 shadow-xl rounded-2xl">
            <h3 className="mb-4 text-2xl font-bold text-gray-800">
              Can't decide? Try our 
              <span className="text-amber-600"> Tasting Flight!</span>
            </h3>
            <p className="mb-6 text-gray-600">
              Sample three of our signature drinks in perfect portions
            </p>
            <button className="px-8 py-3 font-semibold text-white transition-all duration-300 transform rounded-full shadow-lg bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black hover:scale-105">
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Cart Modal */}
      {showCart && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-xl font-bold">Your Cart</h3>
              <button onClick={() => setShowCart(false)}>
                <X size={24} />
              </button>
            </div>
            
            <div className="p-4">
              {cart.length === 0 ? (
                <p className="py-8 text-center text-gray-500">Your cart is empty</p>
              ) : (
                <>
                  {cart.map((cartItem) => (
                    <div key={cartItem.item._id} className="flex items-center gap-4 py-4 border-b">
                      <img 
                        src={cartItem.item.image} 
                        alt={cartItem.item.name}
                        className="object-cover w-16 h-16 rounded"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold">{cartItem.item.name}</h4>
                        <p className="font-bold text-amber-600">${cartItem.item.price.toFixed(2)}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(cartItem.item._id, cartItem.quantity - 1)}
                          className="p-1 bg-gray-200 rounded-full hover:bg-gray-300"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="font-semibold">{cartItem.quantity}</span>
                        <button
                          onClick={() => updateQuantity(cartItem.item._id, cartItem.quantity + 1)}
                          className="p-1 bg-gray-200 rounded-full hover:bg-gray-300"
                        >
                          <Plus size={16} />
                        </button>
                        <button
                          onClick={() => removeFromCart(cartItem.item._id)}
                          className="p-1 ml-2 text-red-600 bg-red-200 rounded-full hover:bg-red-300"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                  
                  <div className="pt-4">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xl font-bold">Total: ${calculateTotal().toFixed(2)}</span>
                    </div>
                    <button
                      onClick={() => setShowCheckout(true)}
                      className="flex items-center justify-center w-full gap-2 py-3 text-white transition-colors rounded-lg bg-amber-500 hover:bg-amber-600"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="w-full max-w-md bg-white rounded-lg">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-xl font-bold">Checkout</h3>
              <button onClick={() => setShowCheckout(false)}>
                <X size={24} />
              </button>
            </div>
            
            <div className="p-4">
              <div className="mb-6">
                <h4 className="mb-2 font-semibold">Order Summary</h4>
                {cart.map((cartItem) => (
                  <div key={cartItem.item._id} className="flex justify-between py-1">
                    <span>{cartItem.item.name} x{cartItem.quantity}</span>
                    <span>${(cartItem.item.price * cartItem.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="pt-2 mt-2 border-t">
                  <div className="flex justify-between font-bold">
                    <span>Total:</span>
                    <span>${calculateTotal().toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block mb-1 text-sm font-medium">Card Number</label>
                  <input 
                    type="text" 
                    placeholder="1234 5678 9012 3456"
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block mb-1 text-sm font-medium">Expiry</label>
                    <input 
                      type="text" 
                      placeholder="MM/YY"
                      className="w-full p-2 border rounded-lg"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block mb-1 text-sm font-medium">CVV</label>
                    <input 
                      type="text" 
                      placeholder="123"
                      className="w-full p-2 border rounded-lg"
                    />
                  </div>
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium">Name on Card</label>
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
                className="flex items-center justify-center w-full gap-2 py-3 mt-6 text-white transition-colors bg-green-500 rounded-lg hover:bg-green-600 disabled:opacity-50"
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