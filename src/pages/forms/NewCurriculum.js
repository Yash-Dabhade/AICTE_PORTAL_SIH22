import React, { useState } from "react";
import { saveNewCurriculum } from "../../utils/dbHelper";
import { storage, database } from "../../firebase/init-firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export default function NewCurriculum(props) {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async (title, code, level, semester) => {
    let typeRef = "curriculum_files";
    const pathRef = "curriculums";

    let storageRef = ref(storage, `${pathRef}/${typeRef}/${code}`);
    let uploadTask = uploadBytesResumable(storageRef, file);
    console.log("Uploaded");

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        progress.toPrecision(2);
        // document.getElementById(
        //   "UploadButton"
        // ).innerHTML = `Uploading... ${parseInt(progress)}%`;
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
        alert("Some error occured ! Please try again");
      },
      () => {
        document.getElementById("UploadButton").innerHTML = `Submitting...`;
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          //set download url here
          saveNewCurriculum(
            props.instituteCode,
            props.courseCode,
            props.departmentCode,
            title,
            code,
            semester,
            "",
            downloadURL
          );
        });
      }
    );
  };

  function handleSubmit() {
    let title = document.getElementById("newTitle").value;
    let code = document.getElementById("courseCode").value;
    let level = document.getElementById("level").value;
    let semester = document.getElementById("semester").value;
    console.log("Button Wasa click");
    if (
      title.length === 0 ||
      code.length === 0 ||
      level.length === 0 ||
      semester.length === 0 ||
      !file
    ) {
      alert("cannot Set Empty");
    } else {
      document.getElementById("submitBtn").innerHTML = "Submitting...";
      handleUpload(title, code, level, semester);
    }
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
                    htmlFor="newTitle"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-black-900"
                  >
                    Name / Title
                  </label>
                  <input
                    type="newTitle"
                    name="newTitle"
                    id="newTitle"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-black-100 dark:border-gray-500 dark:placeholder-gray-400 dark:text-black"
                    placeholder="Electronics, MIC"
                    required=""
                  />
                </div>

                <div>
                  <label
                    htmlFor="courseCode"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-black-900"
                  >
                    Code
                  </label>
                  <input
                    name="courseCode"
                    id="courseCode"
                    placeholder="22617, 22619"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-black"
                  />
                </div>

                <div className="mt-6">
                  <label className="">Semester</label>
                  <select
                    className="ml-36"
                    name="level"
                    id="level"
                    value="Select Level"
                  >
                    <option value="diploma">Diploma</option>
                    <option value="degree">Degree</option>
                    <option value="master">Master</option>
                    <option value="phd">Phd</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* <div className="mt-6">
                  <label className="">Tags</label>
                  <select
                    className="ml-44"
                    name="level"
                    id="level"
                    value="Select Level"
                  >
                    <option value="diploma">Web</option>
                    <option value="degree"></option>
                    <option value="master">Master</option>
                    <option value="phd">Phd</option>
                    <option value="other">Other</option>
                  </select>
                </div> */}

                <input
                  type="file"
                  name=""
                  onChange={handleFileChange}
                  id="imgFile"
                />

                <button
                  type="submit"
                  id="submitBtn"
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
