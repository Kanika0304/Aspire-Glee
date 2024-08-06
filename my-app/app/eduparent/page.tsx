import React from "react";
import Footer from "../components/Footer/page";
import Navbar from "../components/Navbar/page";

const Page = () => {
  return (
    <>
      <Navbar />
      <div className="bg-gray-100 min-h-screen flex flex-col">
        <header className="bg-gradient-to-r from-blue-500 to-teal-500 text-white py-8">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl font-bold mb-2">Support Student Success</h1>
            <p className="text-xl mb-6">
              Make a Difference: Donate or Apply for Scholarships
            </p>
          </div>
        </header>

        <main className="flex-grow container mx-auto px-6 py-12">
          <div className="bg-white p-8 rounded-lg shadow-lg mb-12">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">
              Donate for Student Scholarships
            </h2>
            <p className="text-gray-600 mb-6">
              Your contributions help students achieve their dreams and pursue
              higher education. Every donation supports scholarships that
              provide financial assistance to deserving students.
            </p>
            <a
              href="./eduparent/Donor/donateAmount"
              className="bg-blue-600 text-white py-4 px-8 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 text-lg"
            >
              Donate Now
            </a>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">
              Apply for Student Scholarships
            </h2>
            <p className="text-gray-600 mb-6">
              Schools can apply for scholarships to support students in need. To
              begin the application process, please{" "}
              <a
                href="/register-or-login"
                className="text-blue-600 hover:underline"
              >
                register or log in
              </a>
              .
            </p>
            <a
              href="/eduparent/schoolRegister"
              className="bg-blue-600 text-white py-4 px-8 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 text-lg inline-block text-center"
            >
              Register / Log In
            </a>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Page;
