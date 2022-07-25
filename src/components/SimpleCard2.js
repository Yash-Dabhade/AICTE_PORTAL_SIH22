import React from "react";

function SimpleCard2(props) {
  return (
    <div className="university-box-wrapper">
      <div className="content border-2 border-[black] rounded-lg  py-3 w-full">
        <div className="title p-3 m-4 border-b-2 border-[black]">
          {props.title}
        </div>
        <div className="subtitle p-3 m-4">{props.subTitle}</div>
        <div className="content2 flex m-4 justify-between p-3">
          <div className="subjectcode flex-none">{props.code}</div>
          <div className="view flex rounded-3xl bg-[grey] px-12 py-1">
            <button
              className="btn"
              onClick={() => {
                props.renderDetails();
              }}
            >
              View
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SimpleCard2;