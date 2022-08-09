import React from "react";
import Home from "../components/Home";
import { useAuth } from "../contexts/AuthContext";
import SignIn from "./Authentication/SignIn";
import { Routes, Route } from "react-router-dom";
function HomePage() {
  const currentUser = useAuth();
  return (
    <>
      {currentUser && currentUser.currentUser ? (
        <Routes>
          <Route path="*" element={<Home user={currentUser.email} />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      ) : (
        <SignIn />
      )}
    </>
  );
}

export default HomePage;
