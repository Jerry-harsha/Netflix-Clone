import React from "react";
import { Link, useNavigate } from "react-router";
import { userAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logOut } = userAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="absolute z-30 flex w-full items-center justify-between p-4">
      <Link to="/">
        <h1 className="font-nsans-bold cursor-pointer text-5xl text-red-600">
          NETFLIX
        </h1>
      </Link>

      {user?.email ? (
        <div>
          <Link to="/profile">
            <button className="cursor-pointer pr-4">Profile</button>
          </Link>

          <button
            onClick={handleLogout}
            className="cursor-pointer rounded bg-red-600 px-6 py-2"
          >
            Logout
          </button>
        </div>
      ) : (
        <div>
          <Link to="/login">
            <button className="cursor-pointer pr-4">Login</button>
          </Link>
          <Link to="/signup">
            <button className="cursor-pointer rounded bg-red-600 px-6 py-2">
              Sign Up
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
