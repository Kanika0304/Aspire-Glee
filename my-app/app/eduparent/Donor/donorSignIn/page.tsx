import Footer from "@/app/components/Footer/page";
import EduParentLogin from "@/app/components/logindonor/Logindonor";
import Navbar from "@/app/components/Navbar/page";

import React from "react";

const page = () => {
  return (
    <div>
      <Navbar />
      <EduParentLogin />
      <Footer />
    </div>
  );
};

export default page;
