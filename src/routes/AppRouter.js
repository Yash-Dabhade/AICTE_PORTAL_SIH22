import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import HomePage from "../pages/HomePage";
import TestPage from "../testing/TestPage";
import SignIn from "../pages/SignIn";
import UniversityForm from "../pages/forms/UniversityForm";

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/newUniversity" element={<UniversityForm />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
