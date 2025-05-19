import "../styles/index.css";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../AuthContext";
import { useEffect, useState, useRef } from "react";
import { supabase } from "../../../../server/middleware/supabaseClient";

const links = [
  { name: "Home", href: "#home" },
  { name: "Offer", href: "#offer" },
  { name: "Service", href: "#service" },
  { name: "Menu", href: "#menu" },
  { name: "About US", href: "#about" },
];

import ProfileImg from "../assets/profile_picture.jpg";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { session, signOut } = UserAuth();
  const isAuthPage = ["/login", "/signup"].includes(location.pathname);

  const [isEmailVisible, setIsEmailVisible] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);
  const [error, setError] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const profileButtonRef = useRef(null);
  const emailPopupRef = useRef(null);
  const navbarButtonRef = useRef(null);
  const navbarPopupRef = useRef(null);

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
      } catch (err) {
        setError("Error", err);
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
  // handle log out
  //
  //
  const handleLogOut = async (e) => {
    e.preventDefault();
    try {
      await signOut();
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  //
  // handle profile view
  //
  //
  const handleProfileView = (e) => {
    e.preventDefault();
    setIsEmailVisible(!isEmailVisible);
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
        navbarPopupRef.current &&
        !navbarButtonRef.current.contains(event.target) &&
        !navbarPopupRef.current.contains(event.target)
      ) {
        setIsNavbarVisible(false);
      }
    };
    isNavbarVisible
      ? document.addEventListener("click", handleClickOutside)
      : null;

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isNavbarVisible]);

  //
  // Handle Navbar < 768px or tablet-screen
  const handleNavbar = (e) => {
    e.preventDefault();
    setIsNavbarVisible(!isNavbarVisible);
  };

  return (
    <section className="Navbar fixed top-0 left-[50%] transform -translate-x-[50%] z-999 bg-background rounded-b-4xl w-full shadow-lg">
      <div className="container flex justify-between items-center p-10 h-12 mx-auto">
        <Link to="/" className="cal-sans-bold text-2xl ">
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
        <div className="absolute top-20 right-20 w-1/2 h-[calc(100dvh/3)]">
          {!isAuthPage && (
            <>
              <div
                className={`Navbar_link navbar-popup cal-sans-regular text-left text-sm bg-dark text-light p-4 flex md:hidden flex-col rounded-xl transition-all duration-300 h-full w-6/7 justify-around
                  ${
                    isNavbarVisible
                      ? "opacity-100 translate-y-0 visible scale-100"
                      : "opacity-0 -translate-y-4 invisible scale-95"
                  }
                  `}
                ref={navbarPopupRef}
                id="navbar_link"
              >
                {links.map((link) => (
                  <a
                    className="flex items-center justify-between pr-5"
                    key={link.name}
                    href={link.href}
                    onClick={handleScroll(link.href.substring(1))}
                  >
                    <span
                      key={link.name}
                      href={link.href}
                      onClick={handleScroll(link.href.substring(1))}
                      className="mx-6 rounded-md hover:text-dark relative inline-block transition-all duration-200 hover:after:content-[''] hover:after:absolute hover:after:left-0 hover:after:bottom-0 hover:after:h-[2px] hover:after:w-1/2 hover:after:bg-bold-red hover:after:transition-all text-left"
                    >
                      {link.name}
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-6"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm4.28 10.28a.75.75 0 0 0 0-1.06l-3-3a.75.75 0 1 0-1.06 1.06l1.72 1.72H8.25a.75.75 0 0 0 0 1.5h5.69l-1.72 1.72a.75.75 0 1 0 1.06 1.06l3-3Z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </a>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="Navbar_login cal-sans-regular flex items-center">
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
                  className="object-fit  "
                />
              </button>
              <div
                ref={emailPopupRef}
                className={`email-popup bg-dark text-light w-100 h-auto absolute top-15 right-0 p-4 flex-col transition-all duration-300 ${
                  isEmailVisible
                    ? "opacity-100 translate-y-0 visible scale-100"
                    : "opacity-0 -translate-y-4 invisible scale-95"
                }`}
                id="email"
              >
                <span className="cal-sans-bold text-2xl">
                  {" "}
                  Profile Information
                </span>
                <br />
                <div className="cal-sans-bold mr-4 p-4 rounded-2xl">
                  User Name:
                  <span className="cal-sans-italic ml-4 cal-sans-regular text-dark ">
                    {session?.user?.email ? (
                      <>
                        {session.user.email.slice(0, 2)}
                        <span className="mx-1">...</span>
                        {session.user.email.split("@")[0].slice(-1)}
                      </>
                    ) : null}
                  </span>
                </div>
                <div className="cal-sans-bold mr-4 p-4 rounded-2xl">
                  User Role:
                  {!isAdmin ? (
                    <span className="cal-sans-italic ml-4 cal-sans-regular text-dark ">
                      User
                    </span>
                  ) : (
                    <span className="cal-sans-italic ml-4 cal-sans-regular text-dark ">
                      Admin
                    </span>
                  )}
                </div>
                <div className="cal-sans-bold mr-4 p-4 rounded-2xl flex w-full justify-end items-end">
                  <button
                    onClick={handleLogOut}
                    className="px-2 py-1 mx-2 hover:text-dark"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <>
              <Link to="/login" className="px-2 py-1 mx-2 hover:text-dark">
                Login
              </Link>
              <Link
                to="/signup"
                className="px-2 py-1 mx-2 hover:text-dark border rounded-2xl"
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
