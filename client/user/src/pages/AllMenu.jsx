import React from "react";

import Menu from "../components/Menu";

const AllMenu = () => {
  return (
    <div className="flex h-screen justify-center items-center mt-20">
      <Menu allMenuPage={true} />
    </div>
  );
};

export default AllMenu;
