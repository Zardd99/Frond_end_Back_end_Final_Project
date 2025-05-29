import "../styles/index.css";
import Hero from "../components/ui/Hero";
import Offer from "../components/ui/Offer";
import Service from "../components/ui/Service";
import Menu from "../components/ui/Menu";
import Footer from "../components/ui/Footer";

const Home = () => {
  return (
    <main className="App mx-auto min-h-screen">
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
    </main>
  );
};

export default Home;
