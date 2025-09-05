import React from 'react';
import { MenuItem } from '../types';

interface MenuCardProps {
  item: MenuItem;
}

const MenuCard: React.FC<MenuCardProps> = ({ item }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <img 
        src={item.image} 
        alt={item.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-amber-900 mb-2">{item.name}</h3>
        <p className="text-gray-600 mb-3">{item.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-amber-800">${item.price.toFixed(2)}</span>
          <button className="bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-700 transition-colors">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuCard;