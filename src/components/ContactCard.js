import React from "react";
import { MdEmail } from "react-icons/md";
import { TiLocation } from "react-icons/ti";
import { IoCall, IoEarthSharp } from "react-icons/io5";

export default function ContactCard(props) {
  return (
    <>
      <div className="container w-3/6 md:w-96 m-1 md:m-3 p-1 md:p-4 border-2 border-compatible rounded-2xl darkMode">
        <p className="text-sm md:text-base font-bold mt-2 md:w-80 cursor-pointer flex overflow-email">
          <MdEmail className="contactIcon mx-2" size="26px" />
          {props.email}
        </p>
        <p className="text-sm md:text-base font-bold mt-2 md:w-80  flex">
          <IoCall className="contactIcon mx-2" size="26px " />
          {props.phone}
        </p>
        <p className="text-sm md:text-base font-bold mt-2 md:w-80 flex overflow-contactCard ">
          <TiLocation className="contactIcon mx-2" size="26px " />
          {props.location}
        </p>
        <a target="_blank" href={props.website}>
          <p className="text-sm md:text-base font-bold mt-2 md:w-80 cursor-pointer flex overflow-contactCard ">
            <IoEarthSharp className="contactIcon mx-2" size="26px " />
            {props.website}
          </p>
        </a>
      </div>
    </>
  );
}
ContactCard.defaultProps = {
  email: "email here",
  phone: "phone",
  location: "location here",
  wesite: "website link here",
};
