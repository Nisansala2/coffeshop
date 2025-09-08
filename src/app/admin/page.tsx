"use client";

import React, { useState, useEffect } from "react";
import AddEditForm from "./components/AddEditForm";
import MenuList from "./components/MenuList";

interface MenuItem {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: "hot" | "cold";
  popular: boolean;
}

const AdminPage: React.FC = () => {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = async () => {
    try {
      const response = await fetch("/api/menu");
      if (!response.ok) {
        throw new Error("Failed to fetch items");
      }
      const data = await response.json();
      setItems(data);
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleAdd = () => {
    setEditingItem(undefined);
    setShowForm(true);
  };

  const handleEdit = (item: MenuItem) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    try {
      const response = await fetch(`/api/menu/${id}`, { method: "DELETE" });
      if (!response.ok) {
        throw new Error("Failed to delete item");
      }
      setItems(items.filter((item) => item._id !== id));
    } catch (err: any) {
      setError(err.message || "Unknown error");
    }
  };

  const handleSave = () => {
    setShowForm(false);
    fetchItems(); // Refresh the list
  };

  const handleCancel = () => {
    setShowForm(false);
  };

  return (
    <div className="container p-4 mx-auto">
      <h1 className="mb-4 text-2xl font-bold">Admin Panel - Menu Management</h1>
      {error && <p className="mb-4 text-red-600">{error}</p>}
      <button
        onClick={handleAdd}
        className="px-4 py-2 mb-4 text-white bg-green-600 rounded hover:bg-green-700"
      >
        Add New Item
      </button>
      {showForm && (
        <AddEditForm
          initialData={editingItem}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}
      <MenuList
        items={items}
        onEdit={handleEdit}
        onDelete={handleDelete}
        loading={loading}
      />
    </div>
  );
};

export default AdminPage;
