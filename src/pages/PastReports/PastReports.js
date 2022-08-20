import React from "react";
import { IoSaveSharp } from "react-icons/io5";
import { FaShare } from "react-icons/fa";
import { Link, Routes, Route, Outlet } from "react-router-dom";
import SavedReportsList from "../TrendingPortal/SavedReportsList";

export default function PastReports() {
  return (
    <div id="formRoot" className="parent-section darkMode">
      <Routes>
        <Route
          path="/*"
          element={
            <div className="parent-section darkMode">
              <div className="bg-slate-900 border-compatible border  text-white rounded-lg h-auto p-4">
                <p className="text-white font-bold text-xl">Past Reports</p>
              </div>
              <div className="flex h-DetailContainer items-center justify-center gap-8">
                <div className="border-2 px-3  flex flex-col items-center justify-between border-compatible border-black rounded-xl shadow-xl w-report h-report">
                  <p className="w-full border-compatible text-center p-3 font-bold text-2xl font-mono border-b border-b-neutral-800">
                    Saved Reports
                  </p>
                  <div>
                    <IoSaveSharp className="mx-2" size="134px" />
                  </div>
                  <Link to="/Past%20Reports/SavedReportsList">
                    <button className="w-full font-medium border m-2 bg-slate-800 text-white border-slate-700 p-2 shadow-lg rounded-xl border-compatible hover:bg-slate-500">
                      View Now
                    </button>
                  </Link>
                </div>
                <div className="border-2 px-3 flex flex-col items-center justify-between border-compatible border-black rounded-xl shadow-xl w-report h-report">
                  <p className="w-full text-center border-compatible p-3 font-bold text-2xl font-mono border-b border-b-neutral-800">
                    Published Reports
                  </p>
                  <div>
                    <FaShare className="mx-2" size="134px" />
                  </div>
                  <Link to="/Past%20Reports/SavedReportsList">
                    <button className="w-full font-medium border m-2 bg-slate-800 text-white border-slate-700 p-2 shadow-lg rounded-xl border-compatible hover:bg-slate-500">
                      View Now
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          }
        />
        <Route path="SavedReportsList/*" element={<SavedReportsList />} />
      </Routes>
      <Outlet />
    </div>
  );
}
