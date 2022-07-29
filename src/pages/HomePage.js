import React, { useEffect } from "react";
import Home from "../components/Home";
import { useAuth } from "../contexts/AuthContext";

function HomePage() {
  const { currentUser } = useAuth();

  return <Home />;
}

export default HomePage;
