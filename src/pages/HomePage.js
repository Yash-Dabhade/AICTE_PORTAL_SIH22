import React from "react";
import Home from "../components/Home";
import { useAuth } from "../contexts/AuthContext";
import SignIn from "./Authentication/SignIn";
import Register from "./Register";
import ForgetPassword from "./Authentication/ForgetPassword";
import { Routes, Route } from "react-router-dom";
function HomePage() {
  const currentUser = useAuth();
  return (
    <>
      {currentUser && currentUser.currentUser ? (
        <Routes>
          <Route path="*" element={<Home user={currentUser.email} />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/forgetpassword" element={<ForgetPassword />} />
        </Routes>
      ) : (
        <div className="flex mt-10 items-center justify-evenly ">
          <Routes>
            <Route
              path="*"
              element={
                <>
                  <SignIn />
                  <div className="h-4/5 mt-10 absolute border-l-2 border-black" />
                  <Register />
                </>
              }
            />
            <Route path="/forgetpassword" element={<ForgetPassword />} />
          </Routes>
        </div>
      )}
    </>
  );
}

export default HomePage;
