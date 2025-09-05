"use client";

import React, { useState } from "react";

type MenuItem = {
  id: number;
  name: string;
  price: string;
  description: string;
  image: string;
  intensity: number;
  popular: boolean;
};

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState("hot");
  const [hoveredItem, setHoveredItem] = useState<null | number>(null);

  const menuItems: { [key: string]: MenuItem[] } = {
    hot: [
      {
        id: 1,
        name: "Classic Espresso",
        price: "$3.50",
        description: "Rich, bold shot of pure Italian perfection",
        image:
          "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=300&h=300&fit=crop&crop=center",
        intensity: 5,
        popular: false,
      },
      {
        id: 2,
        name: "Velvet Cappuccino",
        price: "$4.50",
        description: "Silky steamed milk with artistic foam design",
        image:
          "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=300&h=300&fit=crop&crop=center",
        intensity: 3,
        popular: true,
      },
      {
        id: 3,
        name: "Creamy Latte",
        price: "$4.00",
        description: "Smooth espresso with perfectly steamed milk",
        image:
          "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=300&h=300&fit=crop&crop=center",
        intensity: 2,
        popular: false,
      },
      {
        id: 4,
        name: "Café Mocha",
        price: "$5.25",
        description: "Chocolate heaven meets premium espresso",
        image:
          "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop&crop=center",
        intensity: 3,
        popular: true,
      },
      {
        id: 5,
        name: "Flat White",
        price: "$4.75",
        description: "Microfoam artistry with double shot intensity",
        image:
          "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=300&h=300&fit=crop&crop=center",
        intensity: 4,
        popular: false,
      },
      {
        id: 6,
        name: "Caramel Macchiato",
        price: "$5.50",
        description: "Sweet caramel swirls in vanilla-infused perfection",
        image:
          "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=300&h=300&fit=crop&crop=center",
        intensity: 2,
        popular: true,
      },
    ],
    cold: [
      {
        id: 7,
        name: "Iced Americano",
        price: "$3.75",
        description: "Bold espresso over ice with crystal clarity",
        image:
          "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=300&h=300&fit=crop&crop=center",
        intensity: 4,
        popular: false,
      },
      {
        id: 8,
        name: "Cold Brew",
        price: "$4.25",
        description: "24-hour slow-steeped smoothness",
        image:
          "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=300&h=300&fit=crop&crop=center",
        intensity: 3,
        popular: true,
      },
      {
        id: 9,
        name: "Frappé Supreme",
        price: "$5.75",
        description: "Blended ice coffee with whipped cream clouds",
        image:
          "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=300&h=300&fit=crop&crop=center",
        intensity: 2,
        popular: true,
      },
    ],
  };

  const categories = [
    { id: "hot", name: "Hot Coffees", icon: "☕" },
    { id: "cold", name: "Cold Brews", icon: "🧊" },
  ];

  const renderIntensityBars = (intensity: number) => (
    <div className="flex gap-1 justify-center mb-2">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className={`w-1 h-4 rounded-full transition-colors duration-300 ${
            i < intensity ? "bg-amber-500" : "bg-gray-200"
          }`}
        />
      ))}
    </div>
  );

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-amber-50 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-64 h-64 bg-amber-400 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-400 rounded-full blur-3xl" />
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
            Crafted with passion, served with love. Each cup tells a story of
            premium beans and artisan expertise.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-full p-2 shadow-xl border border-gray-100">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 mx-1 ${
                  activeCategory === category.id
                    ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg transform scale-105"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Items */}
        <div className="grid md:grid-cols-3 gap-8">
          {menuItems[activeCategory].map((item, index) => (
            <div
              key={item.id}
              className={`group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 ${
                hoveredItem === item.id ? "transform -translate-y-2" : ""
              }`}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Popular Badge */}
              {item.popular && (
                <div className="absolute top-4 right-4 z-20">
                  <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                    ⭐ Popular
                  </div>
                </div>
              )}

              {/* Image Section */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Content Section */}
              <div className="p-6">
                {/* Intensity Bars */}
                {renderIntensityBars(item.intensity)}

                <h3 className="text-2xl font-bold mb-2 text-gray-800 group-hover:text-amber-600 transition-colors duration-300">
                  {item.name}
                </h3>

                <p className="text-gray-600 mb-4 leading-relaxed">
                  {item.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-3xl font-black text-amber-600">
                    {item.price}
                  </span>

                  <button className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-2 rounded-full font-semibold hover:from-amber-600 hover:to-orange-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-amber-500/25">
                    Add to Cart
                  </button>
                </div>
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 to-orange-500/5 rounded-3xl" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
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
    </section>
  );
}
