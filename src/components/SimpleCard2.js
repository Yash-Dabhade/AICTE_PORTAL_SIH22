import React from "react";
import { BsPersonPlus } from "react-icons/bs";

function SimpleCard2(props) {
  return (
    <div className="university-box-wrapper darkMode">
      <div className="border-2 border-compatible rounded-lg py-3 w-card">
        <div className="font-bold text-xl p-3 m-4 border-b-2 border-compatible">
          {props.data.title}
        </div>
        <div className="flex justify-between itmes-center ">
          <div className="p-3 text-lg m-4">
            {props.data.level || props.data.desc}
          </div>
          <div className="p-3 text-lg min-w-fit m-4">
            Code : {props.data.code}
          </div>
        </div>
        <div className="m-4">
          <div className="rounded-3xl px-6 py-2 btn-compatible text-center  font-bold">
            <button
              className="btn cursor-pointer w-full"
              onClick={() => {
                if (!props.deptCode) {
                  props.renderDetails(props.data.code);
                } else {
                  props.renderDetails(props.deptCode);
                }
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
