import { forwardRef } from "react";
import { Link } from "react-router-dom";

const Navbar_tablet = forwardRef(({ isNavbarVisible, links }, ref) => {
  //
  // handle scroll behavior
  //
  //
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
    <div
      className={`Navbar_link navbar-popup cal-sans-regular text-left text-sm bg-gradient-to-br from-hero-gray-50 via-hero-white to-hero-gray-100 text-hero-gray-900 border border-hero-gray-200 shadow-xl p-4 flex md:hidden flex-col rounded-xl transition-all duration-300 h-full w-6/7 justify-around
                  ${
                    isNavbarVisible
                      ? "opacity-100 translate-y-0 visible scale-100"
                      : "opacity-0 -translate-y-4 invisible scale-95"
                  }
                  `}
      ref={ref}
      id="navbar_link"
    >
      <Link
        to="/"
        className="flex cal-sans-bold text-2xl bg-gradient-to-r from-black via-hero-hero-gray-700 to-black bg-clip-text text-transparent hover:from-hero-gray-800 hover:via-hero-gray-600 hover:to-hero-gray-800 transition-all duration-300 transform hover:scale-105"
      >
        Welcome
      </Link>
      {links.map((link) => (
        <a
          className="group flex items-center justify-between pr-5 hover:bg-hero-gray-50 rounded-lg p-3 transition-colors duration-200"
          key={link.name}
          href={link.href}
          onClick={handleScroll(link.href.substring(1))}
        >
          <span
            key={link.name}
            href={link.href}
            onClick={handleScroll(link.href.substring(1))}
            className="mx-6 rounded-md group-hover:text-black relative inline-block transition-all duration-200 group-hover:after:content-[''] group-hover:after:absolute group-hover:after:left-0 group-hover:after:bottom-0 group-hover:after:h-[2px] group-hover:after:w-1/2 group-hover:after:bg-black group-hover:after:transition-all text-left font-medium"
          >
            {link.name}
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6 group-hover:translate-x-1 group-hover:text-black transition-all duration-200"
          >
            <path
              fillRule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm4.28 10.28a.75.75 0 0 0 0-1.06l-3-3a.75.75 0 1 0-1.06 1.06l1.72 1.72H8.25a.75.75 0 0 0 0 1.5h5.69l-1.72 1.72a.75.75 0 1 0 1.06 1.06l3-3Z"
              clipRule="evenodd"
            />
          </svg>
        </a>
      ))}
    </div>
  );
});

export default Navbar_tablet;
