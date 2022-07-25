import React, { createElement } from "react";
import ReactDOM from "react-dom/client";
import {
  HiOutlineDotsVertical,
  HiOutlineMail,
  HiOutlinePhone,
} from "react-icons/hi";
import Institute from "./Institute";

function Card(props) {
  const renderCardDetails = () => {
    document.querySelector(".universities-section-header").remove();
    document.querySelector(".universities-subSection-header").remove();
    let root = ReactDOM.createRoot(
      document.querySelector(".universities-section")
    );
    root.render(
      <Institute
        root={root}
        title={props.title}
        code={props.code}
        fullName={props.fullName}
        institutes={props.institutes}
      />
    );
  };

  return (
    <div className="university-box-wrapper">
      <div className="university-box">
        <div className="right bg-white mt-10 p-5 w-72 h-card rounded-lg drop-shadow-2xl scale-95 hover:scale-100 ease-in duration-500 py">
          <img className="mt-5 mx-20 h-24  w-24" src={props.logo} alt="Logo" />

          <p className="font-bold mt-2">{props.title}</p>
          <p>{props.fullName}</p>

          <a
            href={`mailto:${props.email}`}
            id="email"
            className="btn px-16 pt-3 mt-2 h-12 w-60 rounded-md bg-slate-300  hover:bg-slate-200 font-light flex "
          >
            <HiOutlineMail className="mx-2" size="26px" />
            Email
          </a>
          <a
            onClick={renderCardDetails}
            id="details"
            className="btn px-16 pt-3  mt-4 h-12 w-60 rounded-md  bg-slate-300  hover:bg-slate-200 font-light flex"
          >
            Details
          </a>
        </div>
      </div>
    </div>
  );
}

export default Card;
