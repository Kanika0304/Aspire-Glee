"use client";
import Footer from "@/app/components/Footer/page";
import Navbar from "@/app/components/Navbar/page";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

// Define the Student type
interface Student {
  id: number;
  studentName: string;
  familyIncome: number;
  studentImage: string;
  isDisabled: string;
  approved: string;
}

// Fetch function to get student data from the backend API
const fetchStudentData = async (token: string | null): Promise<Student[]> => {
  try {
    const response = await fetch(
      "http://localhost:8800/api/v1/school/retrieveSchoolData",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the request headers
        },
      }
    );

    const result = await response.json();
    console.log(result);

    if (result.success) {
      return result.data; // Return the student data from the response
    } else {
      throw new Error(result.message); // Throw an error if the request fails
    }
  } catch (error) {
    console.error("Error fetching student data:", error);
    return []; // Return an empty array in case of error
  }
};

const ViewStudentsPage = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [cookies] = useCookies(["authToken"]); // Use react-cookie to get the token
  const token = cookies.authToken || null; // Retrieve the token from cookies

  useEffect(() => {
    const getStudents = async () => {
      if (token) {
        const data = await fetchStudentData(token);
        console.log(data);
        setStudents(data);
      } else {
        console.error("No authentication token found");
      }
    };

    getStudents();
  }, [token]); // Add token as a dependency

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
          <div id="view-students">
            <h2 className="text-2xl font-bold mb-4">Submitted Students</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {students.map((student) => (
                <div
                  key={student.id}
                  className="bg-white p-4 rounded-lg shadow-lg"
                >
                  <img
                    src={student.studentImage}
                    alt={student.studentName}
                    className="w-full h-40 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-lg font-semibold mb-2">
                    {student.studentName}
                  </h3>
                  <p className="text-gray-700 mb-1">
                    Family Income: ${student.familyIncome}
                  </p>
                  <p className="text-gray-700 mb-1">
                    Is Disabled: {student.isDisabled}
                  </p>
                  <p className="text-gray-700 mb-1">
                    Approved: {student.approved}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ViewStudentsPage;
