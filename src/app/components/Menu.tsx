"use client";

import React, { useEffect, useState } from "react";

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

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState("hot");
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

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

  return (
    <section className="py-20">
      <h2 className="text-4xl font-bold text-center mb-8">Our Menu</h2>

      {/* Category Tabs */}
      <div className="flex justify-center gap-4 mb-8">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-6 py-2 rounded-full ${
              activeCategory === cat.id ? "bg-amber-500 text-white" : "bg-gray-200"
            }`}
          >
            {cat.icon} {cat.name}
          </button>
        ))}
      </div>

      {/* Menu Items */}
      <div className="grid md:grid-cols-3 gap-6">
        {menuItems
          .filter((item) => item.category === activeCategory)
          .map((item) => (
            <div key={item._id} className="p-4 bg-white rounded-lg shadow-lg">
              <img src={item.image} alt={item.name} className="rounded-md mb-4" />
              <h3 className="text-xl font-semibold">{item.name}</h3>
              <p className="text-gray-600">{item.description}</p>
              <div className="flex justify-between mt-4">
                <span className="font-bold text-amber-600">{item.price}</span>
                <button className="bg-amber-500 text-white px-4 py-2 rounded">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
