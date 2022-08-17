import React, { useState, useEffect } from "react";
import {
  ref as dbref,
  set,
  update,
  child,
  get,
  push,
  remove,
} from "firebase/database";
import { Link } from "react-router-dom";
import { database } from "../firebase/init-firebase";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function SubjectBannerCard({
  responseObj,
  getSelectedResponse,
}) {
  return (
    <>
      <div className="container w-80 mx-3 my-1 p-4 border-compatible border border-stone-500 rounded-md shadow-zinc-600">
        <div className="text-lg font-bold">{responseObj.title}</div>
        <div className="flex justify-between items-center">
          <div>{responseObj.tag} </div>
          <div>
            <CircularProgressbar
              value={responseObj.mcapture}
              text={`${responseObj.mcapture}`}
              strokeWidth={6}
              styles={buildStyles({
                textColor: "black",
                pathColor: "#0F172A",
                trailColor: "gray",
              })}
              className="w-12 h-12"
            />
          </div>
        </div>
        <div className="flex items-center ">
          <Link
            to={"/Trending/ReportDetails/ResponseDetails/"}
            onClick={() => {
              getSelectedResponse(responseObj);
            }}
            className="btn text-center p-2  mx-12 w-44 border-compatible border border-bg-slate-700 bg-slate-900 text-white hover:bg-slate-400  rounded-md"
          >
            View Full Details
          </Link>
        </div>
      </div>
    </>
  );
}
SubjectBannerCard.defaultProps = {
  title: "title here",
  tag: "tag",
  market: "market",
};
