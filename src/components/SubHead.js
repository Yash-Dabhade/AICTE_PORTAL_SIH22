import React from "react";

export default function SubHead(props) {
  return (
    <>
      <div className="white w-full">
        <div className="right bg-white px-2 w-full h-11  border-b border-neutral-500 flex justify-between">
          <p className="font-bold mt-2 w-80 ">{props.heading}</p>
          <button
            className="btn px-2 mt-1 mb-1 ml-28 rounded-md h-8 w-max bg-gray-400 font-bold text-white hover:bg-gray-300  "
            onClick={props.btnFunc}
          >
            {`Create ${props.heading}`}
          </button>
        </div>
      </div>
    </>
  );
}
SubHead.defaultProps = {
  heading: "Universities",
  btnText: "Create University",
  // btnFunc: "button Function here",
};
