import { useState, useEffect } from "react";
import { FaInstagram, FaFacebook, FaTwitter, FaGithub } from "react-icons/fa";

const Footer = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollPercentage = scrollPosition / (documentHeight - windowHeight);

      setIsExpanded(scrollPercentage > 0.5);
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      className={`w-full relative overflow-hidden bg-gradient-to-br from-hero-slate-900 via-hero-slate-800 to-black text-light cal-sans-regular transition-all duration-1000 ease-in-out ${
        isExpanded ? "min-h-[100vh] flex items-center" : "min-h-[50%]"
      }`}
      id="about"
    >
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-64 h-64 bg-hero-orange-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-hero-red-500 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-hero-cyan-400 rounded-full blur-3xl"></div>
      </div>

      <div className="absolute inset-0 opacity-5"></div>

      <div
        className={`relative container mx-auto px-6 transition-all duration-1000 ease-in-out ${
          isExpanded ? "py-24 scale-105" : "py-16 scale-100"
        }`}
      >
        <div
          className={`grid grid-cols-1 lg:grid-cols-4 gap-12 mb-16 transition-all duration-1000 ease-in-out  ${
            isExpanded ? "transform translate-y-0 " : "transform translate-y-0"
          }`}
        >
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-4">
              <h2
                className={`font-bold bg-gradient-to-r from-hero-orange-400 via-hero-red-500 to-hero-pink-500 bg-clip-text text-transparent transition-all duration-1000 ease-in-out ${
                  isExpanded ? "text-6xl lg:text-7xl" : "text-5xl"
                }`}
              >
                Fooodish
              </h2>
              <div
                className={`bg-gradient-to-r from-hero-orange-400 to-hero-red-500 rounded-full transition-all duration-1000 ease-in-out ${
                  isExpanded ? "w-32 h-1.5" : "w-24 h-1"
                }`}
              ></div>
              <p
                className={`text-hero-gray-300 leading-relaxed max-w-md transition-all duration-1000 ease-in-out ${
                  isExpanded ? "text-xl lg:text-2xl" : "text-lg"
                }`}
              >
                Crafting culinary stories that unite flavors and memories. Every
                dish tells a tale, every meal creates a moment.
              </p>
            </div>

            <div className="space-y-4">
              <h3
                className={`font-semibold text-light transition-all duration-1000 ease-in-out ${
                  isExpanded ? "text-2xl" : "text-xl"
                }`}
              >
                Join Our Story
              </h3>
              <div className="flex space-x-4">
                {[
                  { Icon: FaInstagram, label: "Visual Stories" },
                  { Icon: FaFacebook, label: "Community" },
                  { Icon: FaTwitter, label: "Live Updates" },
                  { Icon: FaGithub, label: "Open Source" },
                ].map(({ Icon, label }, index) => (
                  <div key={index} className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-hero-orange-400 to-hero-red-500 rounded-lg blur opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                    <div
                      className={`relative bg-hero-slate-800 rounded-lg border border-hero-slate-700 group-hover:border-hero-orange-400 transition-all duration-300 cursor-pointer ${
                        isExpanded ? "p-4" : "p-3"
                      }`}
                    >
                      <Icon
                        className={`text-hero-gray-400 group-hover:text-light transition-all duration-300 ${
                          isExpanded ? "w-8 h-8" : "w-6 h-6"
                        }`}
                      />
                    </div>
                    <span
                      className={`absolute left-1/2 transform -translate-x-1/2 text-xs text-hero-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap ${
                        isExpanded ? "-bottom-10" : "-bottom-8"
                      }`}
                    >
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3
              className={`font-semibold text-light relative transition-all duration-1000 ease-in-out ${
                isExpanded ? "text-2xl" : "text-xl"
              }`}
            >
              Navigate
              <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-hero-orange-400"></div>
            </h3>
            <nav className="space-y-3">
              {[
                { href: "#home", label: "Home" },
                { href: "#offer", label: "Offer" },
                { href: "#service", label: "Services" },
                { href: "#about", label: "About US" },
              ].map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  className={`block text-hero-gray-400 hover:text-light hover:translate-x-2 transition-all duration-300 group ${
                    isExpanded ? "text-lg" : "text-base"
                  }`}
                >
                  <span className="border-b border-transparent group-hover:border-hero-orange-400 transition-colors duration-300">
                    {label}
                  </span>
                </a>
              ))}
            </nav>
          </div>

          <div className="space-y-6">
            <h3
              className={`font-semibold text-light relative transition-all duration-1000 ease-in-out ${
                isExpanded ? "text-2xl" : "text-xl"
              }`}
            >
              Connect
              <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-hero-red-400"></div>
            </h3>
            <div className="space-y-4">
              <div className="group">
                <p
                  className={`text-hero-gray-500 uppercase tracking-wider transition-all duration-1000 ease-in-out ${
                    isExpanded ? "text-base" : "text-sm"
                  }`}
                >
                  Call
                </p>
                <p
                  className={`text-hero-gray-300 group-hover:text-light transition-all duration-300 ${
                    isExpanded ? "text-lg" : "text-base"
                  }`}
                >
                  +855 71 416 6656
                </p>
              </div>
              <div className="group">
                <p
                  className={`text-hero-gray-500 uppercase tracking-wider transition-all duration-1000 ease-in-out ${
                    isExpanded ? "text-base" : "text-sm"
                  }`}
                >
                  Email
                </p>
                <p
                  className={`text-hero-gray-300 group-hover:text-light transition-all duration-300 ${
                    isExpanded ? "text-lg" : "text-base"
                  }`}
                >
                  chinsakda.0.1.1.1@gmail.com
                </p>
              </div>
              <div className="group">
                <p
                  className={`text-hero-gray-500 uppercase tracking-wider transition-all duration-1000 ease-in-out ${
                    isExpanded ? "text-base" : "text-sm"
                  }`}
                >
                  Location
                </p>
                <p
                  className={`text-hero-gray-300 group-hover:text-light transition-all duration-300 ${
                    isExpanded ? "text-lg" : "text-base"
                  }`}
                >
                  Phnom Penh, Cambodia
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-hero-slate-700"></div>
          </div>
          <div className="relative flex justify-center">
            <div className="bg-hero-slate-900 px-4">
              <div
                className={`bg-gradient-to-r from-hero-orange-400 to-hero-red-500 rounded-full transition-all duration-1000 ease-in-out ${
                  isExpanded ? "w-3 h-3" : "w-2 h-2"
                }`}
              ></div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <p
              className={`text-hero-gray-500 transition-all duration-1000 ease-in-out ${
                isExpanded ? "text-base" : "text-sm"
              }`}
            >
              © {new Date().getFullYear()} Fooodish. Every story has flavor.
            </p>
          </div>

          <div
            className={`flex items-center space-x-6 text-hero-gray-500 transition-all duration-1000 ease-in-out ${
              isExpanded ? "text-base" : "text-sm"
            }`}
          >
            <a href="#privacy" className="hover:text-light transition-colors">
              Privacy
            </a>
            <a href="#terms" className="hover:text-light transition-colors">
              Terms
            </a>
            <a href="#cookies" className="hover:text-light transition-colors">
              Cookies
            </a>
          </div>
        </div>

        <div
          className={`absolute top-8 right-8 opacity-20 transition-all duration-1000 ease-in-out ${
            isExpanded ? "scale-150" : "scale-100"
          }`}
        >
          <div className="w-4 h-4 bg-hero-orange-400 rounded-full animate-pulse"></div>
        </div>
        <div
          className={`absolute bottom-8 left-8 opacity-20 transition-all duration-1000 ease-in-out ${
            isExpanded ? "scale-150" : "scale-100"
          }`}
        >
          <div
            className="w-3 h-3 bg-hero-red-400 rounded-full animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>
      </div>

      {isExpanded && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-hero-orange-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-hero-orange-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Footer;
