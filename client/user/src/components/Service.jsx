import React from "react";

import ChickenBurger_Img from "../assets/FastFood.png";
import ChickenPizza_Img from "../assets/Burgur.png";
import FrenchFries_Img from "../assets/FrenchFries.png";

const SERVICE_CONTENT = [
  {
    description:
      "Here Are Some Of Our Best Distributed Categories. If You Want To You Can Order From Here.",
    img: ChickenBurger_Img,
    categories_title: "Chicken Burger",
    categories_description: "Order Now",
  },
  {
    description: null,
    img: ChickenPizza_Img,

    categories_title: "Chicken Pizza",
    categories_description: "Order Now",
  },
  {
    description: null,
    categories_title: "French Fries",
    img: FrenchFries_Img,
    categories_description: "Order Now",
  },
];

const Service = () => {
  return (
    <section
      className="Service flex flex-col container h-screen mt-60 "
      id="service"
    >
      <div className="Service__Header flex justify-between items-center">
        <div className="Service_Title cal-sans-bold text-6xl">
          Best {""}
          <span className="text-bold-red">Delivered</span>
          <br />
          Categories
        </div>
        <div className="Service_Description cal-sans-regular max-w-[35ch] text-xl">
          {SERVICE_CONTENT[0]?.description}
        </div>
      </div>

      <div className="Categories_Wrap flex justify-between items-end mt-20">
        {SERVICE_CONTENT.map((content, index) => (
          <div
            className="Categories w-1/3 flex flex-col items-center justify-center"
            key={index}
          >
            <img
              className="hover:scale-110 transition-all duration-300"
              src={content.img}
              alt=""
            />
            <div className="p-4"></div>
            <h2 className="cal-sans-bold text-4xl">
              {content.categories_title}
            </h2>
            <div className="p-2"></div>
            <span className="group cal-sans-regular text-bold-red text-2xl flex items-center hover:underline hover:decoration-3 hover:underline-offset-4 hover:text-bold-red-hover">
              {content.categories_description}
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="size-6 ml-2 text-bold-red group-hover:translate-x-1 transition-all duration-300 "
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m8.25 4.5 7.5 7.5-7.5 7.5"
                  />
                </svg>
              </span>
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Service;
