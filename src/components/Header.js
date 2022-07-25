import React from "react";

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
      <svg
        style={{ width: "42px", height: "42px" }}
        onClick={() => {
          window.location.href = "/";
        }}
      >
        <path
          d="M8 42V18L24.1 6 40 18v24H28.3V27.75h-8.65V42Zm3-3h5.65V24.75H31.3V39H37V19.5L24.1 9.75 11 19.5Zm13-14.65Z"
          strokeWidth="1"
          stroke="currentColor"
        />
      </svg>
      <p className="uHeader">{props.title}</p>
      <p className="time">
        {month[new Date().getMonth()]} , {new Date().getDate()}
      </p>
    </div>
  );
}

export default Header;
