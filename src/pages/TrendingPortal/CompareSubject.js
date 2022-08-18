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

function CompareSubject({ responseObj }) {
  const [curriculum, setCurriculum] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [dataFound, setDataFound] = useState(false);

  function getCurriculumFromRef(reference) {
    const db = dbref(database);
    let allData = new Array();
    get(child(db, "/curriculumDetails/" + reference + "/"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          let data = snapshot.val();
          Object.keys(data).forEach((key) => {
            allData.push(data[key]);
          });
          setCurriculum(allData);
          setMessage("Data found Click on the button to compare");
          setLoading(false);
          setDataFound(true);
        } else {
          setLoading(false);
          setMessage("Unable to find curriculum from given ID !");
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log("I am running " + err);
        setMessage("Unable to find curriculum from given ID !");
      });
  }

  function checkIfAlreadyExisit(title) {
    //return true or false based on the
    let subject = new String(title).toLowerCase();
    if (curriculum) {
      for (let i = 0; i < curriculum.length; i++) {
        if (new String(curriculum[i].title).toLowerCase().includes(subject)) {
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
          return curriculum[i].semester;
        }
      }
    }
    return -1;
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
          // message = Shift preqruisite in prerequisitesInSem-1 and suggest to put props.title in prerequisitiesInSem
          setMessage(
            `${responseObj.title} not found ! shift ${responseObj.prereq} to ${
              prerequisitesInSem - 1
            } semester and add ${
              responseObj.title
            } in ${prerequisitesInSem} semester. `
          );
        } else {
          // message =  suggest to put props.title in prerequisitiesInSem + 1
          setMessage(
            `${responseObj.title} not found ! 
           add ${responseObj.title} in ` +
              new Number(++prerequisitesInSem) +
              ` semester which is right after it's prerequsite ${
                responseObj.prereq
              } lies in ${--prerequisitesInSem}`
          );
        }
      }
    }
    setLoading(false);
  }

  function handleCompareCurriculum() {
    let id = document.getElementById("curriculumIdInput").value;
    if (!id) setMessage("Invalid ID");
    else {
      setLoading(true);
      getCurriculumFromRef(id);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between w-full h-16">
        <div className="flex h-16 gap-1 items-center justify-start">
          <h4 className="font-bold m-3  text-slate-900">
            Enter Curriculum ID to be compared :{" "}
          </h4>
          <input
            id="curriculumIdInput"
            className="px-8 border border-slate-700 rounded-lg p-2 shadow-lg font-semibold text-black text-sm"
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

      <div className="border border-slate-500 rounded-xl shadow-2xl w-full h-report">
        <h2 className="font-bold font-serif text-xl border-b border-b-gray-600 text-slate-800 p-4">
          Comparison Details Of{" "}
          {responseObj ? responseObj.title : "Subject To Be Compared"}
        </h2>
        {loading ? (
          <div className="flex h-4/5 items-center justify-center">
            <GridLoader size={20} margin={2} loading={loading} />
          </div>
        ) : (
          <div className="flex flex-col h-4/5 items-center justify-center">
            {dataFound && (
              <button
                id="compareCurriculumBtn"
                onClick={compute}
                className="font-medium  border m-2 bg-slate-800 text-white border-slate-700 p-2 shadow-lg rounded-xl border-compatible hover:bg-slate-500"
              >
                Compare Curriculum
              </button>
            )}
            <h4 className="text-slate-700 font-mono">{message}</h4>
          </div>
        )}
      </div>
    </div>
  );
}

export default CompareSubject;
