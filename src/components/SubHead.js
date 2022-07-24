import React from "react";

export default function SubHead(props) {
  return (
   
    <>
    <div className="white">
     <div className="right bg-white px-2 w-1/2 h-11 rounded-lg border border-neutral-500 flex">
        <p className="font-bold mt-2 w-80 ">{props.heading}</p>
        <button className="btn mt-1 mb-1 ml-28 rounded-md h-8 w-44 bg-gray-400 font-bold text-white hover:bg-gray-300 " onClick={props.btnFunc}>{props.btnText}</button>
     </div>
    </div>
    </>
  );
}
SubHead.defaultProps = {
  heading: "Set heading here",
  btnText: "Button Text ",
  btnFunc: "button Function here",
};
