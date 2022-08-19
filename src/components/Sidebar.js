import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Dashboard.css";

export default function Sidebar({ links, icons, isNavOpen }) {
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
    window.localStorage.removeItem("instituteCode");
    window.localStorage.removeItem("institutesData");
    window.localStorage.removeItem("courseCode");
    window.localStorage.removeItem("CoursesData");
    window.localStorage.removeItem("selectedDepartment");
    window.localStorage.removeItem("institutes");
    window.localStorage.removeItem("selectedReportId");
    window.localStorage.removeItem("selectedReportName");
    window.localStorage.removeItem("selectedReportDate");
  }

  return (
    <div className={isNavOpen ? "app-sidebar" : "hideMenuNav"}>
      <ul className="MENU-LINK-MOBILE-OPEN flex flex-col items-center justify-between min-h-[250px] mt-5">
        {links.map((ele, index) => {
          return (
            <li className="w-full" key={index}>
              <Link
                to={`/${ele}`}
                // className={
                //   index === 0 && window.location.pathname === "/"
                //     ? "app-sidebar-link active"
                //     : "app-sidebar-link"
                // }
                className={`app-sidebar-link ${
                  (index === 0 && window.location.pathname === "/") ||
                  window.location.pathname.includes(ele)
                    ? "active"
                    : ""
                }`}
                onClick={(e) => {
                  makeActive(e);
                }}
              >
                <div className="flex justify-start items-center">
                  {icons[index]}
                  <span>{ele}</span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
