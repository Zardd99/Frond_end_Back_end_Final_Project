import { Link } from "react-router-dom";
import MenuCard from "./MenuCard";
import { MENU_CONTENT } from "./constants";

import Burgur from "../../assets/horizon_banner.jpg";
import Pizza from "../../assets/verticle_banner.jpg";

const Menu = ({ allMenuPage }) => (
  <section
    className={`Menu flex flex-col container mt-25 ${
      allMenuPage ? `h-screen` : `h-auto`
    }`}
    id="menu"
  >
    {/*  */}
    {/* Render "Go Back To Home Page When All MenuPage is Open" else Render "See All on the Button" */}
    {/*  */}
    <div className="Menu__Header flex flex-col justify-between">
      {allMenuPage ? (
        <div className="Service_Title cal-sans-bold text-5xl">
          All Of Our {""}
          <span className="text-transparent bg-gradient-to-r from-foodle-brand-500 to-foodle-accent-500 bg-clip-text text-5xl lg:text-7xl leading-tight">
            Regular {""}{" "}
          </span>
          Menu
        </div>
      ) : (
        <div className="Service_Title cal-sans-bold text-5xl">
          Our {""}
          <span className="text-transparent bg-gradient-to-r from-foodle-brand-500 to-foodle-accent-500 bg-clip-text text-5xl lg:text-7xl leading-tight">
            Regular {""}
          </span>
          Menu
        </div>
      )}
      <div className="cal-sans-regular text-xl mt-4 md-mt-0 flex flex-col md:flex-row justify-between w-full gap-y-4">
        <div className="max-w-[36ch] text-sm text-hero-hero-gray-600 md:text-xl">
          {MENU_CONTENT[0]?.description}
        </div>
        <div className="flex flex-wrap gap-6 pt-4">
          {allMenuPage ? (
            <Link
              to="/"
              onClick={() => {
                setTimeout(() => {
                  const menuSection = document.getElementById("menu");
                  if (menuSection) {
                    menuSection.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }
                }, 100);
              }}
              className="group relative inline-flex items-center px-8 py-4 bg-black text-hero-hero-white font-semibold rounded-full hover:bg-hero-hero-gray-800 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl border border-hero-hero-gray-200"
            >
              <div className="flex items-center gap-3">
                <span className="text-sm md:text-lg text-hero-white">
                  Back To Home Page
                </span>
              </div>
              <div className="absolute inset-0 -top-[200%] bg-gradient-to-r from-transparent via-hero-hero-white/30 to-transparent skew-y-12 group-hover:top-[200%] transition-all duration-700"></div>
            </Link>
          ) : null}
        </div>
      </div>
    </div>

    {/*  */}
    {/* Menu Card */}
    {/*  */}
    <div className="mt-10">
      <MenuCard allMenuPage={allMenuPage} />
    </div>

    {/*  */}
    {/* Discount Section */}
    {/*  */}
    <div className="p-10"></div>

    {!allMenuPage && (
      <>
        <div className="hidden md:flex h-[40rem] w-full p-4 justify-center items-center hover:shadow-lg rounded-3xl group hover:scale-101 transition-all duration-300">
          <div className="flex w-1/2 h-full items-center justify-center p-5 overflow-hidden rounded-3xl  group-hover:scale-102 transition-all duration-400">
            <img
              src={Pizza}
              alt=""
              className="w-full h-full object-cover rounded-4xl"
            />
          </div>
          <div className="flex w-1/2 h-full items-center justify-center p-5 ">
            <div className="flex flex-col gap-4 justify-center items-center w-full h-full rounded-2xl group-hover:scale-102 transition-all duration-500">
              <img
                src={Burgur}
                alt=""
                className="object-cover w-full h-1/2 rounded-4xl"
              />
              <img
                src={Burgur}
                alt=""
                className="object-cover w-full h-1/2 rounded-4xl"
              />
            </div>
          </div>
        </div>
        <div className="p-10"></div>
        <div className="p-10"></div>
        <div className="p-10"></div>
      </>
    )}
  </section>
);

export default Menu;
