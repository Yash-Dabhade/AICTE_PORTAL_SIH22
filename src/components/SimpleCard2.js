import React from "react";

function SimpleCard2() {
  return (
    <div className="container flex h-screen justify-center text-lg items-center">
      <div className="content border-2 border-[black] rounded-lg  py-3 w-1/3">
        <div className="title p-3 m-4 border-b-2 border-[black]">Title</div>
        <div className="subtitle p-3 m-4">Sub title</div>
        <div className="content2 flex m-4 justify-between p-3">
          <div className="subjectcode flex-none">Code</div>
          <div className="view flex rounded-3xl bg-[grey] px-12 py-1">
            <a href="#" className="btn ">
              View
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SimpleCard2;
