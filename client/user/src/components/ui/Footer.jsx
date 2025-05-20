import React from "react";
import { FaInstagram, FaFacebook, FaTwitter, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <section
      className="Footer container bg-background p-10 rounded-t-4xl"
      id="about"
    >
      <div className="Footer_Wrapper w-full h-full flex justify-around">
        <div className="flex flex-col">
          <div className="flex flex-col">
            <h2 className="cal-sans-bold text-bold-red mb-4 text-3xl">
              Fooodish
            </h2>
            <p className="text-regular cal-sans-regular mb-4">
              Continue Foodish 2023 all rights reserved
            </p>
          </div>
          <div className="flex flex-col">
            <h2 className="cal-sans-bold text-bold-red mb-4 text-3xl">
              Follow Us On
            </h2>
            <div className="flex flex-row gap-4 mt-2">
              <FaInstagram className="text-regular w-6 h-6 cursor-pointer hover:opacity-80" />
              <FaFacebook className="text-regular w-6 h-6 cursor-pointer hover:opacity-80" />
              <FaTwitter className="text-regular w-6 h-6 cursor-pointer hover:opacity-80" />
              <FaGithub className="text-regular w-6 h-6 cursor-pointer hover:opacity-80" />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <h2 className="cal-sans-bold text-bold-red mb-4 text-3xl">Menu</h2>
          <a href="#home" className="text-regular cal-sans-regular">
            Home
          </a>
          <a href="#offer" className="text-regular cal-sans-regular">
            Offers
          </a>
          <a href="#service" className="text-regular cal-sans-regular">
            Service
          </a>
          <a href="#about" className="text-regular cal-sans-regular">
            About Us
          </a>
        </div>
        <div className="flex flex-col gap-3">
          <h2 className="cal-sans-bold text-bold-red mb-4 text-3xl">
            Information
          </h2>
          <p className="text-regular cal-sans-regular">Menu</p>
          <p className="text-regular cal-sans-regular">Quality</p>
          <p className="text-regular cal-sans-regular">Make a Choice</p>
          <p className="text-regular cal-sans-regular">Salad With Vegetable</p>
          <p className="text-regular cal-sans-regular">Fast Delivery</p>
          <p className="text-regular cal-sans-regular">Subscribe</p>
        </div>
        <div className="flex flex-col gap-3">
          <h2 className="cal-sans-bold text-bold-red mb-4 text-3xl">Contact</h2>
          <p className="text-regular cal-sans-regular">+855 .... ...</p>
          <p className="text-regular cal-sans-regular">Explore</p>
          <p className="text-regular cal-sans-regular">info@foodis.com</p>
          <p className="text-regular cal-sans-regular">
            1245, Cambodia, Phnom Penh
          </p>
        </div>
      </div>
      <div className="p-4"></div>
      <div className="p-4"></div>
    </section>
  );
};

export default Footer;
