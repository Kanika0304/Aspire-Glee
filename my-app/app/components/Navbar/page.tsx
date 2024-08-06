import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className="navbar bg-white text-black shadow-lg">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-white rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <a href="/">Homepage</a>
            </li>
            <li>
              <a href="/eduparent/Donor/donorSignUp">EduParent</a>
            </li>
            <li>
              <a>About</a>
            </li>
            <li>
              <a href="/volunteer/signupvolunteer">Volunteer</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <a href="/" className="btn btn-ghost normal-case text-xl">
          Aspire & Glee
        </a>
      </div>
      <div className="navbar-end flex items-center">
        <button className="btn btn-ghost btn-circle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
        <button className="btn btn-ghost btn-circle">
          <div className="indicator">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <span className="badge badge-xs badge-primary indicator-item"></span>
          </div>
        </button>
        <a
          href="https://wa.me/+14155238886" // Replace with your WhatsApp number
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-ghost btn-circle"
        >
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-500 text-white hover:bg-green-600 transition duration-300">
            <FaWhatsapp className="w-5 h-5" />
          </div>
        </a>
      </div>
    </div>
  );
};

export default Navbar;
