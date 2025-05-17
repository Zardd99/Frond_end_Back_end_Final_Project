import "../styles/index.css";
import Hero from "../components/Hero";
import Offer from "../components/Offer";
import Service from "../components/Service";
import Menu from "../components/Menu";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="App mx-auto">
      <div className="bg-background rounded-b-4xl h-screen ">
        <div className="flex flex-col container mx-auto ">
          <div className="my-4"></div>

          <div>
            <Hero />
          </div>
        </div>
      </div>
      <div className="flex flex-col container mx-auto items-start">
        <Offer />
        <Service />
        <Menu />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
