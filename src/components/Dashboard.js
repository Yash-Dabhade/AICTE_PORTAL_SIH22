import React, { useState } from "react";
import "../styles/Dashboard.css";
import University from "./University";
import Institutes from "./Institute";
import {
  BsFillBarChartLineFill,
  BsFillHouseFill,
  BsBookFill,
  BsFillDiagram3Fill,
  BsGearFill,
  BsFillFileEarmarkArrowDownFill,
} from "react-icons/bs";
import { useAuth } from "../contexts/AuthContext";

function Dashboard() {
  const { logout, currentUser } = useAuth();

  const [universityOpen, setUniversityOpen] = useState(true);
  const [instituteOpen, setInstituteOpen] = useState(false);
  const [settingOpen, setSettingOpen] = useState(false);

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

  return (
    <div className="app-container">
      <div className="app-header">
        <div className="app-header-left">
          <span className="app-icon"></span>
          <a href="/" className="app-name">
            AICTE
          </a>
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
          <button className="add-btn" title="Add New Project">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-plus"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </button>
          <button className="notification-btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-bell"
            >
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
          </button>
          <div className="profile">
            <button className="profile-btn" onClick={toggleLogout}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/1077/1077063.png"
                alt="profilePic"
              />
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
                className="logout py-2 px-4 w-full text-white bg-blue-700 rounded-lg hide"
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
      <div className="app-content">
        <div className="app-sidebar">
          <a
            href="#university"
            className="app-sidebar-link active"
            onClick={(e) => {
              makeActive(e);
              setUniversityOpen(true);
              setInstituteOpen(false);
              setSettingOpen(false);
            }}
          >
            <div className="flex justify-start items-center">
              <BsBookFill size={22} className="mx-2" /> Curriculum
            </div>
          </a>
          <a
            href="#curriculum"
            className="app-sidebar-link"
            onClick={(e) => {
              makeActive(e);
              setUniversityOpen(false);
              setInstituteOpen(true);
              setSettingOpen(false);
            }}
          >
            <div className="flex justify-start items-center">
              <BsFillBarChartLineFill size={22} className="mx-2" />
              Dashboard
            </div>
          </a>
          <a
            href="#curriculumDev"
            className="app-sidebar-link flex "
            onClick={(e) => {
              makeActive(e);
              setUniversityOpen(false);
              setInstituteOpen(false);
              setSettingOpen(true);
            }}
          >
            <div className="flex justify-start items-center">
              <BsFillDiagram3Fill size={22} className="mx-2" />
              Trending
            </div>
          </a>
          <a
            href="#pastReports"
            className="app-sidebar-link"
            onClick={(e) => {
              makeActive(e);
            }}
          >
            <div className="flex justify-start items-center">
              <BsFillFileEarmarkArrowDownFill size={22} className="mx-2" />
              Past Reports
            </div>
          </a>
          <a
            href="#settings"
            className="app-sidebar-link"
            onClick={(e) => {
              makeActive(e);
            }}
          >
            <div className="flex justify-start items-center">
              <BsGearFill size={22} className="mx-2" />
              Settings
            </div>
          </a>
        </div>
        {universityOpen ? <University /> : null}
        {instituteOpen ? <Institutes /> : null}
      </div>
    </div>
  );
}

export default Dashboard;
