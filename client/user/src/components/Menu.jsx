import React from "react";
import MenuCard from "./MenuCard";

const MENU_CONTENT = [
  {
    description:
      "Thees Are Our Regular Menus. You Can Order Anything You Like. ",
  },
];

const Menu = () => {
  return (
    <section className="Menu flex flex-col h-screen container" id="menu">
      <div className="Service__Header flex flex-col justify-between">
        <div className="Service_Title cal-sans-bold text-6xl">
          Our {""}
          <span className="text-bold-red">Regular</span>
          Menu
        </div>
        <div className="Service_Description cal-sans-regular text-xl flex justify-between w-full">
          <div className="max-w-[36ch]">{MENU_CONTENT[0]?.description}</div>
          <div>
            <button className=" flex items-center px-5 py-2 text-sm text-light bg-bold-red hover:bg-bold-red-hover rounded-[50px] cal-sans-regular">
              See All
            </button>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <MenuCard />
      </div>
    </section>
  );
};

export default Menu;
