import "../styles/index.css";
import Hero from "../components/ui/Hero";
import Offer from "../components/ui/Offer";
import Service from "../components/ui/Service";
import Menu from "../components/ui/Menu";
import Footer from "../components/ui/Footer";

const Home = () => {
  return (
    <main className="App mx-auto min-h-screen bg-light">
      <div className=" rounded-b-4xl min-h-screen ">
        <div className="flex flex-col mx-auto">
          <Hero />
        </div>
      </div>
      <div className="flex flex-col container mx-auto items-start">
        <Offer />
        <Service />
        <Menu />
      </div>
      <Footer />
    </main>
  );
};

export default Home;
