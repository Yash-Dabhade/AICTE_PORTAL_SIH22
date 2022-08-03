import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import HomePage from "../pages/HomePage";
import TestPage from "../testing/TestPage";
import SignIn from "../pages/Authentication/SignIn";
import InstituteForm from "../pages/forms/InstituteForm";
import UniversityForm from "../pages/forms/UniversityForm";
import InstituteCourses from "../pages/forms/InstituteCourses";
import NewDepartment from "../pages/forms/NewDepartment";
import NewCurriculum from "../pages/forms/NewCurriculum";
import ForgetPassword from "../pages/Authentication/ForgetPassword";
import Register from "../pages/Authentication/Register";
// import Institutes from "../pages/Institutes";

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/newUniversity" element={<UniversityForm />} />
        <Route path="/newInstitute" element={<InstituteForm />} />
        <Route path="/newInstituteCourses" element={<InstituteCourses />} />
        <Route path="/newDepartment" element={<NewDepartment />} />
        <Route path="/newCurriculum" element={<NewCurriculum />} />
        {/* <Route path="/Institute" element={<Institutes />} /> */}
      </Routes>
    </Router>
  );
}

export default AppRouter;
