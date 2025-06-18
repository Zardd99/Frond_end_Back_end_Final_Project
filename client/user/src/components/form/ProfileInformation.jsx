import { forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

const ProfileInformation = forwardRef(({ isEmailVisible, isAdmin }, ref) => {
  const navigate = useNavigate();
  const { session, signOut } = UserAuth();

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

  return (
    <div
      ref={ref}
      className={`email-popup bg-gradient-to-br from-hero-gray-50 via-hero-white to-hero-gray-100 text-hero-gray-900 border border-hero-gray-200 shadow-xl w-65 md:w-100 h-auto absolute top-15 right-0 p-4 flex-col transition-all duration-300 rounded-lg ${
        isEmailVisible
          ? "opacity-100 translate-y-0 visible scale-100"
          : "opacity-0 -translate-y-4 invisible scale-95"
      }`}
      id="email"
    >
      <span className="cal-sans-bold text-2xl text-black mb-2 block">
        Profile Information
      </span>
      <br />
      <div className="cal-sans-bold mr-4 p-4 rounded-lg bg-hero-gray-50 border border-hero-gray-200 mb-3">
        <span className="text-hero-gray-700">User Name:</span>
        <span className="cal-sans-italic ml-4 cal-sans-regular text-gray-900">
          {session?.user?.email ? (
            <>
              {session.user.email.slice(0, 2)}
              <span className="mx-1">...</span>
              {session.user.email.split("@")[0].slice(-1)}
            </>
          ) : null}
        </span>
      </div>
      <div className="cal-sans-bold mr-4 p-4 rounded-lg bg-hero-gray-50 border border-hero-gray-200 mb-3">
        <span className="text-hero-gray-700">User Role:</span>
        {!isAdmin ? (
          <span className="cal-sans-italic ml-4 cal-sans-regular text-hero-gray-900">
            User
          </span>
        ) : (
          <span className="cal-sans-italic ml-4 cal-sans-regular text-hero-gray-900">
            Admin
          </span>
        )}
      </div>
      <div className="cal-sans-bold mr-4 p-4 rounded-lg bg-hero-gray-50 border border-hero-gray-200 mb-3 hover:bg-gray-100 transition-colors">
        <Link
          to="/dashboard"
          className="text-black hover:text-hero-gray-600 transition-colors"
        >
          Go to dashboard
        </Link>
      </div>
      <div className="cal-sans-bold mr-4 p-4 rounded-lg flex w-full justify-end items-end">
        <button
          onClick={handleLogOut}
          className="px-4 py-2 mx-2 bg-black text-hero-white hover:bg-hero-gray-800 transition-colors rounded-md border border-black hover:border-hero-gray-800"
        >
          Logout
        </button>
      </div>
    </div>
  );
});

export default ProfileInformation;
