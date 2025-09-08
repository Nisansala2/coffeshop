"use client";

import React from "react";

interface MenuItem {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: "hot" | "cold";
  popular: boolean;
}

interface MenuListProps {
  items: MenuItem[];
  onEdit: (item: MenuItem) => void;
  onDelete: (id: string) => void;
  loading: boolean;
}

const MenuList: React.FC<MenuListProps> = ({ items, onEdit, onDelete, loading }) => {
  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  if (items.length === 0) {
    return <p className="text-center">No menu items found.</p>;
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item._id} className="flex items-center justify-between p-4 bg-white border rounded shadow-md">
          <div>
            <h3 className="font-semibold">{item.name}</h3>
            <p className="text-gray-600">${item.price.toFixed(2)}</p>
            <p className="text-sm">{item.description}</p>
            <p className="text-sm">Category: {item.category}</p>
            {item.popular && <span className="text-yellow-500">★ Popular</span>}
          </div>
          <div className="space-x-2">
            <button
              onClick={() => onEdit(item)}
              className="px-3 py-1 text-white bg-yellow-500 rounded hover:bg-yellow-600"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(item._id)}
              className="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MenuList;
