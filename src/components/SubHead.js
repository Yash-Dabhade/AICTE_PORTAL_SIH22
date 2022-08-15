import React from "react";

export default function SubHead(props) {
  return (
    <div className="universities-subSection-header flex justify-center mw-full">
      <div className="white w-full">
        <div className="right px-2 w-full h-11 border-b border-neutral-500 flex justify-between">
          <p className="font-bold mt-2 w-80 darkMode">{props.title}</p>
          <div className="flex gap-3">
            {props.copyRef && (
              <button
                className="btn btn-compatible px-2 mt-1 mb-1 rounded-md h-8 w-max font-bold"
                onClick={() => {
                  navigator.clipboard.writeText(props.copyRef);
                  props.copyRefBtnFunc();
                }}
              >
                {`Copy ID`}
              </button>
            )}
            <button
              className="btn btn-compatible px-2 mt-1 mb-1 rounded-md h-8 w-max font-bold"
              onClick={props.btnFunc}
            >
              {`Create ${props.title}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
SubHead.defaultProps = {
  heading: "Universities",
  btnText: "Create University",
  // btnFunc: "button Function here",
};
