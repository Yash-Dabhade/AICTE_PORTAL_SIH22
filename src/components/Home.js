import React, { useState } from "react";
import "../styles/Dashboard.css";
import {
  BsFillBarChartLineFill,
  BsBookFill,
  BsFillDiagram3Fill,
  BsGearFill,
  BsFillFileEarmarkArrowDownFill,
} from "react-icons/bs";
import { useAuth } from "../contexts/AuthContext";
import { FaUserAlt } from "react-icons/fa";
import University from "../pages/CurriculumPortal/University";
import Trending from "../pages/TrendingPortal/Trending";
import ExpertHome from "../pages/ExpertPortal/ExpertHome";
import Settings from "../pages/Settings/Settings";
import Sidebar from "./Sidebar";
import UniversityRoutes from "../routes/UniversityRoutes";
import Institutes from "../pages/CurriculumPortal/Institutes";
import { Route, Routes, useOutletContext, Link } from "react-router-dom";

function Home() {
  const { logout, currentUser } = useAuth();
  const [isNavOpen, setIsNavOpen] = useState(true);
  const [universityOpen, setUniversityOpen] = useState(true);
  const [trendingOpen, setTrendingOpen] = useState(false);
  const [CurriculumOpen, setCurriculumOpen] = useState(false);
  const [reportsOpen, setReportsOpen] = useState(false);
  const [settingOpen, setSettingOpen] = useState(false);
  const [admin, setAdmin] = useState(false);

  let outletData = useOutletContext();

  function modeSwitch() {
    document.documentElement.classList.toggle("dark");
  }

  function removeActive() {
    let actives = document.querySelectorAll(".active");
    actives.forEach((a) => {
      a.classList.remove("active");
    });
  }

  function makeActive(e) {
    removeActive();
    let ele = e.target.closest("a");
    ele.classList.add("active");
  }

  function toggleLogout() {
    if (!currentUser) return;
    document.querySelector(".logout").classList.toggle("hide");
  }

  function capitalizeFirstLetter(str) {
    // converting first letter to uppercase
    const capitalized = str.charAt(0).toUpperCase() + str.slice(1);

    return capitalized;
  }

  function getUniversityOpen(e) {
    setUniversityOpen(e);
  }
  function getTrendingOpen(e) {
    setTrendingOpen(e);
  }
  function getCurricumOpen(e) {
    setCurriculumOpen(e);
  }
  function getReportsOpen(e) {
    setReportsOpen(e);
  }
  function getSettingOpen(e) {
    setSettingOpen(e);
  }

  const links = [
    "University",
    "Trending",
    "Dashboard",
    "Past Reports",
    "Settings",
  ];
  const icons = [
    <BsBookFill size={22} className="mx-2" />,
    <BsFillDiagram3Fill size={22} className="mx-2" />,
    <BsFillBarChartLineFill size={22} className="mx-2" />,
    <BsFillFileEarmarkArrowDownFill size={22} className="mx-2" />,
    <BsGearFill size={22} className="mx-2" />,
  ];
  const linkFunc = [
    getUniversityOpen,
    getTrendingOpen,
    getCurricumOpen,
    getReportsOpen,
    getSettingOpen,
  ];

  return (
    <div className="app-container">
      <div className="app-header">
        <div className="app-header-left">
          <button
            className="app-icon-container"
            onClick={() => setIsNavOpen((prev) => !prev)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="40"
              width="40"
              className="darkMode"
            >
              <path d="M6.375 30q-.583 0-.979-.396T5 28.625q0-.625.396-1.021.396-.396.979-.396h27.25q.583 0 .979.417t.396 1q0 .583-.396.979t-.979.396Zm0-8.625q-.583 0-.979-.396T5 20q0-.583.396-.979t.979-.396h27.25q.583 0 .979.396T35 20q0 .583-.396.979t-.979.396Zm0-8.583q-.583 0-.979-.417t-.396-1q0-.583.396-.979T6.375 10h27.25q.583 0 .979.396t.396.979q0 .625-.396 1.021-.396.396-.979.396Z" />
            </svg>
          </button>

          <Link to="/" className="app-name">
            AICTE
          </Link>
          <div className="search-wrapper">
            <input className="search-input" type="text" placeholder="Search" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="feather feather-search"
              viewBox="0 0 24 24"
            >
              <defs></defs>
              <circle cx="11" cy="11" r="8"></circle>
              <path d="M21 21l-4.35-4.35"></path>
            </svg>
          </div>
        </div>
        <div className="app-header-right">
          <button
            className="mode-switch"
            title="Switch Theme"
            onClick={modeSwitch}
          >
            <svg
              className="moon"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <defs></defs>
              <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path>
            </svg>
          </button>
          <div className="profile">
            <button className="profile-btn" onClick={toggleLogout}>
              <FaUserAlt className="darkMode" size={"23px"} />
              <span>
                {currentUser &&
                  (currentUser.displayName
                    ? capitalizeFirstLetter(
                        String(currentUser.displayName).toLowerCase()
                      )
                    : capitalizeFirstLetter(
                        String(currentUser.email).toLowerCase()
                      ).split("@")[0])}
              </span>
            </button>
            {currentUser && (
              <button
                className="logout py-2 px-4 w-full btn-compatible rounded-lg hide"
                onClick={async (e) => {
                  e.preventDefault();
                  await logout().then(() => {
                    window.location.href = "/signin";
                  });
                }}
              >
                Log out
              </button>
            )}
          </div>
        </div>
      </div>
      {currentUser && currentUser.email == "admin@gmail.com" ? (
        <div className="app-content">
          <Sidebar
            links={links}
            icons={icons}
            linkFunc={linkFunc}
            isNavOpen={isNavOpen}
          />
          <Routes>
            <Route path="/" element={<University />} />
            <Route path="/University/*" element={<UniversityRoutes />}>
              {/* <Route path="institute" element={<Institutes />} /> */}
            </Route>
            <Route path="/Trending" element={<Trending />} />
            <Route path="/Settings" element={<Settings />} />
          </Routes>
        </div>
      ) : (
        currentUser && <ExpertHome isNavOpen={isNavOpen} />
      )}
    </div>
  );
}

export default Home;
