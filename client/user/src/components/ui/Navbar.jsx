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
    <section className="Navbar fixed top-0 left-[50%] transform -translate-x-[50%] z-999 bg-background rounded-b-4xl w-full shadow-lg">
      {error && (
        <div className="error-message bg-red-100 text-red-700 p-3 rounded-lg mt-4 mx-auto max-w-md text-center">
          {error}
        </div>
      )}

      <div className="container flex justify-between items-center p-10 h-12 mx-auto">
        <Link to="/dashboard" className="cal-sans-bold text-2xl ">
          Welcome
        </Link>

        {!isAuthPage && (
          <div className="flex justify-end md:justify-center w-full">
            <div
              className={`Navbar_link cal-sans-regular px-2 py-1 mx-2 text-left text-sm hidden md:flex md:text-md`}
              id="navbar_link"
            >
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6 flex md:hidden"
              onClick={handleNavbar}
              ref={navbarButtonRef}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 9h16.5m-16.5 6.75h16.5"
              />
            </svg>
          </div>
        )}

        {/*  */}
        {/* tablet-screen navbar */}
        {/*  */}
        <div
          className={`absolute top-20 right-20 w-1/2 h-[calc(100dvh/3)]
          ${isNavbarVisible ? "flex" : "hidden"}
          `}
        >
          <Navbar_tablet
            ref={navbarPopupRef}
            isNavbarVisible={isNavbarVisible}
            links={links}
          />
        </div>

        <div className="Navbar_login cal-sans-regular flex items-center justify-between">
          {session ? (
            <div className="relative flex items-center justify-between">
              <div className="p-4"></div>
              <button
                className=" w-10 h-10 overflow-hidden border rounded-full hover:border-background"
                id="email_profile"
                ref={profileButtonRef}
                onClick={handleProfileView}
              >
                <img
                  src={ProfileImg}
                  alt="profile_img.jpg"
                  className="object-fit cursor-pointer"
                />
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
            <>
              <Link to="/login" className="px-2 py-1 hover:text-bold-red-hover">
                Login
              </Link>
              <Link
                to="/signup"
                className="px-2 py-1 w-20 hover:text-bold-red-hover border rounded-2xl"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Navbar;
