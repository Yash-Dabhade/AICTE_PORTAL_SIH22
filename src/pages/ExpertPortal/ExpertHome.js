import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import {
  BsFillBarChartLineFill,
  BsBookFill,
  BsFillDiagram3Fill,
  BsGearFill,
  BsFillFileEarmarkArrowDownFill,
} from "react-icons/bs";
import ExpertDetails from "./ExpertDetails";
import { Routes, Route } from "react-router-dom";

function ExpertHome({ isNavOpen }) {
  // const [isNavOpen, setIsNavOpen] = useState(true);

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
      <Routes>
        <Route path="/*" element={<ExpertDetails />} />
        {/* <Route path="/*" element={<UniversityRoutes />} /> */}
        {/* <Route path="/University/*" element={<UniversityRoutes />} />
        <Route path="/Trending" element={<Trending />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Past%20Reports" element={<PastReports />} />
        <Route path="/Settings" element={<Settings />} /> */}
      </Routes>
    </div>
  );
}

export default ExpertHome;
