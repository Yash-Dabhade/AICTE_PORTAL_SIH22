import React from "react";

export default function SubjectBannerCard(props) {
  return (
    <>
      <div className="container w-80 m-3 p-4 border border-stone-900 rounded-2xl shadow-lg shadow-zinc-600">
        <p className="text-lg font-bold">{props.title}</p>
        <p className="float-left">{props.tag}  </p>
        <p className="float-right">{props.market}</p>
        
        <button  id="details" className="btn items-center mt-5 mx-12 w-44 h-8 bg-zinc-400  hover:bg-zinc-300  rounded-md">View Full Details</button>
      </div>
    </>
  );
}
SubjectBannerCard.defaultProps = {
  title: "title here",
  tag: "tag",
  market: "market",

};
