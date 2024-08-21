import React, { useState } from "react";
import { Link } from "react-router-dom";
import logoRes from "../img/LogoPTSP.png";
import { BiSupport } from "react-icons/bi";
import kemenag from "../img/depag.png";



const NavbarUser = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(true);
  };

  return (
    <>
      <div className="bg-[#013500] bg-opacity-[0.8] w-full sm:top-0 top-0 fixed flex justify-between items-center px-4 py-2 z-10 drop-shadow-lg">
        <div className="flex gap-2 items-center">
          <div className="">
            <img src={logoRes} alt="Logo" className="h-[40px] sm:h-[60px]" />
          </div>
        </div>
        <img src={kemenag} alt="" className="h-10" />
      </div>
      <div
        className={`top-7 fixed z-side left-0 ${isOpen ? "flex" : "hidden"}`}
      ></div>
    </>
  );
};

export default NavbarUser;
