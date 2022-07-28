import React, { useState } from "react";
// import { saveNewCurriculum } from "../../utils/dbHelper";
import { ref as dbref, set, update, child, get, push } from "firebase/database";
import { storage, database } from "../../firebase/init-firebase";

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export default function NewCurriculum(props) {
  const [file, setFile] = useState(null);

  const [tagValue, setTagValue] = useState("basic");
  const handleTagChange = (e) => {
    setTagValue(e);
  };
  const [semValue, setSemValue] = useState("1");
  const handleSemChange = (e) => {
    setSemValue(e);
  };
  const [levelValue, setLevelValue] = useState("basic");
  const handleLevelChange = (e) => {
    setLevelValue(e);
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  function handleSubmit() {
    console.log("HandleSubmit");
    let title = document.getElementById("currTitle").value;
    let code = document.getElementById("currCode").value;
    let level = levelValue;
    let semester = semValue;
    let tag = tagValue;
    if (title.length === 0 || code.length === 0 || !file) {
      alert("cannot Set Empty");
    } else {
      document.getElementById("submitBtn").innerHTML = "Submitting...";
      console.log("handleUpload called");
      handleUpload(title, code, level, semester, tag);
    }
  }

  const handleUpload = async (title, code, level, semester, tag) => {
    let typeRef = "curriculum_files";
    const pathRef = "curriculums";

    let storageRef = ref(storage, `${pathRef}/${typeRef}/${code}`);
    let uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        alert("Uploding");
      },
      () => {
        alert("Downloading");
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          alert("Calling saveNewCurriculum");
          saveNewCurriculum(
            props.instituteCode,
            props.courseCode,
            props.departmentCode,
            title,
            code,
            level,
            semester,
            tag,
            downloadURL
          );
        });
      }
    );
  };

  const saveNewCurriculum = (
    instituteCode,
    courseCode,
    departmentCode,
    title,
    code,
    level,
    semester,
    tag,
    fileUrl
  ) => {
    document.getElementById("submitBtn").innerHTML = "Finishing Up!";
    console.log(instituteCode, courseCode, departmentCode);

    const curriculum = {
      title: title,
      code: code,
      level: level,
      semester: semester,
      tag: tag,
      instituteCode: instituteCode,
      fileUrl: fileUrl,
      instituteCode: instituteCode,
      courseCode: courseCode,
      departmentCode: departmentCode,
    };

    writeCurriculum(curriculum);
  };

  function writeCurriculum(curriculum) {
    const db = database;
    const curriculumRef = dbref(db, "/curriculumDetails/");
    //getting new reference
    const newRef = push(curriculumRef);

    set(newRef, {
      title: curriculum.title,
      code: curriculum.code,
      level: curriculum.level,
      semester: curriculum.semester,
      tag: curriculum.tag,
      fileUrl: curriculum.fileUrl,
    });
    setLocation(
      newRef,
      curriculum.instituteCode,
      curriculum.courseCode,
      curriculum.departmentCode
    );
  }

  function setLocation(newRef, instituteCode, courseCode, departmentCode) {
    console.log("Setting Location");
    const db = database;
    set(
      dbref(
        db,
        `/institutesDetail/${instituteCode}/courses/${courseCode}/departments/${departmentCode}/curriculum/`
      ),
      {
        curriculumId: String(newRef),
      }
    )
      .then((snapshot) => {
        console.log("Success");
        // window.location.href = "/";
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  }

  return (
    <div>
      <div
        id="authentication-modal"
        tabIndex="-1"
        className=" shadow-xl overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full justify-center items-center flex"
        aria-modal="true"
        role="dialog"
      >
        <div className="relative p-4 w-full max-w-md h-full md:h-auto">
          <div className="relative bg-white rounded-lg shadow dark:bg-white-200">
            <button
              type="button"
              onClick={props.btnFunc}
              className=" shadow-2xl absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
              data-modal-toggle="authentication-modal"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
            <div className="py-6 px-6 lg:px-8">
              <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-black">
                Curriculum Form
              </h3>

              <form className="space-y-6" action="#">
                <div>
                  <label
                    htmlFor="currTitle"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-black-900"
                  >
                    Name / Title
                  </label>
                  <input
                    type="currTitle"
                    name="currTitle"
                    id="currTitle"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-black-100 dark:border-gray-500 dark:placeholder-gray-400 dark:text-black"
                    placeholder="Electronics, MIC"
                    required=""
                  />
                </div>

                <div>
                  <label
                    htmlFor="currCode"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-black-900"
                  >
                    Code
                  </label>
                  <input
                    name="currCode"
                    id="currCode"
                    placeholder="22617, 22619"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-black"
                  />
                </div>

                <div className="mt-6">
                  <label className="currSemester">Semester</label>
                  <select
                    className="ml-36"
                    name="currSem"
                    id="currSem"
                    value={semValue}
                    onChange={(e) => {
                      handleSemChange(e.target.value);
                    }}
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                  </select>
                </div>

                <div className="mt-6">
                  <label className="currTag">Tag</label>
                  <select
                    className="ml-44"
                    name="currTag"
                    id="currTag"
                    value={tagValue}
                    onChange={(e) => {
                      handleTagChange(e.target.value);
                    }}
                  >
                    {props.tags.map((ele, index) => {
                      return (
                        <option value={ele.value} key={index}>
                          {ele.name}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div className="mt-6">
                  <label className="currLevel">Level</label>
                  <select
                    className="ml-44"
                    name="currLevel"
                    id="currLevel"
                    value={levelValue}
                    onChange={(e) => {
                      handleLevelChange(e.target.value);
                    }}
                  >
                    <option value="basic">Basic</option>
                    <option value="Moderate">Moderate</option>
                    <option value="Difficult">Difficult</option>
                  </select>
                </div>

                <input
                  type="file"
                  name=""
                  onChange={handleFileChange}
                  id="imgFile"
                />

                <button
                  type="submit"
                  id="submitBtn"
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 btn-compatible"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
