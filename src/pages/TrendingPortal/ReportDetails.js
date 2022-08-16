import React from "react";
import { Link } from "react-router-dom";
import ComboBoxExpert from "../../components/ComboBoxExpert";
import SubjectBannerCard from "../../components/SubjectBannerCard";

export default function ReportDetails({ reportId, name, date }) {
  return (
    <div>
      <h2 className="flex items-center justify-start font-bold font-serif text-2xl mt-2 border-compatible border-b-2 pb-2 border-b-slate-500">
        Report Details
      </h2>
      <div className="my-2">Search bar and filter</div>
      <div className="flex h-report my-4 items-center justify-between">
        <div className="h-report w-8/12  border-2 rounded-xl shadow-lg border-compatible border-slate-800">
          <h3 className="text-center  font-bold py-1 border-b-2 border-compatible bg-slate-900 text-white border-b-slate-900 rounded-xl">
            Response container
          </h3>
          <div className="grid max-h-72 grid-cols-2 overflow-y-scroll mt-2">
            <SubjectBannerCard />
            <SubjectBannerCard />
            <SubjectBannerCard />
            <SubjectBannerCard />
            <SubjectBannerCard />
            <SubjectBannerCard />
            <SubjectBannerCard />
            <SubjectBannerCard />
          </div>
        </div>
        <div className=" h-report w-report border-2 rounded-xl shadow-lg border-compatible border-slate-800">
          <h3 className="text-center  font-bold py-1 border-b-2 border-compatible bg-slate-900 text-white border-b-slate-900 rounded-xl">
            Mail Container
          </h3>
          <div className="px-8 mt-3">
            <Link to="/Settings">
              <button className="border-2 border-compatible border-slate-800 rounded-xl p-2 hover:bg-slate-600 hover:text-zinc-100 font-semibold font-serif w-full">
                Add New Expert
              </button>
            </Link>
          </div>
          <div className="px-8 py-2">
            <ComboBoxExpert reportId={reportId} name={name} date={date} />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <Link to="/Past%20Reports">
          <button className="border-2  hover:bg-slate-600 hover:text-zinc-100 border-compatible border-slate-800 rounded-xl p-2 font-semibold font-serif shadow-lg">
            Previous Reports
          </button>
        </Link>
        <button className="border-2  hover:bg-slate-600 hover:text-zinc-100 border-compatible border-slate-800 rounded-xl p-2 font-semibold font-serif shadow-lg">
          Generate Report
        </button>
      </div>
    </div>
  );
}
