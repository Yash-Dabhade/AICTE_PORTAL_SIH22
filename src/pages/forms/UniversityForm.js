import React, { Component } from "react";
import { saveNewUniversity } from "../../utils/dbHelper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UniversityForm(props) {
  // function ValidateEmail(email) {
  //   let regexp = /^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/;
  //   if (!regexp.test(email)) {
  //     toast("Invalid Email");
  //     return;
  //   }
  // }

  // function ValidateNumber(phone) {
  //   var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  //   if (!phone.match(phoneno)) {
  //     toast("Please Valid 10 digit phone number");
  //     return;
  //   }
  // }

  function handleSubmit(e) {
    e.preventDefault();
    let initialName = document.getElementById("universityInitialName").value;
    let name = document.getElementById("universityName").value;
    let code = document.getElementById("universityCode").value;
    let email = document.getElementById("universityEmail").value;
    let phone = document.getElementById("universityPhone").value;
    let location = document.getElementById("universityAddress").value;
    let website = document.getElementById("universityWebsite").value;
    if (
      initialName === "" ||
      name === "" ||
      code === "" ||
      email === "" ||
      phone === "" ||
      location === "" ||
      website === ""
    ) {
      toast("Enter all details");
      return;
    }

    saveNewUniversity(initialName, name, code, email, phone, location, website);
  }
  return (
    <div className="container flex justify-center items-center mt-7 darkMode">
      <div
        id="authentication-modal"
        tabIndex="-1"
        className="shadow-xl overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full justify-center items-center flex"
        aria-modal="true"
        role="dialog"
      >
        <div className="relative p-4 w-full max-w-md h-full md:h-auto">
          <div className="relative bg-white rounded-lg shadow">
            <button
              onClick={props.btnFunc}
              className="shadow-2xl absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
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
              <h3 className="mb-4 text-xl font-medium text-gray-900">
                New University Form
              </h3>

              <form className="space-y-6" action="#">
                <div>
                  <label
                    htmlFor="uniInitialName"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Initial Name :
                  </label>
                  <input
                    type="text"
                    id="universityInitialName"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                    block w-full p-2.5 dark:bg-white-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-black"
                    placeholder="Initial Name"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="newTitle"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Full Name :
                  </label>
                  <input
                    type="text"
                    id="universityName"
                    placeholder="Full Name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-black "
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="universityCode"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Code
                  </label>
                  <input
                    name="universityCode"
                    id="universityCode"
                    placeholder="university code"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-black"
                  />
                </div>
                <div>
                  <label
                    htmlFor="universityEmail"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Email
                  </label>
                  <input
                    name="universityEmail"
                    id="universityEmail"
                    placeholder="University Email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-black"
                  />
                </div>

                <div>
                  <label
                    htmlFor="universityPhone"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Phone
                  </label>
                  <input
                    id="universityPhone"
                    name="universityPhone"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-black"
                    placeholder="University Phone"
                  />
                </div>
                <div>
                  <label
                    htmlFor="universityAddress"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Address
                  </label>
                  <input
                    id="universityAddress"
                    name="universityAddress"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-white-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-black"
                    placeholder="University Phone"
                  />
                </div>

                <div>
                  <label
                    htmlFor="universityWebsite"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Website
                  </label>
                  <input
                    name="universityWebsite"
                    id="universityWebsite"
                    placeholder="University Website"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 dark:bg-white-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-black"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full btn btn-compatible border-2 border-compatible font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  onClick={handleSubmit}
                >
                  Add
                </button>
              </form>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}
