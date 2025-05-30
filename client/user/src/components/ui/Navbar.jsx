import { Link, useLocation } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
import { useEffect, useState, useRef } from "react";
import { supabase } from "../../../../../server/middleware/supabaseClient";

const links = [
  { name: "Home", href: "#home" },
  { name: "Offer", href: "#offer" },
  { name: "Service", href: "#service" },
  { name: "Menu", href: "#menu" },
  { name: "About US", href: "#about" },
];

import ProfileImg from "../../assets/profile_picture.jpg";
import Navbar_tablet from "../form/Navbar_tablet";
import ProfileInformation from "../form/ProfileInformation";

const Navbar = () => {
  const location = useLocation();
  const { session } = UserAuth();
  const isAuthPage = ["/login", "/signup"].includes(location.pathname);

  //
  // State
  //
  //
  const [isEmailVisible, setIsEmailVisible] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);
  const [error, setError] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isNavbarHidden, setIsNavbarHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  //
  // Ref
  //
  //
  const profileButtonRef = useRef(null);
  const emailPopupRef = useRef(null);
  const navbarPopupRef = useRef(null);
  const navbarButtonRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (session) {
          let { data: profiles } = await supabase
            .from("profiles")
            .select("role")
            .eq("user_id", session.user.id)
            .single();

          setIsAdmin(profiles?.role === "Admin");
        }
      } catch (error) {
        setError("Error", error);
      }
    };
    fetchData();
  }, [session]);

  //
  // Handle scroll-based inspired by store.supercell.com
  //
  //
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 10) {
        setIsNavbarHidden(false);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsNavbarHidden(true);
      } else if (currentScrollY < lastScrollY) {
        setIsNavbarHidden(false);
      }

      setLastScrollY(currentScrollY);
    };

    let timeoutId = null;
    const throttledHandleScroll = () => {
      if (timeoutId === null) {
        timeoutId = setTimeout(() => {
          handleScroll();
          timeoutId = null;
        }, 10);
      }
    };

    window.addEventListener("scroll", throttledHandleScroll);

    return () => {
      window.removeEventListener("scroll", throttledHandleScroll);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [lastScrollY]);

  //
  // handle scroll behavior for navigation links
  //
  //
  const handleScrollToSection = (id) => (e) => {
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

  //
  // Handle Auto Close THe profile's information's form
  //
  //
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileButtonRef.current &&
        emailPopupRef.current &&
        !profileButtonRef.current.contains(event.target) &&
        !emailPopupRef.current.contains(event.target)
      ) {
        setIsEmailVisible(false);
      }
    };

    if (isEmailVisible) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isEmailVisible]);

  //
  // Auto close navbar for md screen when click outside the form
  //
  //
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        navbarButtonRef.current &&
        !navbarButtonRef.current.contains(event.target) &&
        navbarPopupRef.current &&
        !navbarPopupRef.current.contains(event.target)
      ) {
        setIsNavbarVisible(false);
      }
    };

    if (isNavbarVisible) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isNavbarVisible]);

  //
  // handle profile view
  //
  //
  const handleProfileView = (e) => {
    e.preventDefault();
    setIsEmailVisible(!isEmailVisible);
  };

  //
  // Handle Navbar < 768px or tablet-screen
  //
  //
  const handleNavbar = (e) => {
    e.preventDefault();
    setIsNavbarVisible(!isNavbarVisible);
  };

  return (
    <header
      className={`Navbar fixed top-0 left-[50%] z-50 bg-hero-white/80 backdrop-blur-xl border border-hero-gray-100/20 rounded-3xl w-[95%] max-w-7xl shadow-2xl shadow-black/5 transition-all duration-500 ease-out ${
        isNavbarHidden
          ? "-translate-y-full opacity-0"
          : "translate-y-0 opacity-100"
      } mt-4`}
      style={{
        transform: `translateX(-50%) ${
          isNavbarHidden ? "translateY(-150%)" : "translateY(0)"
        }`,
      }}
    >
      {error && (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-gradient-to-r from-hero-red-50 to-hero-pink-50 text-hero-red-700 px-6 py-3 rounded-2xl shadow-lg border border-hero-red-100 backdrop-blur-sm">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-hero-red-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">{error}</span>
          </div>
        </div>
      )}

      <div className="container flex justify-between items-center px-8 py-4 mx-auto">
        <Link
          to="/"
          className="cal-sans-bold text-2xl bg-gradient-to-r from-offer-purple-600 via-offer-cool-600 to-offer-emerald-600 bg-clip-text text-transparent hover:from-offer-purple-700 hover:via-offer-cool-700 hover:to-offer-emerald-700 transition-all duration-300 transform hover:scale-105"
        >
          Welcome
        </Link>

        {!isAuthPage && (
          <div className="flex justify-end md:justify-center w-full">
            <nav
              className={`Navbar_link cal-sans-regular hidden md:flex items-center space-x-1 bg-hero-gray-50/60 backdrop-blur-sm rounded-2xl px-3 py-2 border border-hero-gray-200/30`}
              id="navbar_link"
            >
              {links.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={handleScrollToSection(link.href.substring(1))}
                  className="relative px-4 py-2 text-sm font-medium text-hero-gray-700 rounded-xl hover:text-hero-white hover:bg-gradient-to-r hover:from-offer-purple-500 hover:to-offer-cool-500 transition-all duration-300 ease-out transform hover:scale-105 hover:shadow-lg group"
                >
                  <span className="relative z-10">{link.name}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-offer-purple-400/20 to-offer-cool-400/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                </a>
              ))}
            </nav>

            <button
              className="flex md:hidden items-center justify-center w-12 h-12 bg-gradient-to-br from-hero-gray-50 to-hero-gray-100 hover:from-offer-purple-50 hover:to-offer-cool-50 rounded-2xl shadow-lg border border-hero-gray-200/50 transition-all duration-300 ease-out transform hover:scale-110 hover:shadow-xl active:scale-95"
              onClick={handleNavbar}
              ref={navbarButtonRef}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-5 h-5 text-hero-gray-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 9h16.5m-16.5 6.75h16.5"
                />
              </svg>
            </button>
          </div>
        )}

        {/*  */}
        {/* tablet-screen navbar */}
        {/*  */}
        <div
          className={`absolute top-20 right-8 w-80 transition-all duration-300 ease-out ${
            isNavbarVisible
              ? "flex opacity-100 translate-y-0"
              : "hidden opacity-0 -translate-y-4"
          }`}
        >
          <Navbar_tablet
            ref={navbarPopupRef}
            isNavbarVisible={isNavbarVisible}
            links={links}
          />
        </div>

        <div className="Navbar_login cal-sans-regular flex items-center space-x-3">
          {session ? (
            <div className="relative flex items-center">
              <button
                className="group relative w-12 h-12 overflow-hidden rounded-2xl bg-gradient-to-br from-offer-purple-100 to-offer-cool-100 border-2 border-transparent hover:border-offer-purple-200 transition-all duration-300 ease-out transform hover:scale-110 hover:shadow-xl active:scale-95"
                id="email_profile"
                ref={profileButtonRef}
                onClick={handleProfileView}
              >
                <img
                  src={ProfileImg}
                  alt="profile_img.jpg"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-offer-purple-400/20 to-offer-cool-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-offer-fresh-400 border-2 border-light rounded-full shadow-sm"></div>
              </button>

              {/* */}
              {/* Profile Information's form */}
              {/*  */}

              <ProfileInformation
                ref={emailPopupRef}
                isAdmin={isAdmin}
                isEmailVisible={isEmailVisible}
              />
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <Link
                to="/login"
                className="px-6 py-2 text-sm font-medium text-hero-gray-700 hover:text-offer-purple-600 transition-colors duration-300 relative group"
              >
                <span className="relative z-10">Login</span>
                <div className="absolute inset-0 bg-gradient-to-r from-offer-purple-50 to-offer-cool-50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-110"></div>
              </Link>
              <Link
                to="/signup"
                className="px-6 py-2 text-sm font-medium text-light bg-gradient-to-r from-offer-purple-500 to-offer-cool-500 hover:from-offer-purple-600 hover:to-offer-cool-600 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ease-out transform hover:scale-105 active:scale-95 border border-offer-purple-400/30"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
