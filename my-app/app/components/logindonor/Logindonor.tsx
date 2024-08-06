"use client";
import React, { useState } from "react";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCookies } from "react-cookie";

const EduParentLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [cookies, setCookie] = useCookies(["authToken"]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Validate input
    switch (name) {
      case "email":
        setErrors({
          ...errors,
          email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
            ? ""
            : "Invalid email address",
        });
        break;
      case "password":
        setErrors({
          ...errors,
          password:
            value.length < 8
              ? "Password must be at least 8 characters long"
              : "",
        });
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // Check for validation errors
    if (errors.email || errors.password) {
      toast.error("Please fix the errors in the form");
      return;
    }

    // Send login request to backend
    try {
      const response = await fetch(
        "http://localhost:8800/api/v1/auth/eduParent/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (data.success) {
        // Store the token in cookies
        setCookie("authToken", data.token, {
          path: "/",
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // expires in 7 days
        });
        toast.success("Login successful");

        setTimeout(() => {
          window.location.href = "/eduparent/Donor/donateAmount"; // Redirect to the desired page
        }, 3000);
        // Redirect to dashboard or home page
      } else {
        toast.error(data.message || "There was an error logging in.");
      }
    } catch (error) {
      toast.error("There was an error connecting to the server.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <ToastContainer />
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.email ? "focus:ring-red-500" : "focus:ring-blue-500"
              }`}
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.password ? "focus:ring-red-500" : "focus:ring-blue-500"
                }`}
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3"
              >
                {showPassword ? (
                  <svg
                    className="w-5 h-5 text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3.1 4.9a10.07 10.07 0 000 14.2M21 12a9.96 9.96 0 00-5-8.7M4.3 9.3a9.96 9.96 0 000 5.4M12 12a6 6 0 016-6M6 12a6 6 0 016-6M21 12a9.96 9.96 0 01-5 8.7M12 12a6 6 0 01-6-6M9.4 16.6a6 6 0 01-3.4-3.4"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5 text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14.828 14.828a4 4 0 000-5.656M9.172 9.172a4 4 0 015.656 5.656M12 12a6 6 0 00-6 6M6 12a6 6 0 016-6M12 12a6 6 0 016-6M21 12a9.96 9.96 0 00-5-8.7M3.1 4.9a10.07 10.07"
                    />
                  </svg>
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg focus:outline-none hover:bg-blue-600"
            >
              Login
            </button>
            <Link href="/eduParent/signup" legacyBehavior>
              <a className="text-blue-500 hover:underline">
                Don't have an account?
              </a>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EduParentLogin;
