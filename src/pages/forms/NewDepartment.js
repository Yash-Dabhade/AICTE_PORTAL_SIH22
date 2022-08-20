import React from "react";
import { saveNewDepartment } from "../../utils/dbHelper";

export default function NewDepartment(props) {
  function handleSubmit() {
    let title = document.getElementById("deptTitle").value;
    let code = document.getElementById("deptCode").value;
    let desc = document.getElementById("deptDesc").value;
    let totalSems = document.getElementById("totalSems").value;
    let shortInitials = document.getElementById("deptShortInitials").value;

    if (
      title.length === 0 ||
      code.length === 0 ||
      desc.length === 0 ||
      totalSems.length === 0 ||
      shortInitials.length === 0
    ) {
      alert("Invalid data");
    } else {
      saveNewDepartment(
        props.instituteCode,
        props.courseCode,
        title,
        code,
        desc,
        totalSems,
        shortInitials
      );
    }
  }

  return (
    <div>
      <div
        id="authentication-modal"
        tabIndex="-1"
        className="shadow-xl overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full justify-center items-center flex"
        aria-modal="true"
        role="dialog"
      >
        <div className="relative p-4 w-full max-w-md h-full md:h-auto">
          <div className="relative bg-white rounded-lg shadow dark:bg-white-200">
            <button
              onClick={props.btnFunc}
              type="button"
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
              <span className="sr-only">Close modal</span>
            </button>
            <div className="py-6 px-6 lg:px-8">
              <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-black">
                Department Form
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
                    type="text"
                    name="newTitle"
                    id="deptTitle"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-black-100 dark:border-gray-500 dark:placeholder-gray-400 dark:text-black"
                    placeholder="Electronics, MIC"
                    required=""
                  />
                </div>

                <div>
                  <label
                    htmlFor="deptCode"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-black-900"
                  >
                    Code
                  </label>
                  <input
                    name="deptCode"
                    id="deptCode"
                    placeholder="22617, 22619"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-black"
                  />
                </div>
                <div>
                  <label
                    htmlFor="totalSems"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-black-900"
                  >
                    Total Semesters
                  </label>
                  <input
                    name="totalSems"
                    id="totalSems"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-black"
                  />
                </div>

                <div>
                  <label
                    htmlFor="shortInitials"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-black-900"
                  >
                    Description
                  </label>
                  <textarea
                    id="deptDesc"
                    rows="4"
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Your message..."
                  ></textarea>
                </div>

                <div>
                  <label
                    htmlFor="shortInitials"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-black-900"
                  >
                    Short Initials
                  </label>
                  <input
                    name="shortInitials"
                    id="deptShortInitials"
                    placeholder="Type .."
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-black"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center btn btn-compatible border-2 border-compatible"
                  onClick={handleSubmit}
                >
                  Add
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
