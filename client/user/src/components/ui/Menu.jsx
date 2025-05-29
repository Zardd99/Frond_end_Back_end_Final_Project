import { Link } from "react-router-dom";
import MenuCard from "./MenuCard";

import Burgur from "../../assets/horizon_banner.jpg";
import Pizza from "../../assets/verticle_banner.jpg";

const MENU_CONTENT = [
  {
    description:
      "Thees Are Our Regular Menus. You Can Order Anything You Like. ",
  },
];

const Menu = ({ allMenuPage }) => (
  <section
    className={`Menu flex flex-col container ${
      allMenuPage ? `h-screen` : `h-auto`
    }`}
    id="menu"
  >
    {/*  */}
    {/* Render "Go Back To Home Page When All MenuPage is Open" else Render "See All on the Button" */}
    {/*  */}
    <div className="Menu__Header flex flex-col justify-between">
      {allMenuPage ? (
        <div className="Service_Title cal-sans-bold text-6xl">
          All Of Our {""}
          <span className="text-bold-red">Regular {""}</span>
          Menu
        </div>
      ) : (
        <div className="Service_Title cal-sans-bold text-6xl">
          Our {""}
          <span className="text-bold-red">Regular {""}</span>
          Menu
        </div>
      )}
      <div className="cal-sans-regular text-xl flex justify-between w-full">
        <div className="max-w-[36ch]">{MENU_CONTENT[0]?.description}</div>
        <div>
          {allMenuPage ? (
            <Link
              to="/"
              className="flex items-center px-5 py-2 text-sm text-light bg-bold-red hover:bg-bold-red-hover rounded-[50px] cal-sans-regular cursor-pointer"
            >
              Go back to home page
            </Link>
          ) : (
            <Link
              to="/allmenu"
              className="flex items-center px-5 py-2 text-sm text-light bg-bold-red hover:bg-bold-red-hover rounded-[50px] cal-sans-regular cursor-pointer"
            >
              See All
            </Link>
          )}
        </div>
      </div>
    </div>

    {/*  */}
    {/* Menu Card */}
    {/*  */}
    <div className="mt-10">
      <MenuCard />
    </div>

    {/*  */}
    {/* Discount Section */}
    {/*  */}
    <div className="p-10"></div>
    <div className="flex h-[40rem] w-full p-4 justify-center items-center hover:shadow-lg rounded-3xl group hover:scale-101 transition-all duration-300">
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
    {!allMenuPage && (
      <>
        <div className="p-10"></div>
        <div className="p-10"></div>
        <div className="p-10"></div>
      </>
    )}
  </section>
);

export default Menu;
