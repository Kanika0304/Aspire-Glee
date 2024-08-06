"use client";
import React, { useState } from "react";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCookies } from "react-cookie";

// Function to check password strength
const checkPasswordStrength = (password: any) => {
  const strength = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };

  const score = Object.values(strength).filter(Boolean).length;

  switch (score) {
    case 5:
      return "Strong";
    case 4:
      return "Moderate";
    case 3:
      return "Weak";
    default:
      return "Very Weak";
  }
};

const EduParentSignup = () => {
  const [formData, setFormData] = useState({
    parentName: "",
    phoneNumber: "",
    // Default country code
    email: "",
    password: "",
    otp: "",
  });

  const [errors, setErrors] = useState({
    parentName: "",
    phoneNumber: "",
    password: "",
  });

  const [passwordStrength, setPasswordStrength] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [cookies, setCookie] = useCookies(["authToken"]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Validate input
    switch (name) {
      case "parentName":
        setErrors({
          ...errors,
          parentName: /^[a-zA-Z\s]*$/.test(value)
            ? ""
            : "Name should only contain letters",
        });
        break;
      case "phoneNumber":
        setErrors({
          ...errors,
          phoneNumber: /^\d{10}$/.test(value)
            ? ""
            : "Phone number must be exactly 10 digits",
        });
        break;
      case "password":
        setPasswordStrength(checkPasswordStrength(value));
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

  const handleSendOtp = async () => {
    try {
      const response = await fetch(
        "http://localhost:8800/api/v1/auth/eduParent/sendOTP",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: formData.email }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setIsOtpSent(true);
        toast.success(
          "A verification email has been sent to your email address."
        );
      } else {
        toast.error(data.message || "There was an error sending the OTP.");
      }
    } catch (error) {
      toast.error("There was an error connecting to the server.");
    }
  };

  const handleSignUp = async () => {
    try {
      const response = await fetch(
        "http://localhost:8800/api/v1/auth/eduParent/signUp",
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
        // Store the token in local storage and cookies
        localStorage.setItem("authToken", data.token);
        setCookie("authToken", data.token, {
          path: "/",
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // expires in 7 days
        });

        toast.success("Registration successful.");
        setTimeout(() => {
          window.location.href = "/eduparent/Donor/donateAmount"; // Redirect to the desired page
        }, 3000);
      } else {
        toast.error(data.message || "There was an error signing up.");
      }
    } catch (error) {
      toast.error("There was an error connecting to the server.");
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (errors.parentName || errors.phoneNumber || errors.password) {
      toast.error("Please fix the errors in the form");
      return;
    }

    if (!isOtpSent) {
      await handleSendOtp();
    } else {
      await handleSignUp();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <ToastContainer />
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800">
          Parent Signup
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Parent Name
            </label>
            <input
              type="text"
              name="parentName"
              className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 ${
                errors.parentName ? "focus:ring-red-500" : "focus:ring-blue-500"
              }`}
              placeholder="Enter your name"
              value={formData.parentName}
              onChange={handleChange}
              disabled={isOtpSent}
            />
            {errors.parentName && (
              <p className="text-red-500 text-sm mt-1">{errors.parentName}</p>
            )}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Phone Number
            </label>
            <div className="flex">
              <input
                type="tel"
                name="phoneNumber"
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.phoneNumber
                    ? "focus:ring-red-500"
                    : "focus:ring-blue-500"
                }`}
                placeholder="Enter your phone number"
                value={formData.phoneNumber}
                onChange={handleChange}
                disabled={isOtpSent}
              />
            </div>
            {errors.phoneNumber && (
              <p className="text-red-500 text-sm">{errors.phoneNumber}</p>
            )}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              disabled={isOtpSent}
            />
          </div>

          <div className="mb-6 relative">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 ${
                errors.password ? "focus:ring-red-500" : "focus:ring-blue-500"
              }`}
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              disabled={isOtpSent}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
            <p
              className={`text-sm mt-2 ${
                passwordStrength === "Strong"
                  ? "text-green-500"
                  : passwordStrength === "Moderate"
                  ? "text-yellow-500"
                  : "text-red-500"
              }`}
            >
              Password Strength: {passwordStrength}
            </p>
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 right-3 transform -translate-y-1/2"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {isOtpSent && (
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                OTP
              </label>
              <input
                type="text"
                name="otp"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter the OTP"
                value={formData.otp}
                onChange={handleChange}
              />
            </div>
          )}
          <div className="mb-6">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {isOtpSent ? "Verify OTP and Sign Up" : "Send OTP"}
            </button>
          </div>
        </form>
        <div className="text-center">
          Already have an account?{" "}
          <Link href="/eduParent/login" legacyBehavior>
            <a className="text-blue-600 hover:underline">Login</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EduParentSignup;
