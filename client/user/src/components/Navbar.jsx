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
  const [error, setError] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const profileButtonRef = useRef(null);
  const emailPopupRef = useRef(null);

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
  // Handle Auto Close THe form
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

  return (
    <section className="Navbar fixed top-0 left-[50%] transform -translate-x-[50%] z-999 bg-background rounded-b-4xl w-full shadow-lg">
      <div className="container flex justify-between items-center p-10 h-12 mx-auto">
        <Link to="/" className="cal-sans-bold text-2xl ">
          Welcome
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
                className={`email-popup bg-light w-100 h-auto absolute top-15 right-0 p-4 flex-col transition-all duration-300 ${
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
