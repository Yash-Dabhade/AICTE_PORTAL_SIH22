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
  const [selectedReportId, setSelectedReportId] = useState();
  function getAllReports() {
    const db = dbref(database);
    get(child(db, `/reportsList/`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          let data = snapshot.val();
          console.log(data);
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

  const getSelectedReportId = (e) => {
    setSelectedReportId(e);
  };

  useEffect(() => {
    return () => {
      getAllReports();
    };
  }, []);

  return (
    <div id="formRoot" className="parent-section darkMode">
      <Routes>
        <Route
          path="*"
          element={
            <div className="flex flex-col items-center justify-center">
              <TrendingIntro />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-4 overflow-auto h-report md:h-4/5 lg:h-full">
                <NewCard />
                {allReports.map((data) => {
                  return (
                    <ReportCard
                      key={data.id}
                      title={data.name}
                      date={data.date}
                      id={data.id}
                      getSelectedReportId={getSelectedReportId}
                    />
                  );
                })}
              </div>
            </div>
          }
        />
        <Route
          path="ReportDetails/*"
          element={<ReportDetails reportId={selectedReportId} />}
        />
      </Routes>
      <Outlet />
    </div>
  );
}

export default Trending;
