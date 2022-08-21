import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import {
  BsFillBarChartLineFill,
  BsBookFill,
  BsFillDiagram3Fill,
  BsFillFileEarmarkArrowDownFill,
} from "react-icons/bs";
import { Routes, Route } from "react-router-dom";
import Assigned from "./Assigned";
function ExpertHome({ isNavOpen }) {
  const links = ["Reports", "Assigned", "Responded", "Feedback"];
  const icons = [
    <BsBookFill size={22} className="mx-2" />,
    <BsFillBarChartLineFill size={22} className="mx-2" />,
    <BsFillDiagram3Fill size={22} className="mx-2" />,
    <BsFillFileEarmarkArrowDownFill size={22} className="mx-2" />,
  ];

  return (
    <div className="app-content Expert">
      <Sidebar links={links} icons={icons} isNavOpen={isNavOpen} />
      <div className="parent-section darkMode">
        <Routes>
          <Route path="/*" element={<Assigned />} />
          <Route path="/Assigned/*" element={<Assigned />} />
          {/* <Route path="/*" element={<ExpertDetails />} /> */}
        </Routes>
      </div>
    </div>
  );
}

export default ExpertHome;
