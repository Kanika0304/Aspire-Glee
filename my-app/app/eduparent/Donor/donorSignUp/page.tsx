import Footer from "@/app/components/Footer/page";
import Navbar from "@/app/components/Navbar/page";
import Signup from "@/app/components/Signupdonor/Signupdonor";
import React from "react";

const page = () => {
  return (
    <div>
      <Navbar />
      <Signup />
      <Footer />
    </div>
  );
};

export default page;
