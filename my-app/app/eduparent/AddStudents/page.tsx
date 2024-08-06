"use client";
import Footer from "@/app/components/Footer/page";
import Navbar from "@/app/components/Navbar/page";
import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for Toastify

const AddStudentPage = () => {
  const [formData, setFormData] = useState({
    studentName: "",
    familyIncome: "",
    studentImage: null as File | null,
    isDisabled: "No",
    approved: "No",
    grade: "",
    percentage: "",
    studentId: "",
  });

  const [errors, setErrors] = useState({
    studentName: "",
    familyIncome: "",
    studentImage: "",
    grade: "",
    percentage: "",
    studentId: "",
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "studentImage") {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (
        file &&
        (file.type === "image/jpeg" ||
          file.type === "image/png" ||
          file.type === "image/jpg")
      ) {
        if (file.size <= 2 * 1024 * 1024) {
          setFormData({
            ...formData,
            studentImage: file,
          });
          setErrors({
            ...errors,
            studentImage: "",
          });
        } else {
          setErrors({
            ...errors,
            studentImage: "File size should not exceed 2MB",
          });
        }
      } else {
        setErrors({
          ...errors,
          studentImage:
            "Invalid file type. Only jpg, jpeg, and png are allowed",
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });

      // Validate input
      switch (name) {
        case "studentName":
          setErrors({
            ...errors,
            studentName: /^[a-zA-Z\s]*$/.test(value)
              ? ""
              : "Student name should only contain letters",
          });
          break;
        case "familyIncome":
          setErrors({
            ...errors,
            familyIncome: /^\d+$/.test(value)
              ? ""
              : "Family income should be a number",
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
        case "studentId":
          setErrors({
            ...errors,
            studentId: /^\d+$/.test(value)
              ? ""
              : "Student ID should be a number",
          });
          break;
        default:
          break;
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check for validation errors
    if (
      errors.studentName ||
      errors.familyIncome ||
      errors.studentImage ||
      errors.percentage ||
      errors.studentId
    ) {
      toast.error("Please fix the errors in the form");
      return;
    }

    // Prepare form data for submission
    const data = new FormData();
    data.append("studentName", formData.studentName);
    data.append("familyIncome", formData.familyIncome);
    if (formData.studentImage) {
      data.append("studentImage", formData.studentImage);
    }
    data.append("isDisabled", formData.isDisabled);
    data.append("approved", formData.approved);
    data.append("grade", formData.grade);
    data.append("percentage", formData.percentage);
    data.append("studentId", formData.studentId);

    // Send data to the backend
    try {
      const response = await fetch(
        "http://localhost:8800/api/v1/school/addStudent",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`, // Include the token here
          },
          body: data,
        }
      );

      const result = await response.json();

      if (result.success) {
        toast.success("Student data has been successfully submitted.");
        // Reset form
        setFormData({
          studentName: "",
          familyIncome: "",
          studentImage: null,
          isDisabled: "No",
          approved: "No",
          grade: "",
          percentage: "",
          studentId: "",
        });
      } else {
        toast.error("There was an error submitting the student data.");
      }
    } catch (error) {
      toast.error("There was an error connecting to the server.");
    }
  };

  return (
    <div data-theme="light">
      <Navbar />
      <div className="min-h-screen flex">
        <aside className="w-64 bg-gray-800 text-white p-4">
          <h2 className="text-2xl font-bold mb-4">Menu</h2>
          <ul>
            <li className="mb-2">
              <a
                href="/eduparent/AddStudents"
                className="block py-2 px-3 hover:bg-gray-700 rounded"
              >
                Add Student
              </a>
            </li>
            <li className="mb-2">
              <a
                href="/eduparent/viewStudents"
                className="block py-2 px-3 hover:bg-gray-700 rounded"
              >
                View Students
              </a>
            </li>
          </ul>
        </aside>
        <div className="flex-1 p-8">
          <div id="add-student" className="mb-12">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg mx-auto">
              <h1 className="text-3xl font-bold mb-4 text-center text-blue-600">
                Scholarship Application
              </h1>
              <p className="text-center text-gray-700 mb-6">
                Please fill out the form below to add student data for
                scholarship consideration.
              </p>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">
                    Student Name
                  </label>
                  <input
                    type="text"
                    name="studentName"
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.studentName
                        ? "focus:ring-red-500 border-red-500"
                        : "focus:ring-blue-500 border-gray-300"
                    }`}
                    placeholder="Enter student name"
                    value={formData.studentName}
                    onChange={handleChange}
                  />
                  {errors.studentName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.studentName}
                    </p>
                  )}
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">
                    Family Income
                  </label>
                  <input
                    type="text"
                    name="familyIncome"
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.familyIncome
                        ? "focus:ring-red-500 border-red-500"
                        : "focus:ring-blue-500 border-gray-300"
                    }`}
                    placeholder="Enter family income"
                    value={formData.familyIncome}
                    onChange={handleChange}
                  />
                  {errors.familyIncome && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.familyIncome}
                    </p>
                  )}
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">
                    Grade
                  </label>
                  <input
                    type="text"
                    name="grade"
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.grade
                        ? "focus:ring-red-500 border-red-500"
                        : "focus:ring-blue-500 border-gray-300"
                    }`}
                    placeholder="Enter student grade"
                    value={formData.grade}
                    onChange={handleChange}
                  />
                  {errors.grade && (
                    <p className="text-red-500 text-sm mt-1">{errors.grade}</p>
                  )}
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">
                    Percentage
                  </label>
                  <input
                    type="text"
                    name="percentage"
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.percentage
                        ? "focus:ring-red-500 border-red-500"
                        : "focus:ring-blue-500 border-gray-300"
                    }`}
                    placeholder="Enter student percentage"
                    value={formData.percentage}
                    onChange={handleChange}
                  />
                  {errors.percentage && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.percentage}
                    </p>
                  )}
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">
                    Student ID
                  </label>
                  <input
                    type="text"
                    name="studentId"
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.studentId
                        ? "focus:ring-red-500 border-red-500"
                        : "focus:ring-blue-500 border-gray-300"
                    }`}
                    placeholder="Enter student ID"
                    value={formData.studentId}
                    onChange={handleChange}
                  />
                  {errors.studentId && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.studentId}
                    </p>
                  )}
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">
                    Student Image
                  </label>
                  <input
                    type="file"
                    name="studentImage"
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.studentImage
                        ? "focus:ring-red-500 border-red-500"
                        : "focus:ring-blue-500 border-gray-300"
                    }`}
                    onChange={handleChange}
                  />
                  {errors.studentImage && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.studentImage}
                    </p>
                  )}
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">
                    Is Disabled
                  </label>
                  <select
                    name="isDisabled"
                    className="w-full px-3 py-2 text-black border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.isDisabled}
                    onChange={handleChange}
                  >
                    <option className="text-black" value="No">
                      No
                    </option>
                    <option className="text-black" value="Yes">
                      Yes
                    </option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
                >
                  Add Student
                </button>
              </form>
              <ToastContainer /> {/* Add ToastContainer here */}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AddStudentPage;
