import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ComboBoxExpert from "../../components/ComboBoxExpert";
import SubjectBannerCard from "../../components/SubjectBannerCard";
import { Routes, Route, Outlet } from "react-router-dom";
import MultiSelect from "react-multiple-select-dropdown-lite";
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
  const [tags, setTags] = useState([]);

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

  // Tags
  function getAllTags() {
    const db = dbref(database);
    get(child(db, `/tags/`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          let data = snapshot.val();
          let allData = new Array();
          Object.keys(data).forEach((key) => {
            allData.push({ label: data[key].name, value: data[key].value });
          });
          // setState
          setTags(allData);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function handleTagschange(tag) {
    if (tag.length > 0) {
      const filteredResponses = responses.filter((response) => {
        return tag.trim() === response.tag.trim();
      });

      setResponses(filteredResponses);
    } else {
      getAllResponsesByReportID(reportId);
    }
  }

  // Search Bar
  function handleSearchQuery(searchQuery) {
    if (searchQuery.length > 0) {
      const filteredResponses = responses.filter((response) => {
        return JSON.stringify(response).includes(searchQuery);
      });
      setResponses(filteredResponses);
    } else {
      getAllResponsesByReportID(reportId);
    }
  }

  useEffect(() => {
    getAllResponsesByReportID(reportId);
    getAllTags();
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
              <div className="my-4 flex items-center justify-between ">
                <div className="search-wrapper border">
                  <input
                    className="search-input"
                    type="text"
                    placeholder="Search"
                    id="pageSearch"
                    onChange={(e) =>
                      // setSearchQuery(e.target.value)
                      handleSearchQuery(e.target.value)
                    }
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="feather feather-search"
                    viewBox="0 0 24 24"
                    // onClick={handleSearch}
                  >
                    <defs></defs>
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="M21 21l-4.35-4.35"></path>
                  </svg>
                </div>
                <div className="px-8 py-2">
                  <MultiSelect
                    singleSelect={true}
                    className="text-black w-full"
                    onChange={handleTagschange}
                    options={tags}
                  />
                </div>
              </div>
              <div className="flex h-report my-4 items-center justify-between gap-2">
                <div className="h-report w-8/12  border-2 rounded-xl shadow-lg border-compatible border-slate-800">
                  <h3 className="text-center  font-bold py-1 border-b-2 border-compatible bg-slate-900 text-white border-b-slate-900 rounded-xl">
                    Responses By Experts
                  </h3>
                  <div className="grid max-h-responseContainer grid-cols-2 overflow-y-scroll mt-2">
                    {responses.map((response, index) => {
                      return (
                        <SubjectBannerCard
                          key={index}
                          responseObj={response}
                          getSelectedResponse={getSelectedResponse}
                        />
                      );
                    })}
                  </div>
                </div>
                <div className=" h-report w-report border-2 rounded-xl shadow-lg border-compatible border-slate-800">
                  <p className="text-center  font-bold py-1 border-b-2 border-compatible bg-slate-900 text-white border-b-slate-900 rounded-xl">
                    Experts Control Panel
                  </p>
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
