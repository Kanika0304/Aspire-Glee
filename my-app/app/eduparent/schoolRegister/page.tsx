import Footer from "@/app/components/Footer/page";
import Navbar from "@/app/components/Navbar/page";
import Signup from "@/app/components/Signupschool.tsx/signup";
import React from "react";

const page = () => {
  return (
    <div data-theme="light">
      <Navbar />
      <br />
      <br />
      <Signup />
      <Footer />
    </div>
  );
};

export default page;
