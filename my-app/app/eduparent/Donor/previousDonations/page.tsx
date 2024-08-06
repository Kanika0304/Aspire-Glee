"use client";
import React from "react";
import Navbar from "@/app/components/Navbar/page";
import Footer from "@/app/components/Footer/page";

const PreviousDonations = () => {
  const donations = [
    { id: 1, date: "2024-01-15", amount: "$50.00", status: "Completed" },
    { id: 2, date: "2024-02-20", amount: "$150.00", status: "Completed" },
    { id: 3, date: "2024-03-05", amount: "$250.00", status: "Pending" },
  ];

  return (
    <div data-theme="light">
      <Navbar />
      <div className="min-h-screen flex flex-col">
        <header className="bg-blue-600 text-white text-center py-12">
          <h1 className="text-4xl font-bold">Your Previous Donations</h1>
          <p className="text-xl mt-4">
            Here you can review the donations you have made. Thank you for your
            continued support!
          </p>
        </header>

        <main className="flex-1 p-8 bg-gray-100">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-3xl font-bold text-blue-600 mb-4">
                Donation History
              </h2>
              <table className="w-full bg-gray-50 border border-gray-200 rounded-lg">
                <thead className="bg-blue-600 text-white">
                  <tr>
                    <th className="py-3 px-4 border-b">Date</th>
                    <th className="py-3 px-4 border-b">Amount</th>
                    <th className="py-3 px-4 border-b">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {donations.map((donation) => (
                    <tr key={donation.id} className="hover:bg-gray-100">
                      <td className="py-3 px-4 border-b">{donation.date}</td>
                      <td className="py-3 px-4 border-b">{donation.amount}</td>
                      <td className="py-3 px-4 border-b">
                        <span
                          className={`inline-flex items-center px-3 py-1 text-sm font-medium rounded-full ${
                            donation.status === "Completed"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {donation.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default PreviousDonations;
