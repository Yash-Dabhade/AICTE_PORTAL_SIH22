import React, { createElement } from "react";
import ReactDOM from "react-dom/client";
import {
  HiOutlineDotsVertical,
  HiOutlineMail,
  HiOutlinePhone,
} from "react-icons/hi";
import { FaUniversity } from "react-icons/fa";
import { BsFillJournalBookmarkFill } from "react-icons/bs";
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
        email={props.email}
        phone={props.phone}
        location={props.location}
        website={props.website}
      />
    );
  };

  return (
    <div className="university-box-wrapper">
      <div className="card right bg-white mt-10 p-5 w-72 h-card rounded-lg drop-shadow-2xl scale-95 hover:scale-100 ease-in duration-500 py">
        {/* <img className="mt-5 mx-20 h-24  w-24" src={props.logo} alt="Logo" /> */}
        <FaUniversity className="darkMode mb-20 mx-20" size={68} />
        <p className="font-bold mt-2">{props.title}</p>
        <p>{props.fullName}</p>

        <a
          href={`mailto:${props.email}`}
          id="email"
          className="btn px-16 pt-3 mt-2 h-12 w-60 rounded-md border-2 border-compatible font-light flex "
        >
          <HiOutlineMail className="mx-2" size="27px" />
          Email
        </a>
        <a
          onClick={renderCardDetails}
          id="details"
          className="btn px-16 pt-3  mt-4 h-12 w-60 rounded-md border-2 border-compatible font-light flex"
        >
          <BsFillJournalBookmarkFill className="mx-2" size="24px" />
          Details
        </a>
      </div>
    </div>
  );
}

export default Card;
