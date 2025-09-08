"use client";

import React, { useState, useEffect } from "react";

interface AddEditFormProps {
  initialData?: {
    _id?: string;
    name: string;
    price: number;
    description: string;
    image: string;
    category: "hot" | "cold";
    popular: boolean;
  };
  onSave: () => void;
  onCancel: () => void;
}

const AddEditForm: React.FC<AddEditFormProps> = ({
  initialData,
  onSave,
  onCancel,
}) => {
  const [name, setName] = useState(initialData?.name || "");
  const [price, setPrice] = useState(initialData?.price || 0);
  const [description, setDescription] = useState(initialData?.description || "");
  const [image, setImage] = useState(initialData?.image || "");
  const [category, setCategory] = useState<"hot" | "cold">(
    initialData?.category || "hot"
  );
  const [popular, setPopular] = useState(initialData?.popular || false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const payload = {
      name,
      price,
      description,
      image,
      category,
      popular,
    };

    try {
      let response;
      if (initialData?._id) {
        // Update existing item
        response = await fetch(`/api/menu/${initialData._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        // Create new item
        response = await fetch("/api/menu", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      if (!response.ok) {
        throw new Error("Failed to save item");
      }

      onSave();
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md p-4 mx-auto space-y-4 bg-white border rounded shadow-md">
      <h2 className="text-xl font-semibold">{initialData ? "Edit" : "Add"} Menu Item</h2>
      {error && <p className="text-red-600">{error}</p>}
      <div>
        <label className="block mb-1 font-medium" htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          className="w-full px-2 py-1 border rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          disabled={saving}
        />
      </div>
      <div>
        <label className="block mb-1 font-medium" htmlFor="price">Price</label>
        <input
          id="price"
          type="number"
          step="0.01"
          className="w-full px-2 py-1 border rounded"
          value={price}
          onChange={(e) => setPrice(parseFloat(e.target.value))}
          required
          disabled={saving}
        />
      </div>
      <div>
        <label className="block mb-1 font-medium" htmlFor="description">Description</label>
        <textarea
          id="description"
          className="w-full px-2 py-1 border rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          disabled={saving}
        />
      </div>
      <div>
        <label className="block mb-1 font-medium" htmlFor="image">Image URL</label>
        <input
          id="image"
          type="text"
          className="w-full px-2 py-1 border rounded"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
          disabled={saving}
        />
      </div>
      <div>
        <label className="block mb-1 font-medium" htmlFor="category">Category</label>
        <select
          id="category"
          className="w-full px-2 py-1 border rounded"
          value={category}
          onChange={(e) => setCategory(e.target.value as "hot" | "cold")}
          disabled={saving}
        >
          <option value="hot">Hot</option>
          <option value="cold">Cold</option>
        </select>
      </div>
      <div className="flex items-center space-x-2">
        <input
          id="popular"
          type="checkbox"
          checked={popular}
          onChange={(e) => setPopular(e.target.checked)}
          disabled={saving}
        />
        <label htmlFor="popular">Popular</label>
      </div>
      <div className="flex space-x-4">
        <button
          type="submit"
          disabled={saving}
          className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={saving}
          className="px-4 py-2 text-white bg-gray-400 rounded hover:bg-gray-500 disabled:opacity-50"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AddEditForm;
