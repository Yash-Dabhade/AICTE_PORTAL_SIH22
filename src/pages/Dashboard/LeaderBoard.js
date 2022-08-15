import React from "react";

export default function LeaderBoard() {
  const demo = [
    {
      index: "1st",
      title: "Harry",
      desc: "60",
    },
    {
      index: "2nd",
      title: "Tonny Stark",
      desc: "56",
    },
    {
      index: "3rd",
      title: "Elon Musk",
      desc: "49",
    },
    {
      index: "4th",
      title: "Odin",
      desc: "41",
    },
    {
      index: "5th",
      title: "Thor",
      desc: "39",
    },
  ];

  const card = demo.map((ele, index) => {
    return (
      <div
        key={index}
        className="max-w-sm rounded-2xl text-white overflow-hidden shadow-xl border-solid border-2 border-slate-700 bg-slate-900"
      >
        <div className="px-6 py-4 ">
          <p className="font-sans">{ele.index}</p>
          <div className="font-bold font-sans text-xl mb-2">{ele.title}</div>
          <p className="text-base font-mono text-gray-300">
            Score : {ele.desc}
          </p>
        </div>
      </div>
    );
  });

  return (
    <div className="">
      <div className="grid grid-cols-5 gap-5 ">{card}</div>
    </div>
    // if you want to test this page then add this page on Dashboard.js for testing purposse only and remove while commiting changes....
  );
}
