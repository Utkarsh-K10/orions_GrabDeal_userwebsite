import React, { useEffect, useState, useRef } from "react";
import "./ServiceNavbar.css";
import { useDetectOutsideClick } from "./useDetectOutsideClick";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineMenu } from "react-icons/ai";
import { ImMenu } from "react-icons/im";
import { Link } from "react-router-dom";

const MenubarContent = () => {
  return (
    <div className="Navbargrid-container">
      <div>
        <Link to="/ourservices">
          <a className="Link">Our Services</a>
        </Link>
      </div>
      <div>
        <Link to="#">About Us</Link>
      </div>
      <div>
        <a className="Link" href="#">
          Sell on Material Buy
        </a>
      </div>
      <div>
        <a className="Link" href="tel:+919876543210">
          Buy On Call-9876543210
        </a>
      </div>
    </div>
  );
};

const MyFunction = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDesktop, setDesktop] = useState(window.innerWidth > 800);

  const dropdownRef = useRef(null);
  // const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const [isActive, setIsActive] = useState(false);
  const onClick = () => setIsActive(!isActive);

  const updateMedia = () => {
    setDesktop(window.innerWidth > 800);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });
  return (
    <>
      {isDesktop ? (
        <MenubarContent />
      ) : (
        <div className="responsive-btn menuList-container">
          <button className="HamburgerBtn" onClick={onClick}>
            <AiOutlineMenu className="Hamburger" />
          </button>
          <nav
            ref={dropdownRef}
            className={`menuList ${isActive ? "active" : "inactive"}`}
          >
            <MenubarContent />
          </nav>
        </div>
      )}
    </>
  );
};

const ServiceNavbar = () => {
  return (
    <div>
      <MyFunction />
    </div>
  );
};

export default ServiceNavbar;
