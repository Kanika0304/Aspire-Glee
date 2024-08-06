"use client";

import React, { useState } from "react";

const VolunteerSurvey = () => {
  const [beneficiaryName, setBeneficiaryName] = useState("");
  const [location, setLocation] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [need, setNeed] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Create the data object to be sent to the API
    const data = {
      beneficiaryName,
      location,
      gender,
      age,
      need,
    };

    try {
      // Make the API call
      const response = await fetch("http://localhost:8800/api/v1/beneficiary/addBeneficiary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      // Check if the response is successful
      if (response.ok) {
        // Handle successful response
        console.log("Survey data saved successfully");
        // Reset form fields
        setBeneficiaryName("");
        setLocation("");
        setGender("");
        setAge("");
        setNeed("");
      } else {
        // Handle error response
        console.error("Failed to save survey data");
      }
    } catch (error) {
      // Handle network errors
      console.error("Error:", error);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1496317899792-9d7dbcd928a1?fit=crop&w=1920&q=80')",
      }}
    >
      <div className="w-full max-w-2xl bg-white bg-opacity-90 rounded-lg shadow-lg p-10">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-10">
          Clothes Donation Survey
        </h2>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label
                htmlFor="beneficiaryName"
                className="block text-sm font-semibold text-gray-700"
              >
                Beneficiary Name
              </label>
              <input
                type="text"
                id="beneficiaryName"
                value={beneficiaryName}
                onChange={(e) => setBeneficiaryName(e.target.value)}
                className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>
            <div>
              <label
                htmlFor="location"
                className="block text-sm font-semibold text-gray-700"
              >
                Location
              </label>
              <input
                type="text"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>
            <div>
              <label
                htmlFor="gender"
                className="block text-sm font-semibold text-gray-700"
              >
                Gender
              </label>
              <select
                id="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="age"
                className="block text-sm font-semibold text-gray-700"
              >
                Age
              </label>
              <input
                type="number"
                id="age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label
                htmlFor="need"
                className="block text-sm font-semibold text-gray-700"
              >
                Need
              </label>
              <textarea
                id="need"
                value={need}
                onChange={(e) => setNeed(e.target.value)}
                className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Describe the clothing needs"
                required
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-700 text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-500 transition duration-300 ease-in-out"
            >
              Submit Survey
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VolunteerSurvey;
