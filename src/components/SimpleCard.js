import React from "react";
import { Link } from "react-router-dom";

function SimpleCard({
  data,
  getSelectedCourseCode,
  getSelectedDepartment,
  deptCode,
}) {
  return (
    <div className="university-box-wrapper darkMode">
      <div className="border-2 border-compatible rounded-lg py-3 w-card">
        <div className="font-bold text-xl p-3 m-4 border-b-2 border-compatible">
          {data.title}
        </div>
        <div className="flex justify-between itmes-center ">
          <div className="p-3 text-lg m-4">{data.level || data.desc}</div>
          <div className="p-3 text-lg min-w-fit m-4">Code : {data.code}</div>
        </div>
        <div className="m-4">
          <Link
            to={`${
              window.location.pathname === "/University/institutes/courses"
                ? `${window.location.pathname}/departments`
                : `${window.location.pathname}/curriculums`
            }`}
            className="btn cursor-pointer w-full"
            onClick={() => {
              if (!deptCode) {
                getSelectedCourseCode(data.code);
              } else {
                getSelectedDepartment(data);
              }
            }}
          >
            <div className="rounded-3xl px-6 py-2 btn-compatible text-center font-bold">
              View
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
SimpleCard.defaultProps = {
  data: { title: "title here", level: "level here", code: "code here" },
};
export default SimpleCard;
