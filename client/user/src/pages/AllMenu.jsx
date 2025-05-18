import React from "react";

import Menu from "../components/Menu";

const AllMenu = () => {
  return (
    <section className="flex h-screen justify-center items-center mt-20">
      <Menu allMenuPage={true} />
    </section>
  );
};

export default AllMenu;
