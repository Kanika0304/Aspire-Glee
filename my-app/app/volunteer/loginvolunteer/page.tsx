"use client";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCookies } from "react-cookie";

const LoginVolunteer = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<string>("");
  const [cookies, setCookie] = useCookies(["authToken"]);

  // Password strength checker
  const checkPasswordStrength = (password: string) => {
    if (
      password.length > 8 &&
      /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)
    ) {
      return "Strong";
    } else if (password.length > 5 && /(?=.*[a-z])(?=.*\d)/.test(password)) {
      return "Medium";
    } else {
      return "Weak";
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordStrength(checkPasswordStrength(newPassword));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:8800/api/v1/auth/volunteer/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
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
        setTimeout(() => {
          window.location.href = "/volunteer/adddetails"; // Redirect to the desired page
        }, 3000);

        toast.success("Login successful.");
      } else {
        toast.error(data.message || "There was an error logging in.");
      }
    } catch (error) {
      toast.error("There was an error connecting to the server.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
      <ToastContainer />
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Volunteer Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={handlePasswordChange}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center px-3"
              >
                {showPassword ? (
                  <span role="img" aria-label="Hide" className="text-gray-500">
                    🙈
                  </span>
                ) : (
                  <span role="img" aria-label="Show" className="text-gray-500">
                    👁️
                  </span>
                )}
              </button>
            </div>
            <div className="mt-1 text-sm">
              Password Strength:{" "}
              <span
                className={`${
                  passwordStrength === "Strong"
                    ? "text-green-500"
                    : passwordStrength === "Medium"
                    ? "text-yellow-500"
                    : "text-red-500"
                }`}
              >
                {passwordStrength}
              </span>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginVolunteer;
