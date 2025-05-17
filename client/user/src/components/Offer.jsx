import React from "react";

import Icon_Img from "../assets/Hero_img.png";
import FastFood from "../assets/Burgur.png";

const OFFER_CONTENTS = [
  {
    title: "Fast Delivery",
    description:
      "The Food Will Be Delivered to Your Home Within 1 - 2 Hours Of Your Ordering.",
    img: Icon_Img,
  },
  {
    title: "Fresh Food",
    description:
      "Your Food Will Be Delivered 100% Fresh To Your Home. We Do Not Deliver Stale Food.",
    img: FastFood,
  },
  {
    title: "Free Delivery",
    description:
      "Your Food Delivery Is Absolutely Free. No Cost Just Order And Enjoy.",
    img: Icon_Img,
  },
];

const Offer = () => {
  return (
    <section
      className="Offer flex container justify-between absolute -bottom-[100px]"
      id="offer"
    >
      <div className="Offer_Content_Wrapper flex p-10 rounded-[50px] bg-light shadow-2xl h-fit gap-4">
        {OFFER_CONTENTS.map((content, index) => (
          <div className="Offer_contents w-1/3 flex items-center" key={index}>
            <div className="Offer_Detail_Icon w-1/2 mr-2">
              <img src={content.img} alt="" />
            </div>
            <div className="Offer_Detail flex flex-col ">
              <span className="Offer_Detail_Title cal-sans-bold text-2xl">
                {content.title}
              </span>
              <div className="p-2"></div>
              <p className="Offer_Detail_Description cal-sans-regular max-w-[30ch] text-md">
                {content.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div></div>
    </section>
  );
};

export default Offer;
