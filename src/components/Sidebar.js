import React, { useState } from "react";
import { NavLink } from "react-router-dom";
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
  }

  return (
    <div className={isNavOpen ? "app-sidebar" : "hideMenuNav"}>
      <ul className="MENU-LINK-MOBILE-OPEN flex flex-col items-center justify-between min-h-[250px] mt-5">
        {links.map((ele, index) => {
          return (
            <li className="w-full" key={index}>
              <NavLink
                to={`/${ele}`}
                className={
                  index === 0 && window.location.pathname === "/"
                    ? "app-sidebar-link active"
                    : "app-sidebar-link"
                }
                onClick={(e) => {
                  makeActive(e);
                }}
              >
                <div className="flex justify-start items-center">
                  {icons[index]}
                  <span>{ele}</span>
                </div>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
