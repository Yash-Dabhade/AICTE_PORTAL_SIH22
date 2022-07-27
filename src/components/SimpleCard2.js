import React from "react";
import { BsPersonPlus } from "react-icons/bs";

function SimpleCard2(props) {
  return (
    <div className="university-box-wrapper darkMode">
      <div className="content border-2 border-compatible rounded-lg  py-3 w-full">
        <div className="title p-3 m-4 border-b-2 border-compatible">
          {props.data.title}
        </div>
        <div className="subtitle p-3 m-4">{props.data.level}</div>
        <div className="content2 flex m-4 justify-between">
          <div className="subjectcode flex-none">{props.data.code}</div>
          <div className="view flex rounded-3xl px-12 py-1 btn-compatible ">
            <button
              className="btn"
              onClick={() => {
                props.renderDetails(props.data.code);
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
SimpleCard2.defaultProps = {
  data: { title: "title here", level: "level here", code: "code here" },
};
export default SimpleCard2;
