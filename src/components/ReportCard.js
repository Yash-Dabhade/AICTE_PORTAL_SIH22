import React from "react";
import { Link } from "react-router-dom";
function ReportCard(props) {
  function getFromDate(date) {
    let d = new Date(date);
    let val = "";
    let day = d.getDate();
    let mon = d.getMonth() + 1;
    let year = d.getFullYear();

    val = day + "/" + mon + "/" + year;
    return val;
  }

  return (
    <div className="report-boxes border-2 rounded-xl shadow-xl border-compatible border-gray-800 w-56 h-40 flex flex-col gap-4 px-3 items-start justify-center">
      <p className="font-bold text-xl font-serif">{props.title}</p>
      <p>{getFromDate(props.date)}</p>
      <Link
        onClick={() => {
          props.getSelectedReportDetails(props.id, props.title, props.date);
        }}
        to="/Trending/ReportDetails"
        className="bg-slate-900 text-white border-compatible border-2 border-black p-2 rounded-lg shadow-lg"
      >
        View Report
      </Link>
    </div>
  );
}

export default ReportCard;
