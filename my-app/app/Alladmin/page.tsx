"use client";

import { FC, useState } from "react";
import Navbar from "../components/Navbar/page";
import Footer from "../components/Footer/page";

interface STUDENT {
  name: string;
  tenure: number;
  kids: number;
  donation: string;
}

interface APPLIED_STUDENT {
  name: string;
  course: string;
  age: number;
  status: string;
}

const studentData: STUDENT[] = [
  {
    name: "Alice Johnson",
    tenure: 5,
    kids: 2,
    donation: "Rs. 900000",
  },
  {
    name: "Bob Smith",
    tenure: 3,
    kids: 1,
    donation: "Rs. 390000",
  },
  {
    name: "Carol Williams",
    tenure: 4,
    kids: 3,
    donation: "Rs. 800000",
  },
  {
    name: "David Brown",
    tenure: 2,
    kids: 0,
    donation: "Rs. 50000",
  },
  {
    name: "Emily Davis",
    tenure: 6,
    kids: 2,
    donation: "Rs. 300000",
  },
  {
    name: "Frank Miller",
    tenure: 5,
    kids: 2,
    donation: "Rs. 900000",
  },
  {
    name: "Grace Wilson",
    tenure: 3,
    kids: 1,
    donation: "Rs. 390000",
  },
  {
    name: "Henry Moore",
    tenure: 4,
    kids: 3,
    donation: "Rs. 800000",
  },
  {
    name: "Ivy Taylor",
    tenure: 2,
    kids: 0,
    donation: "Rs. 50000",
  },
  {
    name: "Jack Anderson",
    tenure: 6,
    kids: 2,
    donation: "Rs. 300000",
  },
];

const appliedStudents: APPLIED_STUDENT[] = [
  {
    name: "Aryan Sharma",
    course: "Mathematics",
    age: 15,
    status: "Pending",
  },
  {
    name: "Ananya Gupta",
    course: "Science",
    age: 14,
    status: "Pending",
  },
  {
    name: "Rohan Mehta",
    course: "Social Studies",
    age: 16,
    status: "Pending",
  },
  {
    name: "Sneha Patel",
    course: "English",
    age: 14,
    status: "Pending",
  },
  {
    name: "Kabir Reddy",
    course: "Hindi",
    age: 15,
    status: "Pending",
  },
  {
    name: "Priya Kumar",
    course: "Computer Science",
    age: 16,
    status: "Pending",
  },
  {
    name: "Riya Nair",
    course: "Geography",
    age: 15,
    status: "Pending",
  },
  {
    name: "Arjun Singh",
    course: "History",
    age: 16,
    status: "Pending",
  },
];

const TableOne: FC = () => {
  const [activeTab, setActiveTab] = useState("Donated Funds");

  return (
    <>
      <Navbar />
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 h-screen bg-gray-800 text-white flex flex-col">
          <div className="p-4 text-xl font-semibold border-b border-gray-700">
            Menu
          </div>
          <div
            className={`p-4 cursor-pointer ${
              activeTab === "Donated Funds" ? "bg-gray-700" : ""
            }`}
            onClick={() => setActiveTab("Donated Funds")}
          >
            Donated Funds
          </div>
          <div
            className={`p-4 cursor-pointer ${
              activeTab === "Applied Students" ? "bg-gray-700" : ""
            }`}
            onClick={() => setActiveTab("Applied Students")}
          >
            Applied Students
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <h4 className="mb-6 text-2xl font-semibold text-white">
            {activeTab === "Donated Funds"
              ? "Donor History"
              : "Applied Students"}
          </h4>

          {activeTab === "Donated Funds" ? (
            <div className="overflow-x-auto">
              <div className="min-w-full bg-gray-200 rounded-t-lg">
                <div className="grid grid-cols-5 gap-4 p-4">
                  <div className="text-gray-700 font-semibold">Name</div>
                  <div className="text-gray-700 font-semibold text-center">
                    Tenure (years)
                  </div>
                  <div className="text-gray-700 font-semibold text-center">
                    No. of Kids
                  </div>
                  <div className="text-gray-700 font-semibold text-center">
                    Donation
                  </div>
                  <div className="text-gray-700 font-semibold text-center">
                    Actions
                  </div>
                </div>
              </div>

              {studentData.map((student, key) => (
                <div
                  className={`grid grid-cols-5 gap-4 p-4 items-center bg-white ${
                    key % 2 === 0 ? "bg-gray-100" : "bg-gray-50"
                  }`}
                  key={key}
                >
                  <div className="text-gray-800">{student.name}</div>
                  <div className="text-gray-800 text-center">
                    {student.tenure}
                  </div>
                  <div className="text-gray-800 text-center">
                    {student.kids}
                  </div>
                  <div className="text-gray-800 text-center">
                    {student.donation}
                  </div>
                  <div className="text-center">
                    <button className="text-white bg-green-500 hover:bg-green-600 px-4 py-2 rounded transition duration-300">
                      Accept
                    </button>
                    <button className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded ml-2 transition duration-300">
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <div className="min-w-full bg-gray-200 rounded-t-lg">
                <div className="grid grid-cols-5 gap-4 p-4">
                  <div className="text-gray-700 font-semibold">Name</div>
                  <div className="text-gray-700 font-semibold text-center">
                    Course
                  </div>
                  <div className="text-gray-700 font-semibold text-center">
                    Age
                  </div>
                  <div className="text-gray-700 font-semibold text-center">
                    Status
                  </div>
                  <div className="text-gray-700 font-semibold text-center">
                    Actions
                  </div>
                </div>
              </div>

              {appliedStudents.map((student, key) => (
                <div
                  className={`grid grid-cols-5 gap-4 p-4 items-center bg-white ${
                    key % 2 === 0 ? "bg-gray-100" : "bg-gray-50"
                  }`}
                  key={key}
                >
                  <div className="text-gray-800">{student.name}</div>
                  <div className="text-gray-800 text-center">
                    {student.course}
                  </div>
                  <div className="text-gray-800 text-center">{student.age}</div>
                  <div className="text-gray-800 text-center">
                    {student.status}
                  </div>
                  <div className="text-center">
                    <button className="text-white bg-green-500 hover:bg-green-600 px-4 py-2 rounded transition duration-300">
                      Accept
                    </button>
                    <button className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded ml-2 transition duration-300">
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TableOne;
