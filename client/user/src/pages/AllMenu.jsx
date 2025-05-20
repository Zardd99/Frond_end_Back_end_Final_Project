import Menu from "../components/ui/Menu";

const AllMenu = () => {
  return (
    <section className="flex h-screen justify-center items-center mt-20">
      <Menu allMenuPage={true} />
    </section>
  );
};

export default AllMenu;
