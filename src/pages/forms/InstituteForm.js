import React from "react";
import { saveNewInstitute } from "../../utils/dbHelper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function InstituteForm(props) {
  function ValidateEmail(email) {
    let regexp = /^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/;
    if (!regexp.test(email)) {
      toast("Invalid Email");
      return;
    }
  }

  function ValidateNumber(phone) {
    var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (!phone.match(phoneno)) {
      toast("Please Valid 10 digit phone number");
      return;
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    let name = document.getElementById("instituteName").value;
    let code = document.getElementById("instituteCode").value;
    let email = document.getElementById("instituteEmail").value;
    let phone = document.getElementById("institutePhone").value;
    let location = document.getElementById("instituteLocation").value;
    let website = document.getElementById("instituteWebsite").value;
    if (
      location == "" ||
      name == "" ||
      code == "" ||
      email == "" ||
      phone == "" ||
      website == ""
    ) {
      toast("Enter all details");
      return;
    }
    saveNewInstitute(
      props.universityCode,
      name,
      code,
      email,
      phone,
      location,
      website
    );
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
            </button>
            <div className="py-6 px-6 lg:px-8">
              <h3 className="mb-4 text-xl font-medium text-gray-900">
                New Institue Form
              </h3>
              <form className="space-y-6" action="#">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Name :
                  </label>
                  <input
                    type="text"
                    id="instituteName"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5
                    dark:bg-white-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-black"
                    placeholder="Institute Name"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Email :{" "}
                  </label>
                  <input
                    type="email"
                    id="instituteEmail"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                    block w-full p-2.5
                    dark:bg-white-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-black
                  "
                    placeholder="example123@gmail.com"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Institue Code :{" "}
                  </label>
                  <input
                    type="text"
                    id="instituteCode"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                    block w-full p-2.5
                    dark:bg-white-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-black
                  "
                    placeholder="example : 0129"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Phone :{" "}
                  </label>
                  <input
                    type="text"
                    id="institutePhone"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                    block w-full p-2.5
                    dark:bg-white-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-black
                  "
                    placeholder="+91 1234567890"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Location :{" "}
                  </label>
                  <input
                    type="text"
                    id="instituteLocation"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5
                    dark:bg-white-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-black "
                    placeholder="Region ,City ,State  "
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Website :{" "}
                  </label>
                  <input
                    type="text"
                    id="instituteWebsite"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5
                    dark:bg-white-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-black"
                    placeholder="www.website.com"
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  className="w-full text-white
                btn btn-compatible
                border-2 border-compatible font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default InstituteForm;
