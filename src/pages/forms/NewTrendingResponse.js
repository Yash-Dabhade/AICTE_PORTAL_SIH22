import React, { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { saveNewTrendingResponse } from "../../utils/dbHelper";
import { ref as dbref, child, get } from "firebase/database";
import { database } from "../../firebase/init-firebase";

export default function NewTrendingResponse({ reportID }) {
  const [tags, setTags] = useState([]);
  const [tagValue, setTagValue] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    let title = document.getElementById("Title").value;
    let mcapture = document.getElementById("mcapture").value;
    let prereq = document.getElementById("preq").value;
    let company = document.getElementById("Company").value;
    let project = document.getElementById("project").value;
    let concept = document.getElementById("concept").value;
    let reference = document.getElementById("reference").value;
    let level = document.getElementById("level").value;
    let author = document.getElementById("author").value;
    console.log(reportID);
    saveNewTrendingResponse(
      reportID,
      title,
      mcapture,
      prereq,
      company,
      project,
      concept,
      reference,
      level,
      author
    );
  }

  function getAllTags() {
    const db = dbref(database);
    get(child(db, `/tags/`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          let data = snapshot.val();
          let allData = new Array();
          Object.keys(data).forEach((key) => {
            allData.push(key);
          });
          // setState
          setTags(allData);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function handleTagChange(e) {
    setTagValue(e.target.value);
  }

  useEffect(() => {
    getAllTags();
    return () => {};
  }, []);

  return (
    <div className="container darkMode flex flex-col content-center justify-center mt-5 items-center">
      <button className="CROSS-ICON absolute top-0 right-0 px-8 py-8 darkMode">
        <svg
          className="h-8 w-8"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
      <div className="content flex-col overflow-y-auto">
        <div className="title flex justify-center mb-5 ">
          <label className="m-5 text-4xl">New Trending Subject Form</label>
        </div>

        <div className=" form-body overflow-y-auto h-[28rem] m-5">
          <form className="form w-fit px-10 pb-5 pt-3 rounded-md overflow-y-auto">
            <div className="cont flex-col m-3 ">
              <label className="flex ml-3">Title : </label>
              <input
                type="text"
                id="Title"
                className="title border-2 border-[#9a9a9a] rounded-md w-96 h-8 ml-3 pl-3"
                placeholder="Title"
              />
            </div>

            <div className="cont3 flex-col m-3  ">
              <label className="flex ml-3 mt-5">Market Capture : </label>
              <input
                type="text"
                id="mcapture"
                className="mcapture border-2 border-[#9a9a9a] rounded-md w-96 h-8 ml-3 pl-3"
                placeholder=""
              />
            </div>
            <div className="cont4 flex-col align-middle m-3  ">
              <label className="flex ml-3 mt-5">Prerequisistes : </label>
              <input
                type="text"
                id="preq"
                className="preq border-2 border-[#9a9a9a] rounded-md w-96 h-8 ml-3 pl-3"
                placeholder=""
              />
            </div>
            <div className="cont flex-col m-3 ">
              <label className="flex ml-3 mt-5">Companies Using : </label>
              <input
                type="text"
                id="Company"
                className="Company border-2 border-[#9a9a9a] rounded-md w-96 h-8 ml-3 pl-3"
                placeholder="Companies Name"
              />
            </div>
            <div className="cont flex-col m-3 ">
              <label className="flex ml-3 mt-5">No. of Projects : </label>
              <input
                type="text"
                id="project"
                className="project border-2 border-[#9a9a9a] rounded-md w-96 h-8 ml-3 pl-3"
                placeholder=""
              />
            </div>
            <div className="cont flex-col m-3 ">
              <label className="flex ml-3 mt-5">Must Do Concepts : </label>
              <input
                type="text"
                id="concept"
                className="concept border-2 border-[#9a9a9a] rounded-md w-96 h-8 ml-3 pl-3"
                placeholder="List the Concepts"
              />
            </div>
            <div className="cont flex-col m-3 ">
              <label className="flex ml-3 mt-5">Reference : </label>
              <input
                type="text"
                id="reference"
                className="reference border-2 border-[#9a9a9a] rounded-md w-96 h-8 ml-3 pl-3"
                placeholder="reference"
              />
            </div>
            <div className="cont flex-col m-3 ">
              <label className="label6 flex ml-3 mt-5">Category / Tag : </label>
              <select
                className="ml-32 mt-5"
                name="level"
                id="level"
                value={tagValue}
                onChange={handleTagChange}
              >
                {tags.map((tag, index) => {
                  return (
                    <option key={index} value={tag}>
                      {tag}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="cont flex-col m-3 ">
              <label className="mt-5 ml-3">Select Level : </label>
              <select className="ml-32 mt-5" name="level" id="level">
                <option value="Diploma">Diploma</option>
                <option value="Degree">Degree</option>
                <option value="Master">Master</option>
                <option value="Phd">Phd</option>
                <option value="Other">Other</option>
              </select>{" "}
              <br />
              <label className="flex mt-3 ml-3">Author :</label>
              <input
                type="text"
                id="author"
                className="author border-2 border-[#9a9a9a] rounded-md w-96 h-8 ml-3 pl-3"
                placeholder="author"
              />
            </div>
            <div className="cont5 justify-center flex m-3 ">
              <button
                onClick={handleSubmit}
                className="submit text-white border-2  border-[#2d84e7c9] py-1 px-10 w-96 h-12 mt-5 text-center rounded-lg bg-[#2d8cff] "
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
