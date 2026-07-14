// src/Pages/MyListings.jsx
import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';

export default function MyListings() {
  const [listings, setListings] = useState([
    { id: 1, name: "Wooden Dining Chairs (Set of 2)", category: "Furniture", status: "Active" },
    { id: 2, name: "Baby Stroller (Good Condition)", category: "Baby Products", status: "Claimed" },
  ]);

  const [newItemName, setNewItemName] = useState('');
  const [newItemCategory, setNewItemCategory] = useState('Furniture');
  const [showForm, setShowForm] = useState(false);

  const handleAddListing = (e) => {
    e.preventDefault();
    if (!newItemName.trim()) return;

    const newListing = {
      id: Date.now(),
      name: newItemName,
      category: newItemCategory,
      status: "Active"
    };

    setListings([newListing, ...listings]);
    setNewItemName('');
    setShowForm(false);
  };

  const handleDelete = (id) => {
    setListings(listings.filter(item => item.id !== id));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">My Listings</h2>
          <p className="text-gray-600">Manage the items you are donating to your neighbors.</p>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-[#174624] hover:bg-green-800 text-white font-semibold py-2.5 px-4 rounded-xl shadow-sm transition-colors"
        >
          <Plus size={20} />
          Share New Item
        </button>
      </div>

      {/* Add New Item Modal Form */}
      {showForm && (
        <form onSubmit={handleAddListing} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm mb-6 max-w-2xl">
          <h3 className="text-lg font-bold text-gray-900 mb-4">List a New Item</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Item Name</label>
              <input 
                type="text" 
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                placeholder="e.g. Vintage Floor Lamp" 
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50 text-gray-900" 
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
              <select 
                value={newItemCategory}
                onChange={(e) => setNewItemCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-gray-900"
              >
                <option value="Furniture">Furniture</option>
                <option value="Electronics">Electronics</option>
                <option value="Books">Books</option>
                <option value="Tools">Tools</option>
                <option value="Toys">Toys & Play</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-[#174624] text-white rounded-lg hover:bg-green-800">Publish Listing</button>
          </div>
        </form>
      )}

      {/* Listings Table Layout */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {listings.length === 0 ? (
          <div className="p-12 text-center text-gray-500 font-medium">You haven't listed any items to share yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="p-4 font-semibold text-gray-700">Item Name</th>
                  <th className="p-4 font-semibold text-gray-700">Category</th>
                  <th className="p-4 font-semibold text-gray-700">Status</th>
                  <th className="p-4 font-semibold text-gray-700 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {listings.map((item) => (
                  <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-4 font-medium text-gray-900">{item.name}</td>
                    <td className="p-4 text-gray-600">{item.category}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${
                        item.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button onClick={() => handleDelete(item.id)} className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50 transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}