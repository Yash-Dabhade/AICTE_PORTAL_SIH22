import React, { useEffect } from "react";
import Dashboard from "../components/Dashboard";
import { useAuth } from "../contexts/AuthContext";

function HomePage() {
  const { currentUser } = useAuth();

  return <Dashboard />;
}

export default HomePage;
