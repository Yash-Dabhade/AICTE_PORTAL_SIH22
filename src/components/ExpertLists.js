import React from "react";
import ExpertCard from "./ExpertCard";

export default function ExpertLists(props) {
  return (
    <div className="flex flex-wrap w-full">
      <button
        className="CROSS-ICON absolute top-0 right-0 darkMode"
        onClick={props.btnFunc}
      >
        <svg
          className="h-8 w-8"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
      <ExpertCard />
      <ExpertCard />
      <ExpertCard />
      <ExpertCard />
    </div>
  );
}
