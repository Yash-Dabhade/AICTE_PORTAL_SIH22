import React from "react";

export default function SubjectBannerCard(props) {
  return (
    <>
      <div className="container w-80 mx-3 my-1 p-4 border-compatible border border-stone-500 rounded-md shadow-zinc-600">
        <p className="text-lg font-bold">{props.title}</p>
        <p className="float-left">{props.tag} </p>
        <p className="float-right">{props.market}</p>

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
