import React from "react";
import ChickenBurger_Img from "../../assets/FastFood.png";
import ChickenPizza_Img from "../../assets/Burgur.png";
import FrenchFries_Img from "../../assets/FrenchFries.png";
import { Link } from "react-router-dom";

const SERVICE_CONTENT = [
  {
    description:
      "Here Are Some Of Our Best Distributed Categories. If You Want To You Can Order From Here.",
    img: ChickenBurger_Img,
    categories_title: "Chicken Burger",
    categories_description: "Go See Menu",
    bgGradient: "from-foodle-warning-50 to-foodle-brand-100",
    accentColor: "text-foodle-brand-500",
    hoverGradient:
      "group-hover:from-foodle-brand-500 group-hover:to-foodle-accent-500",
    shadowColor: "shadow-foodle-brand",
    iconBg: "bg-foodle-brand-100",
  },
  {
    description: null,
    img: ChickenPizza_Img,
    categories_title: "Chicken Pizza",
    categories_description: "Go See Menu",
    bgGradient: "from-foodle-accent-50 to-pink-100",
    accentColor: "text-foodle-accent-500",
    hoverGradient: "group-hover:from-red-500 group-hover:to-pink-500",
    shadowColor: "shadow-foodle-accent",
    iconBg: "bg-foodle-accent-100",
  },
  {
    description: null,
    categories_title: "French Fries",
    img: FrenchFries_Img,
    categories_description: "Go See Menu",
    bgGradient: "from-foodle-warning-50 to-foodle-warning-100",
    accentColor: "text-foodle-warning-600",
    hoverGradient: "group-hover:from-yellow-500 group-hover:to-amber-500",
    shadowColor: "shadow-foodle-warning",
    iconBg: "bg-foodle-warning-100",
  },
];

const Service = () => {
  return (
    <section
      className="Service relative container mx-auto px-4 py-20 min-h-screen"
      id="service"
    >
      <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-orange-200 to-red-200 rounded-full opacity-20 blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-24 h-24 bg-gradient-to-br from-yellow-200 to-orange-200 rounded-full opacity-30 blur-lg animate-bounce"></div>

      {/* content */}
      <div className="relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-20 gap-8">
          <div className="flex-1">
            <div className="inline-block mb-4">
              <span className="cal-sans-regular text-foodle-brand-500 text-lg font-medium bg-foodle-brand-50 px-4 py-2 rounded-full">
                Our Specialties
              </span>
            </div>
            <h1 className="cal-sans-bold text-5xl lg:text-7xl leading-tight">
              Best{" "}
              <span className="relative inline-block">
                <span className="text-transparent bg-gradient-to-r from-foodle-brand-500 to-foodle-accent-500 bg-clip-text">
                  Delivered
                </span>
                <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-red-400 rounded-full"></div>
              </span>
              <br />
              <span className="text-foodle-neutral-800">Categories</span>
            </h1>
          </div>

          <div className="flex-1 lg:max-w-md">
            <div className="bg-foodle-glass backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100">
              <p className="cal-sans-regular text-foodle-neutral-600 text-lg leading-relaxed">
                {SERVICE_CONTENT[0]?.description}
              </p>
              <div className="mt-4 flex items-center text-foodle-brand-500">
                <div className="w-8 h-8 bg-foodle-brand-100 rounded-full flex items-center justify-center mr-3">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="cal-sans-regular text-sm">
                  Premium Quality Guaranteed
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {SERVICE_CONTENT.map((content, index) => (
            <div
              key={index}
              className={`group relative overflow-hidden rounded-3xl bg-gradient-to-br ${content.bgGradient} p-8 transition-all duration-700 hover:scale-105 hover:-translate-y-4 shadow-xl hover:shadow-2xl ${content.shadowColor}`}
              style={{
                animationDelay: `${index * 150}ms`,
              }}
            >
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-4 right-4 w-20 h-20 border-2 border-current rounded-full"></div>
                <div className="absolute bottom-8 left-4 w-12 h-12 border border-current rounded-full"></div>
              </div>

              <div className="relative z-10 flex flex-col items-center text-center h-full">
                <div className="relative mb-8 animate-float-always md:animate-none md:group-hover:animate-float">
                  <div
                    className={`absolute inset-0 ${content.iconBg} rounded-full blur-xl opacity-30 scale-150 group-hover:scale-175 transition-transform duration-700`}
                  ></div>
                  <div className="relative w-48 h-48 flex items-center justify-center">
                    <img
                      className="w-full h-full object-contain drop-shadow-2xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500"
                      src={content.img}
                      alt={content.categories_title}
                    />
                  </div>

                  <div className="absolute -top-2 -left-2 w-3 h-3 bg-gradient-to-r from-orange-400 to-red-400 rounded-full opacity-100 md:opacity-0 md:group-hover:opacity-100 animate-ping md:animate-none md:group-hover:animate-ping transition-opacity duration-300"></div>
                  <div className="absolute -bottom-3 -right-3 w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full opacity-100 md:opacity-0 md:group-hover:opacity-100 animate-pulse md:animate-none group-hover:animate-pulse transition-opacity duration-300 delay-150"></div>
                </div>

                <div className="flex-1 flex flex-col justify-end">
                  <h2 className="cal-sans-bold text-3xl lg:text-4xl text-foodle-neutral-800 mb-6 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-gray-800 group-hover:to-gray-600 transition-all duration-300">
                    {content.categories_title}
                  </h2>

                  <Link
                    to="/allmenu"
                    className={`group/btn inline-flex items-center justify-center cal-sans-regular text-lg ${content.accentColor} hover:text-white bg-white hover:bg-gradient-to-r ${content.hoverGradient} px-8 py-4 rounded-2xl border-2 border-current hover:border-transparent transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105`}
                  >
                    <span className="mr-2">
                      {content.categories_description}
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m8.25 4.5 7.5 7.5-7.5 7.5"
                      />
                    </svg>
                  </Link>
                </div>
              </div>

              <div
                className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r ${content.hoverGradient.replace(
                  "group-hover:",
                  ""
                )} rounded-full group-hover:w-3/4 transition-all duration-500 ease-out`}
              ></div>
            </div>
          ))}
        </div>

        <div className="text-center mt-20">
          <div className="inline-flex items-center gap-4 bg-foodle-glass backdrop-blur-sm rounded-2xl p-6 shadow-lg">
            <div className="flex -space-x-2">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-5 h-5 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-orange-400 to-red-400 border-2 border-white shadow-lg"
                  style={{ animationDelay: `${i * 100}ms` }}
                ></div>
              ))}
            </div>
            <div className="text-left">
              <p className="cal-sans-regular text-foodle-neutral-800 text-sm md:text-base">
                Join 10,000+ happy customers
              </p>
              <p className="cal-sans-regular text-foodle-neutral-600 text-xs md:text-sm">
                Experience the taste of perfection
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Service;
