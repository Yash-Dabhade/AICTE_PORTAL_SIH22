import React from "react";
import { saveNewInstituteLevelCourse } from "../../utils/dbHelper";

export default function InstituteCourses(props) {
  const [level, setLevel] = React.useState("Select Level");
  const handleSelectChange = (e) => {
    setLevel(e.value);
  };

  function handleSubmit() {
    let title = document.getElementById("courseTitle").value;
    let code = document.getElementById("courseCode").value;
    let level = document.getElementById("courseLevel").value;
    if (title.length === 0 || code.length === 0 || level.length === 0) {
      alert("cannot Set Empty");
    } else {
      console.log(props.instituteCode, title, code, level);
      saveNewInstituteLevelCourse(props.instituteCode, title, code, level);
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
          <div className="relative bg-white rounded-lg shadow ">
            <button
              type="button"
              className=" shadow-2xl absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
              data-modal-toggle="authentication-modal"
              onClick={props.btnFunc}
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
              <span className="sr-only">Close modal</span>
            </button>
            <div className="py-6 px-6 lg:px-8">
              <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-black">
                Add Courses
              </h3>

              <form className="space-y-6" action="#">
                <div>
                  <label
                    htmlFor="addCourse"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-black-900"
                  >
                    Title*
                  </label>
                  <input
                    type="addCourse"
                    name="addCourse"
                    id="courseTitle"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-black-100 dark:border-gray-500 dark:placeholder-gray-400 dark:text-black"
                    placeholder="Electronics, MIC"
                    required=""
                  />
                </div>

                <div>
                  <label
                    htmlFor="courceCode"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-black-900"
                  >
                    Code*
                  </label>
                  <input
                    name="courceCode"
                    id="courseCode"
                    placeholder="22617, 22619"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-black"
                  />
                </div>

                <div className="mt-6 ">
                  <label className="">Select Level*</label>
                  <select
                    className="ml-36"
                    name="level"
                    id="courseLevel"
                    value={level}
                    onChange={(e) => {
                      handleSelectChange(e);
                    }}
                  >
                    <option value="Diploma">Diploma</option>
                    <option value="Degree">Degree</option>
                    <option value="Master">Master</option>
                    <option value="Phd">Phd</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full font-medium rounded-lg text-sm px-5 py-2.5 text-center btn btn-compatible border-2 border-compatible"
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
