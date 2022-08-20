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
      <div className="w-11/12 mx-3 my-1 p-2 border-compatible border rounded-md ">
        <div className="text-lg font-bold">{responseObj.title}</div>
        <div className="flex justify-between items-center mb-3 lg:mb-0">
          <div>{responseObj.tag || "Tag"} </div>
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
        <div className="w-full md:p-2 flex justify-center">
          <Link
            to={"/Trending/ReportDetails/ResponseDetails/"}
            onClick={() => {
              getSelectedResponse(responseObj);
            }}
            className="btn btn-compatible border border-compatible p-2 rounded-md"
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
