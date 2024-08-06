"use client";

import React, { useRef } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar/page";
import ClothingDonorPage from "./clothingdonor/clothingdonor";
import Inventory from "./inventory/inventory"; // Adjust the path as necessary
import Footer from "../components/Footer/page";

const Page = () => {
  const router = useRouter();
  const donateRef = useRef<HTMLDivElement | null>(null);
  const neededRef = useRef<HTMLDivElement | null>(null);

  const handleScrollToDonate = () => {
    if (donateRef.current) {
      donateRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const handleScrollToNeeded = () => {
    if (neededRef.current) {
      neededRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <>
      <Navbar />

      <div
        className="hero min-h-screen  flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1596609548086-85bbf8ddb6b9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nzh8fGNsb3RoaW5nJTIwbGVmdCUyMHNpZGV8ZW58MHx8MHx8fDA%3D')",
        }}
      >
        <div className="flex flex-col items-center justify-center text-center text-white z-10 px-6">
          <div className="max-w-lg">
            <h1 className="mb-5 text-6xl font-extrabold leading-tight drop-shadow-md text-white">
              Make a Difference with Your Clothing Donation
            </h1>
            <p className="mb-8 text-lg font-medium drop-shadow-sm text-black">
              Join us in our mission to help those in need by donating your
              gently used clothes. Explore our needed items or offer your
              contributions below.
            </p>
            <div className="flex justify-center space-x-6">
              <button
                onClick={handleScrollToNeeded}
                className="btn btn-primary text-lg font-semibold py-3 px-6 rounded-full shadow-xl transition-transform transform hover:scale-105 hover:bg-blue-700"
              >
                Needed Clothes
              </button>
              <button
                onClick={handleScrollToDonate}
                className="btn btn-secondary text-lg font-semibold py-3 px-6 rounded-full shadow-xl transition-transform transform hover:scale-105 hover:bg-green-700"
              >
                Donate
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        ref={neededRef}
        className="h-screen bg-white flex items-center justify-center"
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-10 text-blue-700">
            Needed Clothing Items
          </h2>
          <div className="p-10 max-w-20xl mx-auto bg-gray-100 shadow-2xl rounded-lg">
            <Inventory />
          </div>
        </div>
      </div>

      <div
        ref={donateRef}
        className="h-screen bg-gray-50 flex items-center justify-center"
      >
        <div
          className="min-h-screen h-full w-full bg-cover bg-center flex items-center justify-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1502898746234-cdef14a6eec4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nzl8fGNsb3RoaW5nJTIwbGVmdCUyMHNpZGV8ZW58MHx8MHx8fDA%3D')",
          }}
        >
          <div className="hero-overlay bg-gradient-to-b from-transparent to-white opacity-60 absolute inset-0"></div>
          <div className="flex flex-col max-w-20xl mx-auto items-center justify-center text-center text-gray-900 z-10 px-6">
            <ClothingDonorPage />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Page;
