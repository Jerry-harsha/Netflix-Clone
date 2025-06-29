import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { userAuth } from "../context/AuthContext";

const Signup = () => {
  const [rememberLogin, setRememberLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { user, signUp } = userAuth();
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      await signUp(email, password);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="h-screen w-full">
      <img
        className="absolute hidden h-full w-full object-cover sm:block"
        src="https://assets.nflxext.com/ffe/siteui/vlv3/8200f588-2e93-4c95-8eab-ebba17821657/web/IN-en-20250616-TRIFECTA-perspective_9cbc87b2-d9bb-4fa8-9f8f-a4fe8fc72545_medium.jpg"
        alt="netflix bg"
      />
      <div className="fixed top-0 left-0 h-screen w-full bg-black/70" />
      <div className="fixed z-20 w-full px-4 py-24">
        <div className="mx-auto h-[600px] max-w-[450px] rounded-lg bg-black/80">
          <div className="mx-auto max-w-[320px] py-16">
            <h1 className="font-nsans-bold text-3xl">Sign Up</h1>
            <form
              onSubmit={handleFormSubmit}
              className="flex w-full flex-col py-4"
            >
              <input
                type="email"
                placeholder="Enter your email"
                autoComplete="email"
                className="my-2 rounded bg-gray-700 p-3"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Enter your password"
                autoComplete="current-password"
                className="my-2 rounded bg-gray-700 p-3"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                tye="submit"
                className="font-nsans-bold my-6 cursor-pointer rounded bg-red-600 py-3"
              >
                Sign Up
              </button>
              <div className="flex items-center justify-between text-gray-600">
                <p>
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={rememberLogin}
                    onChange={() => setRememberLogin(!rememberLogin)}
                  />
                  Remember me
                </p>
                <p>Need Help?</p>
              </div>
              <p className="my-4">
                <span className="mr-2 text-gray-600">
                  Already subscribed to Netflix?
                </span>
                <Link to="/login">Sign In</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
