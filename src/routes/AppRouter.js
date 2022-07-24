import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import HomePage from "../pages/HomePage";
import TestPage from "../testing/TestPage";
import SignIn from "../pages/SignIn";
import InstituteForm from "../pages/forms/InstituteForm";
import UniversityForm from "../pages/forms/UniversityForm";
// import Institutes from "../pages/Institutes";

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/newUniversity" element={<UniversityForm />} />
        <Route path="/newInstitute" element={<InstituteForm />} />
        {/* <Route path="/Institute" element={<Institutes />} /> */}
      </Routes>
    </Router>
  );
}

export default AppRouter;
