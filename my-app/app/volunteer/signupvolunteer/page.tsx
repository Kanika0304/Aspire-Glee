"use client";
import React, { useState } from "react";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCookies } from "react-cookie";

// Function to check password strength
const checkPasswordStrength = (password: string) => {
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

const VolunteerSignup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    otp: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [passwordStrength, setPasswordStrength] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [cookies, setCookie] = useCookies(["authToken"]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Validate input
    switch (name) {
      case "name":
        setErrors({
          ...errors,
          name: /^[a-zA-Z\s]*$/.test(value)
            ? ""
            : "Name should only contain letters",
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
        "http://localhost:8800/api/v1/auth/volunteer/sendOTP",
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
        "http://localhost:8800/api/v1/auth/volunteer/signUp",
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
      } else {
        toast.error(data.message || "There was an error signing up.");
      }
    } catch (error) {
      toast.error("There was an error connecting to the server.");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (errors.name || errors.password) {
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
          Volunteer Signup
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 ${
                errors.name ? "focus:ring-red-500" : "focus:ring-blue-500"
              }`}
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              disabled={isOtpSent}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
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
                    d="M14.828 14.828a4 4 0 000-5.656M9.172 9.172a4 4 0 015.656 5.656M12 12a6 6 0 00-6 6M6 12a6 6 0 016-6M12 12a6 6 0 016-6M21 12a9.96 9.96 0 00-5-8.7M3.1 4.9a10.07"
                  />
                </svg>
              )}
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
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            {isOtpSent ? "Complete Registration" : "Send OTP"}
          </button>
        </form>
        <p className="text-center mt-4 text-gray-600">
          Already have an account?{" "}
          <Link
            href="/volunteer/loginvolunteer"
            className="text-blue-500 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default VolunteerSignup;
