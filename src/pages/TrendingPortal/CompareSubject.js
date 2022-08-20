import React, { useState, useEffect } from "react";
import { BiHelpCircle } from "react-icons/bi";
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
import GridLoader from "react-spinners/GridLoader";
import { IoSaveSharp } from "react-icons/io5";
import { IoIosRemoveCircle } from "react-icons/io";
import { FaShare } from "react-icons/fa";
import { publishReport, saveReport } from "../../utils/dbHelper";

function CompareSubject({ responseObj }) {
  const [curriculum, setCurriculum] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [dataFound, setDataFound] = useState(false);
  const [infoMessage, setInfoMessage] = useState(true);
  const [prerequisiteSem, setPrerequisiteSem] = useState(-1);
  const [titleSem, setTitleSem] = useState(-1);
  const [calculatedResults, setCalculatedResults] = useState(false);
  const [subjectToBeReplaced, setSubjectToBeReplaced] = useState(null);
  const [curriculumsByTag, setCurriculumsByTag] = useState([]);

  function getCurriculumFromRef(reference) {
    const db = dbref(database);
    let allData = new Array();
    let filterByTag = new Array();
    get(child(db, "/curriculumDetails/" + reference + "/"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          let data = snapshot.val();
          Object.keys(data).forEach((key) => {
            allData.push(data[key]);
            if (data[key].tag.trim() == responseObj.tag.trim())
              filterByTag.push(data[key]);
          });
          setCurriculum(allData);
          setCurriculumsByTag(filterByTag);
          setMessage("Curriculum fetched, Click on Above Button");
          setLoading(false);
          setCalculatedResults(false);
          setDataFound(true);
        } else {
          setLoading(false);
          setCalculatedResults(false);
          setDataFound(false);
          setMessage("Unable to find curriculum from given ID !");
          setInfoMessage(true);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log("I am running " + err);
        setInfoMessage(true);
        setCalculatedResults(false);
        setMessage("Unable to find curriculum from given ID !");
      });
  }

  function checkIfAlreadyExisit(title) {
    //return true or false based on the
    let subject = new String(title).toLowerCase();
    if (curriculum) {
      for (let i = 0; i < curriculum.length; i++) {
        if (new String(curriculum[i].title).toLowerCase().includes(subject)) {
          setTitleSem(curriculum[i].semester);
          return true;
        }
      }
    }
    return false;
  }

  function searchPrerequisitesSem(prerequisite) {
    //return -1 if not found, else return the semeter number where it is found
    let subject = new String(prerequisite).toLowerCase();
    if (curriculum) {
      for (let i = 0; i < curriculum.length; i++) {
        let curriculumSub = curriculum[i].title.toLowerCase();
        if (curriculumSub.includes(subject)) {
          setPrerequisiteSem(curriculum[i].semester);
          return curriculum[i].semester;
        }
      }
    }
    return -1;
  }

  function searchReplaceableBySem(semester) {
    if (curriculumsByTag) {
      curriculumsByTag.forEach((ele) => {
        if (ele.semester == ++semester) setSubjectToBeReplaced(ele.title);
      });
      console.log(subjectToBeReplaced);
    } else {
      setSubjectToBeReplaced(null);
    }
  }

  function compute() {
    //check if curriculum already exisits
    //pass report subject title
    setDataFound(false);
    setLoading(true);
    if (checkIfAlreadyExisit(responseObj.title)) {
      //show modal
      setMessage(responseObj.title + " already exists in the curriculum ! ");
    } else {
      //search for prerequisites and return if prerequisites present in which sem
      let prerequisitesInSem = searchPrerequisitesSem(responseObj.prereq);
      if (prerequisitesInSem == -1) {
        setMessage(
          `${responseObj.title} not found and it's prerequisite ${responseObj.prereq} also not present !`
        );
      } else {
        let limit = 0;
        if (curriculum.totalSems) limit = curriculum.totalSems;
        else limit = 6;
        if (prerequisitesInSem == limit) {
          searchReplaceableBySem(prerequisitesInSem);
          // message = Shift preqruisite in prerequisitesInSem-1 and suggest to put props.title in prerequisitiesInSem
          setMessage(
            `${responseObj.title} not found ! shift ${responseObj.prereq} to ${
              prerequisitesInSem - 1
            } semester and Add ${
              responseObj.title
            } in ${prerequisitesInSem} semester. `
          );
        } else {
          // message =  suggest to put props.title in prerequisitiesInSem + 1
          searchReplaceableBySem(prerequisitesInSem);
          setMessage(
            `${responseObj.title} not found ! 
           Add ${responseObj.title} in ` +
              new Number(++prerequisitesInSem) +
              ` semester which is right after it's prerequsite ${
                responseObj.prereq
              } in ${--prerequisitesInSem} semester.`
          );
        }
      }
    }
    setInfoMessage(false);
    setCalculatedResults(true);
    setLoading(false);
  }

  function handleCompareCurriculum() {
    let id = document.getElementById("curriculumIdInput").value;
    if (!id) {
      setMessage("Invalid Curriculum ID");
      setCalculatedResults(false);
      setInfoMessage(true);
    } else {
      setLoading(true);
      getCurriculumFromRef(id);
    }
  }

  function handleSaveReport() {
    saveReport(responseObj);
  }

  function discardReport() {
    // setCalculatedResults(false);
    setCalculatedResults(false);
    setDataFound(false);
    setMessage("Report Discarded !");
    setInfoMessage(true);
  }

  function handlePublishReport() {
    publishReport(responseObj);
  }

  return (
    <div className="flex flex-col gap-4 darkMode">
      <div className="flex items-center justify-between w-full h-16">
        <div className="flex h-16 gap-1 items-center justify-start">
          <h4 className="font-bold m-3  ">
            Enter Curriculum ID to be compared :{" "}
          </h4>
          <input
            id="curriculumIdInput"
            className="px-8 border border-slate-700 rounded-lg p-2 shadow-lg  font-semibold border-compatible text-sm"
            type={"text"}
            placeholder="Paste Curriculum ID..."
          />
          <BiHelpCircle className="mx-2 cursor-pointer" size="30px" />
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={handleCompareCurriculum}
            className="font-medium  border m-2 bg-slate-800 text-white border-slate-700 p-2 shadow-lg rounded-xl border-compatible hover:bg-slate-500"
          >
            Get Curriculum
          </button>
        </div>
      </div>

      <div className="border border-slate-500 rounded-xl shadow-2xl w-full h-DetailContainer">
        <h2 className="font-bold font-serif text-xl border-b border-b-gray-600  p-4">
          Comparison Details Of{" "}
          {responseObj ? responseObj.title : "Subject To Be Compared"}
        </h2>
        {loading ? (
          <div className="flex h-4/5 items-center justify-center">
            <GridLoader size={20} margin={2} loading={loading} />
          </div>
        ) : (
          <div
            id="resultContainer"
            className="flex flex-col h-4/5 items-center justify-center"
          >
            <div className="flex flex-col  items-center justify-center">
              {dataFound && (
                <button
                  id="compareCurriculumBtn"
                  onClick={compute}
                  className="font-medium btn-compatible border m-2 bg-slate-800 text-white border-slate-700 p-2 shadow-lg rounded-xl border-compatible hover:bg-slate-500"
                >
                  Compare Curriculum
                </button>
              )}
              {infoMessage && <p className=" font-mono">{message}</p>}
            </div>
            {calculatedResults && (
              <div className="flex flex-col items-center w-full">
                <div className="flex items-center justify-between m-1 gap-2 border-b-slate-700 border-b w-full">
                  <table className="w-full mx-2 my-1 h-1/3 border text-left">
                    <thead className="border-b ">
                      <tr>
                        <th
                          scope="col"
                          className="text-sm font-medium px-3 py-4 border-r"
                        >
                          No.
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium  px-6 py-4 border-r"
                        >
                          Check
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium  px-6 py-4 border-r"
                        >
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium  border-r">
                          1
                        </td>
                        <td className="text-sm  font-bold px-6 py-4 whitespace-nowrap border-r">
                          SUBJECT PRESENT
                        </td>
                        <td className="text-sm  font-light px-6 py-4 whitespace-nowrap border-r">
                          {titleSem == -1 ? (
                            <span className="font-semibold text-red-600">
                              ABSENT
                            </span>
                          ) : (
                            <span className="font-semibold text-green-600">
                              PRESENT IN SEM {titleSem}
                            </span>
                          )}
                        </td>
                      </tr>

                      <tr className="border-b">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium border-r">
                          2
                        </td>
                        <td className="text-sm font-bold  px-6 py-4 whitespace-nowrap border-r">
                          PREREQUISITE PRESENT
                        </td>
                        <td className="text-sm  font-light px-6 py-4 whitespace-nowrap border-r">
                          {prerequisiteSem == -1 ? (
                            <span className="font-semibold text-red-600">
                              ABSENT
                            </span>
                          ) : (
                            <span className="font-semibold text-green-600">
                              PRESENT IN SEM {prerequisiteSem}
                            </span>
                          )}
                        </td>
                      </tr>

                      <tr className="border-b">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium border-r">
                          3
                        </td>
                        <td className="text-sm font-bold px-6 py-4 whitespace-nowrap border-r">
                          SUBJECT TO BE REPLACED
                        </td>
                        <td className="text-sm font-light px-6 py-4 whitespace-nowrap border-r">
                          {!subjectToBeReplaced ? (
                            <span className="font-semibold text-red-600">
                              NOT FOUND
                            </span>
                          ) : (
                            <span className="font-semibold text-green-600">
                              {subjectToBeReplaced}
                            </span>
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="flex gap-2  flex-col w-report">
                    <button
                      onClick={handleSaveReport}
                      className="font-medium flex items-center justify-center m-2 border gap-2 bg-slate-900 text-white border-gray-700 p-2 shadow-lg rounded-xl border-compatible hover:bg-white hover:text-slate-800"
                    >
                      <IoSaveSharp className="mx-1" size="24px" />
                      Save Report
                    </button>
                    <button
                      onClick={discardReport}
                      className="font-medium flex items-center justify-center m-1 border gap-1 bg-slate-900 text-white border-gray-700 p-2 shadow-lg rounded-xl border-compatible hover:bg-white hover:text-slate-800"
                    >
                      <IoIosRemoveCircle className="mx-2" size="24px" />
                      Discard Report
                    </button>
                    <button
                      onClick={handlePublishReport}
                      className="font-medium flex items-center justify-center m-2 border gap-2 bg-slate-900 text-white border-gray-700 p-2 shadow-lg rounded-xl border-compatible hover:bg-white hover:text-slate-800"
                    >
                      <FaShare className="mx-2" size="24px" />
                      Publish Report
                    </button>
                  </div>
                </div>
                <div className="flex items-center mt-5 justify-center ">
                  <p className="text-green-700 font-bold text-md font-sans">
                    {message}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default CompareSubject;
