import "../styles/index.css";
import { Link, useLocation } from "react-router-dom";

const links = [
  { name: "Home", href: "#home" },
  { name: "Offer", href: "#offer" },
  { name: "Service", href: "#service" },
  { name: "Menu", href: "#menu" },
  { name: "About US", href: "#about" },
];

const Navbar = () => {
  const location = useLocation();
  const isAuthPage = ["/login", "/signup"].includes(location.pathname);

  const handleScroll = (id) => (e) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const navbarHeight = document.querySelector(".Navbar").offsetHeight;
      const offset = element.offsetTop - navbarHeight;
      window.scrollTo({
        top: offset,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="Navbar fixed top-0 left-[50%] transform -translate-x-[50%] z-999 bg-background rounded-b-4xl w-full shadow-lg">
      <div className="container flex justify-between items-center p-10 h-12 mx-auto">
        <Link to="/" className="cal-sans-bold text-2xl ">
          {" "}
          Foodle{" "}
        </Link>

        {!isAuthPage && (
          <div className="Navbar_link cal-sans-regular px-2 py-1 mx-2 text-left">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={handleScroll(link.href.substring(1))}
                className="mx-6 rounded-md hover:text-dark relative inline-block transition-all duration-200 hover:after:content-[''] hover:after:absolute hover:after:left-0 hover:after:bottom-0 hover:after:h-[2px] hover:after:w-1/2 hover:after:bg-bold-red hover:after:transition-all text-left"
              >
                {link.name}
              </a>
            ))}
          </div>
        )}

        <div className="Navbar_login cal-sans-regular flex items-center">
          <Link to="/login" className="px-2 py-1 mx-2 hover:text-dark">
            Login
          </Link>
          <Link
            to="/signup"
            className="px-2 py-1 mx-2 hover:text-dark border rounded-2xl"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Navbar;
