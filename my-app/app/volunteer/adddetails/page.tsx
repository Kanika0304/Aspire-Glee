"use client";
import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "@/app/components/Navbar/page";

const AddDetail = () => {
  const [formData, setFormData] = useState({
    studentId: "",
    grade: "",
    percentage: "",
  });

  const [errors, setErrors] = useState({
    studentId: "",
    grade: "",
    percentage: "",
  });

  const [cookies] = useCookies(["authToken"]);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const cookieToken = cookies.authToken;
    if (cookieToken) {
      setToken(cookieToken);
    } else {
      const storedToken = localStorage.getItem("authToken");
      if (storedToken) {
        setToken(storedToken);
      }
    }
  }, [cookies.authToken]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Validate input
    switch (name) {
      case "studentId":
        setErrors({
          ...errors,
          studentId: /^\d+$/.test(value) ? "" : "Student ID should be a number",
        });
        break;
      case "percentage":
        setErrors({
          ...errors,
          percentage: /^\d+(\.\d+)?$/.test(value)
            ? ""
            : "Percentage should be a valid number",
        });
        break;
      default:
        setErrors({
          ...errors,
          [name]: value ? "" : "This field is required",
        });
        break;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check for validation errors
    if (Object.values(errors).some((error) => error)) {
      toast.error("Please fix the errors in the form");
      return;
    }

    // Send data to the backend
    try {
      const response = await fetch(
        "http://localhost:8800/api/v1/volunteer/addData",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include the token here
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();

      if (result.success) {
        toast.success("Details submitted successfully!");
        // Reset form
        setFormData({
          studentId: "",
          grade: "",
          percentage: "",
        });
      } else {
        toast.error("Failed to submit details: " + result.message);
      }
    } catch (error) {
      toast.error("There was an error connecting to the server.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-200 flex flex-col items-center justify-center">
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden ">
          <div className="bg-blue-600 text-black px-6 py-4">
            <h2 className="text-3xl font-bold">Add Student Details</h2>
          </div>
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <label
                  htmlFor="studentId"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Student ID
                </label>
                <input
                  type="text"
                  id="studentId"
                  name="studentId"
                  value={formData.studentId}
                  onChange={handleChange}
                  className={`text-black mt-1 block w-full px-4 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${errors.studentId
                      ? "focus:ring-red-500 border-red-500"
                      : "focus:ring-blue-500 border-gray-300"
                    }`}
                  required
                />
                {errors.studentId && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.studentId}
                  </p>
                )}
              </div>
              <div className="relative">
                <label
                  htmlFor="grade"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Grade
                </label>
                <input
                  type="text"
                  id="grade"
                  name="grade"
                  value={formData.grade}
                  onChange={handleChange}
                  className={`text-black mt-1 block w-full px-4 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${errors.grade
                      ? "focus:ring-red-500 border-red-500"
                      : "focus:ring-blue-500 border-gray-300"
                    }`}
                  required
                />
                {errors.grade && (
                  <p className="text-red-500 text-sm mt-1">{errors.grade}</p>
                )}
              </div>
              <div className="relative col-span-full">
                <label
                  htmlFor="percentage"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Attendance (%)
                </label>
                <input
                  type="text"
                  id="percentage"
                  name="percentage"
                  value={formData.percentage}
                  onChange={handleChange}
                  className={`text-black mt-1 block w-full px-4 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${errors.percentage
                      ? "focus:ring-red-500 border-red-500"
                      : "focus:ring-blue-500 border-gray-300"
                    }`}
                  required
                />
                {errors.percentage && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.percentage}
                  </p>
                )}
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500 transition duration-300 ease-in-out"
              >
                Submit
              </button>
            </div>
          </form>
          <ToastContainer /> {/* Add ToastContainer here */}
        </div>
        <form action="http://localhost:5000/upload" method="get">

          <button
            type="submit"
            className="bg-blue-600 mt-20 text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500 transition duration-300 ease-in-out"
          >
            Upload via PDF
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddDetail;
