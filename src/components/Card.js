import React, { createElement } from "react";
import CardDetails from "./CardDetails";
import {
  HiOutlineDotsVertical,
  HiOutlineMail,
  HiOutlinePhone,
} from "react-icons/hi";

function Card(props) {
  const renderCardDetails = (e) => {
    let ele = e.target.parentElement;
    let allEle = document.querySelectorAll(".university-box");
    allEle.forEach((ele) => {
      ele.remove();
    });
    let parentEle = document.querySelector(".university-box-wrapper");
    let cardDetails = document.createElement("div");
    cardDetails.classList.add("details");
    cardDetails.innerText = props.info;
    parentEle.append(cardDetails);
  };

  return (
    <div className="university-box-wrapper">
      <div className="university-box">
        <div className="right bg-white mt-10 p-5 w-72 h-96 rounded-lg drop-shadow-2xl scale-95 hover:scale-100 ease-in duration-500 py">
          <button className="mx-56 rounded-full hover:bg-slate-200">
            <HiOutlineDotsVertical size="24px" />{" "}
          </button>
          <img className="mx-20 h-24  w-24" src={props.logo} alt="Logo" />

          <p className="font-bold mt-2">{props.title}</p>
          <p>{props.desc}</p>

          <a
            href={`mailto:${props.email}`}
            id="email"
            className="btn px-16 pt-3 mt-2 h-12 w-60 rounded-md bg-slate-300  hover:bg-slate-200 font-light flex "
          >
            <HiOutlineMail className="mx-2" size="26px" />
            Email
          </a>
          <a
            href={`tel:${props.phone}`}
            id="call"
            className="btn px-16 pt-3  mt-4 h-12 w-60 rounded-md  bg-slate-300  hover:bg-slate-200 font-light flex"
          >
            <HiOutlinePhone className="mx-2" size="26px " />
            Call
          </a>
        </div>
      </div>
    </div>
  );
}

export default Card;
