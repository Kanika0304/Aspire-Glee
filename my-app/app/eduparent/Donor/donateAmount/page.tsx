"use client";
import React, { useState } from "react";
import Navbar from "@/app/components/Navbar/page";
import Footer from "@/app/components/Footer/page";

// Function to handle form submission
const handleFormSubmit = async (formData: any) => {
  // Simulate form submission
  console.log("Form data submitted:", formData);

  // Instead of redirecting, just display a success message
  alert("Thank you for your donation! Please proceed to payment.");
};

const DonorForm = () => {
  const [formData, setFormData] = useState({
    donorName: "",
    numberOfKids: "",
    donationAmount: "",
  });

  const [errors, setErrors] = useState({
    donorName: "",
    numberOfKids: "",
    donationAmount: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Validate input
    switch (name) {
      case "donorName":
        setErrors({
          ...errors,
          donorName: value.trim() === "" ? "Donor name is required" : "",
        });
        break;
      case "numberOfKids":
        setErrors({
          ...errors,
          numberOfKids:
            /^\d+$/.test(value) && parseInt(value) >= 0
              ? ""
              : "Number of kids must be a non-negative integer",
        });
        break;
      case "donationAmount":
        setErrors({
          ...errors,
          donationAmount: /^\d+(\.\d{1,2})?$/.test(value)
            ? ""
            : "Donation amount must be a valid number with up to two decimal places",
        });
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (errors.donorName || errors.numberOfKids || errors.donationAmount) {
      alert("Please fix the errors in the form");
      return;
    }

    handleFormSubmit(formData);
  };

  return (
    <div data-theme="light">
      <Navbar />
      <div className="min-h-screen flex flex-col">
        <header className="bg-blue-600 text-white text-center py-12">
          <h1 className="text-5xl font-bold">Make a Difference Today</h1>
          <p className="text-xl mt-4">
            Your generous donation can change lives. Join us in our mission to
            support children in need.
          </p>
          <button className="mt-6 bg-yellow-500 text-blue-600 py-2 px-6 rounded-full text-xl font-semibold hover:bg-yellow-600 transition duration-300">
            Donate Now
          </button>
        </header>

        <div className="flex flex-1">
          <aside className="w-64 bg-gray-800 text-white p-4 flex-shrink-0">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold">Menu</h2>
            </div>
            <ul className="space-y-2">
              <li>
                <a
                  href="/eduparent/AddStudents"
                  className="block py-2 px-4 bg-gray-700 rounded hover:bg-gray-600 transition duration-300"
                >
                  Add Donations
                </a>
              </li>
              <li>
                <a
                  href="/eduparent/Donor/previousDonations"
                  className="block py-2 px-4 bg-gray-700 rounded hover:bg-gray-600 transition duration-300"
                >
                  Previous Donations
                </a>
              </li>
            </ul>
            <div className="mt-8">
              <p className="text-gray-400 text-sm">
                Need assistance?{" "}
                <a
                  href="mailto:support@example.com"
                  className="text-blue-400 hover:underline"
                >
                  Contact Us
                </a>
              </p>
            </div>
          </aside>

          <main className="flex-1 p-8 bg-gray-100">
            <div className="max-w-6xl mx-auto">
              <div className="mb-12 text-center">
                <h2 className="text-4xl font-bold text-blue-600">
                  How Your Donation Helps
                </h2>
                <p className="text-gray-700 mt-2">
                  Your contribution makes a significant impact. See the
                  difference you can make.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                  <h3 className="text-2xl font-semibold text-blue-600">
                    1 Kid Educated
                  </h3>
                  <p className="text-gray-700 mt-2">With $50</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                  <h3 className="text-2xl font-semibold text-blue-600">
                    3 Kids Educated
                  </h3>
                  <p className="text-gray-700 mt-2">With $150</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                  <h3 className="text-2xl font-semibold text-blue-600">
                    5 Kids Educated
                  </h3>
                  <p className="text-gray-700 mt-2">With $250</p>
                </div>
              </div>

              <div className="mb-12">
                <h2 className="text-4xl font-bold text-center text-blue-600">
                  Testimonials
                </h2>
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white p-6 rounded-lg shadow-lg">
                    <p className="text-gray-700 italic">
                      "This organization has changed our lives. My children now
                      have access to education and a brighter future. Thank
                      you!"
                    </p>
                    <p className="text-blue-600 font-semibold mt-4">
                      - Jane Doe
                    </p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-lg">
                    <p className="text-gray-700 italic">
                      "Donating was the best decision I've made. Knowing that
                      I'm helping children get an education is incredibly
                      rewarding."
                    </p>
                    <p className="text-blue-600 font-semibold mt-4">
                      - John Smith
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-4xl font-bold text-center text-blue-600 mb-6">
                  Add Your Donation
                </h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">
                      Donor Name
                    </label>
                    <input
                      type="text"
                      name="donorName"
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                        errors.donorName
                          ? "focus:ring-red-500 border-red-500"
                          : "focus:ring-blue-500 border-gray-300"
                      }`}
                      placeholder="Enter your name"
                      value={formData.donorName}
                      onChange={handleChange}
                    />
                    {errors.donorName && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.donorName}
                      </p>
                    )}
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">
                      Number of Kids
                    </label>
                    <input
                      type="number"
                      name="numberOfKids"
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                        errors.numberOfKids
                          ? "focus:ring-red-500 border-red-500"
                          : "focus:ring-blue-500 border-gray-300"
                      }`}
                      placeholder="Enter number of kids"
                      value={formData.numberOfKids}
                      onChange={handleChange}
                    />
                    {errors.numberOfKids && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.numberOfKids}
                      </p>
                    )}
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">
                      Donation Amount
                    </label>
                    <input
                      type="text"
                      name="donationAmount"
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                        errors.donationAmount
                          ? "focus:ring-red-500 border-red-500"
                          : "focus:ring-blue-500 border-gray-300"
                      }`}
                      placeholder="Enter donation amount"
                      value={formData.donationAmount}
                      onChange={handleChange}
                    />
                    {errors.donationAmount && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.donationAmount}
                      </p>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
                  >
                    Pay Now
                  </button>
                </form>
                <p className="text-center mt-4 text-blue-500">
                  Thank you for your generosity!
                </p>
              </div>
            </div>
          </main>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default DonorForm;
