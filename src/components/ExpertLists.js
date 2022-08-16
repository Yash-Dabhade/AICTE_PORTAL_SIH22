import React from "react";
import ListCard from "./ListCard";
import { child, remove, ref as dbref } from "firebase/database";
import { database } from "../firebase/init-firebase";

export default function ExpertLists({ experts, btnFunc }) {
  function removeExpert(e) {
    alert(`Remove Expert ${e}`);

    const db = dbref(database);
    remove(child(db, `/expertDetails/${e}/`)).catch((error) => {
      console.log(error);
    });
    remove(child(db, `/expertsInfo/${e}/`)).catch((error) => {
      console.log(error);
    });
    remove(child(db, `/expertsEmails/${e}/`))
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  }

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
      {experts &&
        Object.keys(experts).map((key, index) => {
          return (
            <ListCard
              name={key}
              field={experts[key].field}
              btnFunc={removeExpert}
              index={index}
              key={index}
            />
          );
        })}
    </div>
  );
}
