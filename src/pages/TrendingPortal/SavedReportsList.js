import React, { useState, useEffect } from "react";
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
function SavedReportsList() {
  const [reports, setReports] = useState(null);

  function getAllSavedReports() {
    const db = dbref(database);
    get(child(db, `/savedReports/`))
      .then((snapshot) => {
        let allData = new Array();
        if (snapshot.exists()) {
          let data = snapshot.val();
          Object.keys(data).forEach((key) => {
            allData.push(data[key]);
          });
        }
        //set state
        setReports(allData);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    getAllSavedReports();
    return () => {};
  }, []);

  return (
    <div>
      <div className="flex flex-col text-center w-full">
        <h1 className="text-2xl font-medium title-font border-b border-b-slate-600 p-2 tracking-widest">
          SAVED RERPORTS
        </h1>
      </div>
      <div className="overflow-y-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-y-scroll h-report">
            <table className="min-w-full darkMode">
              <thead className="border-b">
                <tr>
                  <th
                    scope="col"
                    className="text-sm font-medium py-4 text-center"
                  >
                    sr. no.
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium py-4 text-center"
                  >
                    Title
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium py-4 text-center"
                  >
                    Tag
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium py-4 text-center"
                  >
                    Prerequisite
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium py-4 text-center"
                  >
                    Author
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium py-4 text-center"
                  >
                    View
                  </th>
                </tr>
              </thead>
              <tbody>
                {reports &&
                  reports.map((ele, index) => {
                    return (
                      <tr className="border-b" key={index}>
                        <td className=" text-sm font-medium py-4 text-center">
                          {index + 1}
                        </td>
                        <td className=" text-sm font-medium py-4 text-center">
                          {ele.title}
                        </td>
                        <td className="text-sm font-light py-4 text-center">
                          {ele.tag}
                        </td>
                        <td className="text-sm font-light py-4 text-center">
                          {ele.prereq}
                        </td>
                        <td className="text-sm font-light py-4 text-center">
                          {ele.author}
                        </td>
                        <td className="text-sm font-light py-4 text-center">
                          <a target="_blank">
                            <button className="btn-compatible font-bold py-2 px-4 rounded-full">
                              Open
                            </button>
                          </a>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SavedReportsList;
