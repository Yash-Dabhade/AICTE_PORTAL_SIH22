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
      tagValue,
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
    <div className="py-6 px-6 lg:px-8 overflow-y-scroll">
      <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-black">
        New Trending Subject Form
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black-900">
            Title :
          </label>
          <input
            type="text"
            id="Title"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-4/5 p-2.5 dark:bg-black-100 dark:border-gray-500 dark:placeholder-gray-400 dark:text-black"
            placeholder="Title of the subject"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black-900">
            Market Capture :{" "}
          </label>
          <input
            type="text"
            id="mcapture"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-4/5 p-2.5 dark:bg-black-100 dark:border-gray-500 dark:placeholder-gray-400 dark:text-black"
            placeholder="60%"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black-900">
            Prerequisistes :{" "}
          </label>
          <input
            type="text"
            id="preq"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-4/5 p-2.5 dark:bg-black-100 dark:border-gray-500 dark:placeholder-gray-400 dark:text-black"
            placeholder="Javascript"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black-900">
            Companies Using :{" "}
          </label>
          <input
            type="text"
            id="Company"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-4/5 p-2.5 dark:bg-black-100 dark:border-gray-500 dark:placeholder-gray-400 dark:text-black"
            placeholder="Companies Name"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black-900">
            No. of Projects :{" "}
          </label>
          <input
            type="text"
            id="project"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-4/5 p-2.5 dark:bg-black-100 dark:border-gray-500 dark:placeholder-gray-400 dark:text-black"
            placeholder="High"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black-900">
            Must Do Concepts :{" "}
          </label>
          <input
            type="text"
            id="concept"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-4/5 p-2.5 dark:bg-black-100 dark:border-gray-500 dark:placeholder-gray-400 dark:text-black"
            placeholder="List the Concepts"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black-900">
            Reference :{" "}
          </label>
          <input
            type="text"
            id="reference"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-4/5 p-2.5 dark:bg-black-100 dark:border-gray-500 dark:placeholder-gray-400 dark:text-black"
            placeholder="blog links, books"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black-900">
            Category / Tag :{" "}
          </label>
          <select
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-4/5 p-2.5 dark:bg-black-100 dark:border-gray-500 dark:placeholder-gray-400 dark:text-black"
            name="tag"
            id="tag"
            value={tagValue}
            onChange={handleTagChange}
          >
            <option value="">Select a tag</option>
            {tags.map((tag, index) => {
              return (
                <option key={index} value={tag}>
                  {tag}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black-900">
            Select Level :{" "}
          </label>
          <select
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-4/5 p-2.5 dark:bg-black-100 dark:border-gray-500 dark:placeholder-gray-400 dark:text-black"
            name="level"
            id="level"
          >
            <option value="Diploma">Diploma</option>
            <option value="Degree">Degree</option>
            <option value="Master">Master</option>
            <option value="Phd">Phd</option>
            <option value="Other">Other</option>
          </select>{" "}
          <br />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black-900">
            Author :
          </label>
          <input
            type="text"
            id="author"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-4/5 p-2.5 dark:bg-black-100 dark:border-gray-500 dark:placeholder-gray-400 dark:text-black"
            placeholder="author"
          />
        </div>
      </div>
      <div className="flex justify-center items-center w-full px-5 py-2.5">
        <button
          onClick={handleSubmit}
          className="w-3/6 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center btn btn-compatible border-2 border-compatible"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
