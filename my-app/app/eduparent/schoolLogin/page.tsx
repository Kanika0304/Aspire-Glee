import Footer from "@/app/components/Footer/page";
import Login from "@/app/components/loginschool/Login";
import Navbar from "@/app/components/Navbar/page";
import React from "react";

const page = () => {
  return (
    <div>
      <Navbar />
      <br />
      <br />
      <Login />
      <Footer />
    </div>
  );
};

export default page;
