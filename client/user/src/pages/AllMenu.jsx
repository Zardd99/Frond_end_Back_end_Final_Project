import Menu from "../components/ui/Menu";
import { useEffect } from "react";

const AllMenu = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="flex h-screen justify-center items-center mt-20">
      <Menu allMenuPage={true} />
    </section>
  );
};

export default AllMenu;
