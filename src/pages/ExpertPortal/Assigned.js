import React, { useState, useEffect } from "react";
import ExpertIntro from "../../components/ExpertIntro";
import { ref as dbref, set, update, child, get, push } from "firebase/database";
import { database } from "../../firebase/init-firebase";
import { Routes, Route, Link } from "react-router-dom";
import NewTrendingResponse from "../forms/NewTrendingResponse";
import { useAuth } from "../../contexts/AuthContext";

export default function Assigned() {
  const [assignedReports, setAssignedReports] = useState([]);
  const [selectedReportId, setSelectedReportId] = useState();
  const { currentUser } = useAuth();

  function getAllExpertAssignedReports(email) {
    const db = dbref(database);
    let emailID = String(email).split("@")[0];
    get(child(db, `/expertDetails/${emailID}/pending/`))
      .then((snapshot) => {
        let allData = new Array();
        if (snapshot.exists()) {
          let data = snapshot.val();
          Object.keys(data).forEach((key) => {
            allData.push(data[key]);
          });
        }
        //set state
        setAssignedReports(allData);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function getFromDate(date) {
    let d = new Date(date);
    let val = "";
    let day = d.getDate();
    let mon = d.getMonth() + 1;
    let year = d.getFullYear();

    val = day + "/" + mon + "/" + year;
    return val;
  }

  useEffect(() => {
    getAllExpertAssignedReports(currentUser.email);
    return () => {};
  }, []);

  return (
    <div className="h-screen">
      <Routes>
        <Route
          path="*"
          element={
            <>
              <ExpertIntro />
              <div className="overflow-x-auto">
                <table className="min-w-full darkMode">
                  <thead className="border-b">
                    <tr>
                      <th
                        scope="col"
                        className="text-sm font-medium py-4 text-center"
                      >
                        Sr. No.
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium py-4 text-center"
                      >
                        Report Name
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium py-4 text-center"
                      >
                        Report Date
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium py-4 text-center"
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {assignedReports
                      ? assignedReports.map((ele, index) => {
                          return (
                            <tr className="border-b" key={index}>
                              <td className=" text-sm font-medium py-4 text-center">
                                {index + 1}
                              </td>
                              <td className=" text-sm font-medium py-4 text-center">
                                {ele.name}
                              </td>
                              <td className="text-sm font-light py-4 text-center">
                                {getFromDate(ele.date)}
                              </td>
                              <td className="text-sm font-light py-4 text-center">
                                <Link
                                  to="/Assigned/formResponses"
                                  onClick={() => setSelectedReportId(ele.ID)}
                                >
                                  <button className="btn-compatible font-bold py-2 px-4 rounded-full">
                                    OPEN
                                  </button>
                                </Link>
                              </td>
                            </tr>
                          );
                        })
                      : null}
                  </tbody>
                </table>
              </div>
            </>
          }
        />
        <Route
          path="/formResponses"
          element={
            <NewTrendingResponse
              reportID={selectedReportId ? selectedReportId : null}
            />
          }
        />
      </Routes>
    </div>
  );
}
