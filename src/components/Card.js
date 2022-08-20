import React from "react";
import { HiOutlineMail } from "react-icons/hi";
import { FaUniversity } from "react-icons/fa";
import { BsFillJournalBookmarkFill } from "react-icons/bs";
import { Link } from "react-router-dom";

function Card(props) {
  return (
    <div className="university-box-wrapper">
      <div className="card right bg-white mt-10 p-5 w-72 h-card rounded-lg drop-shadow-xl py border border-compatible">
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
        <Link
          to="/University/institutes"
          onClick={() => props.getSelectedInstitute(props.index)}
          id="details"
          className="btn px-16 pt-3  mt-4 h-12 w-60 rounded-md border-2 border-compatible font-light flex"
        >
          <BsFillJournalBookmarkFill className="mx-2" size="24px" />
          Details
        </Link>
      </div>
    </div>
  );
}

export default Card;
