import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ComboBoxExpert from "../../components/ComboBoxExpert";
import SubjectBannerCard from "../../components/SubjectBannerCard";
import { Routes, Route, Outlet } from "react-router-dom";
import {
  ref as dbref,
  set,
  update,
  child,
  get,
  push,
  remove,
} from "firebase/database";
import { database } from "../../firebase/init-firebase";
import ResponseDetails from "./ResponseDetails";

export default function ReportDetails({ reportId, name, date }) {
  const [responses, setResponses] = useState([]);
  const [selectedResponse, setSelectedResponse] = useState(null);

  function getSelectedResponse(obj) {
    setSelectedResponse(obj);
  }

  function getAllResponsesByReportID(reportID) {
    const db = dbref(database);
    get(child(db, `/reportDetails/${reportID}/responses/`))
      .then((snapshot) => {
        let allData = new Array();
        if (snapshot.exists()) {
          let data = snapshot.val();
          Object.keys(data).forEach((key) => {
            allData.push(data[key]);
          });
        }
        setResponses(allData);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    getAllResponsesByReportID(reportId);
    return () => {};
  }, []);

  return (
    <div id="formRoot" className="parent-section darkMode">
      <Routes>
        <Route
          path="/*"
          element={
            <div>
              <h2 className="flex items-center justify-start font-bold font-serif text-2xl mt-2 border-compatible border-b-2 pb-2 border-b-slate-500">
                {name} Report Details
              </h2>
              <div className="my-2">Search bar and filter</div>
              <div className="flex h-report my-4 items-center justify-between">
                <div className="h-report w-8/12  border-2 rounded-xl shadow-lg border-compatible border-slate-800">
                  <h3 className="text-center  font-bold py-1 border-b-2 border-compatible bg-slate-900 text-white border-b-slate-900 rounded-xl">
                    Responses By Experts
                  </h3>
                  <div className="grid max-h-72 grid-cols-2 overflow-y-scroll mt-2">
                    {responses.map((response) => {
                      return (
                        <SubjectBannerCard
                          key={response.id}
                          responseObj={response}
                          getSelectedResponse={getSelectedResponse}
                        />
                      );
                    })}
                  </div>
                </div>
                <div className=" h-report w-report border-2 rounded-xl shadow-lg border-compatible border-slate-800">
                  <h3 className="text-center  font-bold py-1 border-b-2 border-compatible bg-slate-900 text-white border-b-slate-900 rounded-xl">
                    Experts Control Panel
                  </h3>
                  <div className="px-8 mt-3">
                    <Link to="/Settings">
                      <button className="border-2 border-compatible border-slate-800 rounded-xl p-2 hover:bg-slate-600 hover:text-zinc-100 font-semibold font-serif w-full">
                        Add New Expert
                      </button>
                    </Link>
                  </div>
                  <div className="px-8 py-2">
                    <ComboBoxExpert
                      reportId={reportId}
                      name={name}
                      date={date}
                    />
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
          }
        />
        <Route
          path="ResponseDetails/*"
          element={
            //element
            <ResponseDetails responseObj={selectedResponse} />
          }
        />
      </Routes>
      <Outlet />
    </div>
  );
}
