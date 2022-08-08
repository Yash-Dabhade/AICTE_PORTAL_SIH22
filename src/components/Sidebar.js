import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Dashboard.css";

export default function Sidebar(props) {
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

    props.linkFunc.map((ele) => {
      ele(false);
    });
  }

  return (
    <div className={props.isNavOpen ? "app-sidebar" : "hideMenuNav"}>
      <ul className="MENU-LINK-MOBILE-OPEN flex flex-col items-center justify-between min-h-[250px] mt-5">
        {props.links.map((ele, index) => {
          return (
            <li className="w-full" key={index}>
              <Link
                to={`/${ele}`}
                className={
                  index == 0 ? "app-sidebar-link active" : "app-sidebar-link"
                }
                onClick={(e) => {
                  makeActive(e);
                  props.linkFunc[index](true);
                }}
              >
                <div className="flex justify-start items-center">
                  {props.icons[index]}
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
