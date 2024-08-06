"use client";

import React, { useState } from "react";

const ClothingDonorPage = () => {
  const [donorName, setDonorName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [clothingType, setClothingType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [condition, setCondition] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle the donor submission logic here (e.g., API call)
    console.log("Donor Name:", donorName);
    console.log("Email:", email);
    console.log("Phone:", phone);
    console.log("Clothing Type:", clothingType);
    console.log("Quantity:", quantity);
    console.log("Condition:", condition);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1524504388940-b1c1722653e1?fit=crop&w=1920&q=80')",
      }}
    >
      <div className="w-full max-w-2xl bg-white bg-opacity-90 rounded-lg shadow-lg p-10">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-10">
          Clothing Donor Form
        </h2>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label
                htmlFor="donorName"
                className="block text-sm font-semibold text-gray-700"
              >
                Donor Name
              </label>
              <input
                type="text"
                id="donorName"
                value={donorName}
                onChange={(e) => setDonorName(e.target.value)}
                className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                required
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-semibold text-gray-700"
              >
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                required
              />
            </div>
            <div>
              <label
                htmlFor="clothingType"
                className="block text-sm font-semibold text-gray-700"
              >
                Apparel 
              </label>
              <input
                type="text"
                id="clothingType"
                value={clothingType}
                onChange={(e) => setClothingType(e.target.value)}
                className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                required
              />
            </div>
            <div>
              <label
                htmlFor="quantity"
                className="block text-sm font-semibold text-gray-700"
              >
                Quantity
              </label>
              <input
                type="number"
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                required
              />
            </div>
            <div>
              <label
                htmlFor="condition"
                className="block text-sm font-semibold text-gray-700"
              >
                Condition
              </label>
              <select
                id="condition"
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                required
              >
                <option value="">Select</option>
                <option value="new">New</option>
                <option value="gently used">Gently Used</option>
                <option value="used">Used</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-green-700 text-white px-6 py-3 rounded-md shadow-md hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-500 transition duration-300 ease-in-out"
            >
              Submit Donation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClothingDonorPage;
