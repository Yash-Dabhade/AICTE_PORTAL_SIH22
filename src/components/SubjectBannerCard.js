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
import { database } from "../firebase/init-firebase";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function SubjectBannerCard(props) {
  return (
    <>
      <div className="container w-80 mx-3 my-1 p-4 border-compatible border border-stone-500 rounded-md shadow-zinc-600">
        <div className="text-lg font-bold">{props.title}</div>
        <div className="flex justify-between items-center">
          <div>{props.tag} </div>
          <div>
            <CircularProgressbar
              value={props.market}
              text={`${props.market}`}
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

        <button
          id="details"
          className="btn items-center mt-5 mx-12 w-44 border-compatible h-8 border border-bg-slate-700 bg-slate-900 text-white hover:bg-slate-400  rounded-md"
        >
          View Full Details
        </button>
      </div>
    </>
  );
}
SubjectBannerCard.defaultProps = {
  title: "title here",
  tag: "tag",
  market: "market",
};
