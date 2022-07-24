import React from "react";

import { MdEmail } from "react-icons/md";
import { TiLocation } from "react-icons/ti";
import { IoCall, IoEarthSharp } from "react-icons/io5";

export default function ContactCard(props) {
  return (  
    <>
    <div className="container p-5 w-80 h-48 rounded-lg border border-neutral-500 ">
     <p className="font-bold mt-2 w-80 cursor-pointer flex"> <MdEmail className="mx-2" size="26px" />{props.email}</p>
     <p className="font-bold mt-2 w-80  flex"><IoCall className="mx-2" size="26px " />{props.phone}</p>
     <p className="font-bold mt-2 w-80  flex"><TiLocation className="mx-2" size="26px "/>{props.location}</p>
     <p className="font-bold mt-2 w-80 cursor-pointer flex"><IoEarthSharp className="mx-2" size="26px "/>{props.wesite}</p>
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
  
