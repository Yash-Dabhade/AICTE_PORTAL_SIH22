import React from "react";
import Home from "../components/Home";
import { useAuth } from "../contexts/AuthContext";

function HomePage() {
  const currentUser = useAuth();
  return <Home user={currentUser.email} />;
}

export default HomePage;
