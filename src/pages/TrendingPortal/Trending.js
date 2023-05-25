import React, { useState, useEffect } from "react";
import TrendingIntro from "../../components/TrendingInro";
import NewCard from "../../components/NewCard";
import { ref as dbref, child, get } from "firebase/database";
import { database } from "../../firebase/init-firebase";
import ReportCard from "../../components/ReportCard";
import ReportDetails from "./ReportDetails";
import { Routes, Route, Outlet } from "react-router-dom";
function Trending() {
  const [allReports, setReports] = useState([]);
  const [selectedReportId, setSelectedReportId] = useState(null);
  const [selectedReportName, setSelectedReportName] = useState(null);
  const [selectedReportDate, setSelectedReportDate] = useState(null);

  function getAllReports() {
    const db = dbref(database);
    get(child(db, `/reportsList/`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          let data = snapshot.val();
          let allData = new Array();
          Object.keys(data).forEach((key) => {
            allData.push(data[key]);
          });
          // setState here
          setReports(allData);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const getSelectedReportDetails = (id, title, date) => {
    setSelectedReportId(id);
    setSelectedReportName(title);
    setSelectedReportDate(date);
    window.localStorage.setItem("selectedReportId", id);
    window.localStorage.setItem("selectedReportName", title);
    window.localStorage.setItem("selectedReportDate", date);
  };

  useEffect(() => {
    getAllReports();
  }, []);

  return (
    <div id="formRoot" className="parent-section darkMode">
      <Routes>
        <Route
          path="*"
          element={
            <div className="flex flex-col items-center">
              <TrendingIntro />
              <div className="report-boxes grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-4 overflow-auto h-report overflow-y-scroll">
                <NewCard />

                {allReports.map((data) => {
                  return (
                    <ReportCard
                      key={data.id}
                      title={data.name}
                      date={data.date}
                      id={data.id}
                      getSelectedReportDetails={getSelectedReportDetails}
                    />
                  );
                })}
              </div>
            </div>
          }
        />
        <Route
          path="ReportDetails/*"
          element={
            <ReportDetails
              reportId={
                selectedReportId ||
                window.localStorage.getItem("selectedReportId")
              }
              name={
                selectedReportName ||
                window.localStorage.getItem("selectedReportName")
              }
              date={
                selectedReportDate ||
                window.localStorage.getItem("selectedReportDate")
              }
            />
          }
        />
      </Routes>
      <Outlet />
    </div>
  );
}

export default Trending;
