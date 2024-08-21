import React from "react";
import BackgroundTop from "../../img/bgLogin.jpg";
import NavbarUser from "../NavbarUser";

const LayoutUser = ({ children }) => {
  return (
    <>
      <NavbarUser />
      <div className="relative min-h-screen w-full bg-black pt-5 md:pt-10">
        {/* Background with opacity */}
        <div
          className="absolute inset-0  z-0"
          style={{
            backgroundImage: `url(${BackgroundTop})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
            opacity : 0.5
          }}
        />
        {/* Main content */}
        <main className="relative flex min-h-screen w-full p-2 sm:p-5">
          {children}
        </main>
      </div>
    </>
  );
};

export default LayoutUser;
