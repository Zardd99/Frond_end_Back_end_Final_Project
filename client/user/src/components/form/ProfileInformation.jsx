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
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      ref={ref}
      className={`email-popup bg-dark text-light w-100 h-auto absolute top-15 right-0 p-4 flex-col transition-all duration-300 ${
        isEmailVisible
          ? "opacity-100 translate-y-0 visible scale-100"
          : "opacity-0 -translate-y-4 invisible scale-95"
      }`}
      id="email"
    >
      <span className="cal-sans-bold text-2xl"> Profile Information</span>
      <br />
      <div className="cal-sans-bold mr-4 p-4 rounded-2xl">
        User Name:
        <span className="cal-sans-italic ml-4 cal-sans-regular text-light ">
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
          <span className="cal-sans-italic ml-4 cal-sans-regular text-light ">
            User
          </span>
        ) : (
          <span className="cal-sans-italic ml-4 cal-sans-regular text-light ">
            Admin
          </span>
        )}
      </div>
      <div
        className={`cal-sans-bold mr-4 p-4 rounded-2xl text-bold-red hover:text-bold-red-hover`}
      >
        <Link to="/dashboard/dashboard">Go to dashboard</Link>
      </div>
      <div className="cal-sans-bold mr-4 p-4 rounded-2xl flex w-full justify-end items-end">
        <button
          onClick={handleLogOut}
          className="px-2 py-1 mx-2 hover:text-bold-red-hover"
        >
          Logout
        </button>
      </div>
    </div>
  );
});

export default ProfileInformation;
