"use client";
import React, { useState } from "react";

// Sample data for clothes
const clothesData = [
  { id: 1, type: "Pant", image: "https://media.istockphoto.com/id/679327916/photo/three-womens-jeans-pants-in-black-blue-and-grey-isolated-on-white-background.webp?b=1&s=170667a&w=0&k=20&c=jGuGkC9d3v1pa0Hf99Zl2580b9U8ONKPdJa1KpyfKdU=", status: "needed" },
  { id: 2, type: "Shirt", image: "https://media.istockphoto.com/id/1207027323/photo/trendy-clothes-in-a-store.webp?b=1&s=170667a&w=0&k=20&c=S7YNaCzzk9g5i5cX6RzpS4CHUI5nL02Q_TWWKkTSUhM=", status: "full" },
  { id: 3, type: "Jacket", image: "https://media.istockphoto.com/id/1069165932/photo/black-leather-jacket-shot-from-front-and-back-isolated-on-white.webp?b=1&s=170667a&w=0&k=20&c=RBwmckylPQd-g4dl79HRQFGteR4shU77eFEAv3dusNY=", status: "needed" },
  { id: 4, type: "Shoes", image: "https://media.istockphoto.com/id/1276342010/photo/top-view-of-pair-of-brown-shoes-isolated-on-white-background.webp?b=1&s=170667a&w=0&k=20&c=SlK67osR6Xx4qTgOJPBKoSb_mZJokxibMxNWeRJlV6c=", status: "full" },
  { id: 5, type: "Hat", image: "https://media.istockphoto.com/id/1184522745/photo/rodeo-horse-rider-wild-west-culture-americana-and-american-country-music-concept-theme-with-a.webp?b=1&s=170667a&w=0&k=20&c=FOTBGzZVbzWjUw9mB9OK4bs_iI8PduAUilNJ9KcWwck=", status: "needed" },
  { id: 6, type: "Socks", image: "https://media.istockphoto.com/id/1176507935/photo/relaxing-home-entertainment.webp?b=1&s=170667a&w=0&k=20&c=iiJaVAf3Kaicf_VB2g8ulxeBEBX0YvHXDN1P-hP60RU=", status: "full" },
  { id: 7, type: "Gloves", image: "https://media.istockphoto.com/id/1096792850/photo/safety-gloves-for-work.webp?b=1&s=170667a&w=0&k=20&c=7IWdsGX8SY0fMfdecUZXbvZinSFcq6DzqB6uiJdL14A=", status: "needed" },
  { id: 8, type: "Scarf", image: "https://media.istockphoto.com/id/92371703/photo/silk-fabrics.webp?b=1&s=170667a&w=0&k=20&c=f6KgbmcYonmhjFScB57M1DOfwZyGdq7WVmMtzcJKRy8=", status: "full" },
  { id: 9, type: "Belt", image: "https://media.istockphoto.com/id/1253001088/photo/indian-made-leather-waist-belts-with-adjustable-buckle-on.webp?b=1&s=170667a&w=0&k=20&c=Zj2EeJQZMS28PG4Trl5brxVRcV2v0xsRDnYBrxjVaj0=", status: "needed" },
  { id: 10, type: "Sweater", image: "https://media.istockphoto.com/id/177348825/photo/stack-of-cashmere-sweaters.webp?b=1&s=170667a&w=0&k=20&c=pQ9sSvLmS7rLSLoel8t0vVSIwo6ConfdV8Xo1BjvzbE=", status: "full" },
  { id: 11, type: "T-shirt", image: "https://media.istockphoto.com/id/1607498659/photo/attractive-couple-with-white-mock-up-t-shirts.webp?b=1&s=170667a&w=0&k=20&c=vznXq8IKGw0DcbD_Jpl3_HYrXZgnShGpx71-a362-rU=", status: "needed" },
  { id: 12, type: "Jeans", image: "https://media.istockphoto.com/id/915923400/photo/blue-mens-jeans-denim-pants-on-orange-background-contrast-saturated-color-fashion-clothing.webp?b=1&s=170667a&w=0&k=20&c=mMV-DGwUc6kGms_1xzAPYnVVpz8wmn13LSppllWtUPs=", status: "full" },
  { id: 13, type: "Shorts", image: "https://media.istockphoto.com/id/184651452/photo/man-standing-with-his-children-in-ascending-order.webp?b=1&s=170667a&w=0&k=20&c=f03xjSesjmVyuWxnF-4azpZXFji9nO2wnzgF5lStKro=", status: "needed" },
  { id: 14, type: "Dress", image: "https://media.istockphoto.com/id/576926776/photo/happy-woman-in-yellow-dress-with-arms-outstretched.webp?b=1&s=170667a&w=0&k=20&c=9_QYS3NurSHHAvlDLH8YXnRKig1YlxVmFMvlR-SL8wU=", status: "full" },
  { id: 15, type: "Coat", image: "https://media.istockphoto.com/id/1477871401/photo/portrait-of-happy-young-businesswoman-arms-crossed-with-looking-at-camera-on-white-background.webp?b=1&s=170667a&w=0&k=20&c=_wV5C2C-MufoJNGs4Bu9jdbXXmBHAxKbXzTOY_pwx9c=", status: "needed" },
  // Add more clothing items as needed
];

// Number of items per page
const itemsPerPage = 6;

const Inventory = () => {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate total pages
  const totalPages = Math.ceil(clothesData.length / itemsPerPage);

  // Get current page items
  const currentClothes = clothesData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle pagination click
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-2xl text-black font-bold mb-6 text-center">Inventory Status</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {currentClothes.map((clothing) => (
          <div
            key={clothing.id}
            className="relative group bg-white p-4 border rounded-lg shadow-md hover:bg-gray-50 transition"
          >
            <img
              src={clothing.image}
              alt={clothing.type}
              className="w-full h-40 object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
              {clothing.status === "needed" ? (
                <button className="bg-green-500 text-white py-2 px-4 rounded-lg cursor-pointer">
                  Needed
                </button>
              ) : (
                <div className="bg-red-500 text-white py-2 px-4 rounded-lg cursor-pointer">
                  Not Needed
                </div>
              )}
            </div>
            <h3 className="text-lg font-semibold mt-4 text-center">
              {clothing.type}
            </h3>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-6">
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              className={`mx-2 px-4 py-2 rounded-lg transition-colors duration-200 cursor-pointer ${
                currentPage === pageNumber
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-gray-700 hover:bg-blue-400"
              }`}
            >
              {pageNumber}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default Inventory;
