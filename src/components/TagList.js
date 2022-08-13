import React from "react";
// import { getAllTags } from "../utils/dbHelper";
import ListCard from "./ListCard";

export default function TagList({ tags, btnFunc }) {
  return (
    <div className="flex flex-wrap w-full">
      <button
        className="CROSS-ICON absolute top-0 right-0 darkMode"
        onClick={btnFunc}
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
      {tags &&
        Object.keys(tags).map((key, index) => {
          return <ListCard name={key} key={index} />;
        })}
    </div>
  );
}
