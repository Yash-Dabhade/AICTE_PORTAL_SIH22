import React from "react";
import { BsFillHouseFill } from "react-icons/bs";

function Header(props) {
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return (
    <div className="universities-section-header">
      <a href="/" className="cursor">
        <BsFillHouseFill size={30} className="m-4" />
      </a>
      <p className="uHeader">{props.title}</p>
      <p className="time">
        {month[new Date().getMonth()]} , {new Date().getDate()}
      </p>
    </div>
  );
}

export default Header;
