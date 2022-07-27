import React from "react";
import { saveNewInstitute } from "../../utils/dbHelper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function InstituteForm(props) {
  function handleSubmit(e) {
    e.preventDefault();

    let name = document.getElementById("instituteName").value;
    let code = document.getElementById("instituteCode").value;
    let email = document.getElementById("instituteEmail").value;
    let phone = document.getElementById("institutePhone").value;
    let location = document.getElementById("instituteLocation").value;
    let website = document.getElementById("instituteWebsite").value;

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
    <div className="container flex justify-center items-center mt-7">
      <button
        className="CROSS-ICON absolute top-0 right-0 px-8 py-8 darkMode"
        onClick={props.btnFunc}
      >
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
      <div className="content flex-col">
        <div className="title flex justify-center mb-10 ">
          <label className="title text-4xl">New Institue Details</label>
        </div>
        <form className="form w-fit mb-20 px-20 pb-5 pt-3  border-2 border-[#eeeeee] shadow-lg">
          <div className="cont flex-col m-3  ">
            <label className="label1 flex ml-3">Name : </label>
            <input
              type="text"
              id="instituteName"
              className="initialname  border-2 border-[#9a9a9a] rounded-md w-96 pl-3 h-8
                "
              placeholder="Institute Name"
            />
          </div>

          <div className="cont3 flex-col m-3  ">
            <label className="label4 flex ml-3">Email : </label>
            <input
              type="email"
              id="instituteEmail"
              className="email border-2 border-[#9a9a9a] rounded-md w-96 h-8  pl-3
                  "
              placeholder="example123@gmail.com"
            />
          </div>
          <div className="cont2 flex-col m-3  ">
            <label className="label3 flex ml-3">Institue Code : </label>
            <input
              type="text"
              id="instituteCode"
              className="code border-2 border-[#9a9a9a] rounded-md w-96 h-8  pl-3
                  "
              placeholder="example : 0129"
            />
          </div>
          <div className="cont4 flex-col align-middle m-3  ">
            <label className="label5 flex ml-3">Phone : </label>
            <input
              type="text"
              id="institutePhone"
              className="phone border-2 border-[#9a9a9a] rounded-md w-96 h-8  pl-3
                  "
              placeholder="+91 1234567890"
            />
          </div>
          <div className="cont flex-col m-3  ">
            <label className="label6 flex ml-3">Location : </label>
            <input
              type="text"
              id="instituteLocation"
              className="location border-2  border-[#9a9a9a] rounded-md w-96 h-8  pl-3
                "
              placeholder="Region ,City ,State  "
            />
          </div>
          <div className="cont flex-col m-3  ">
            <label className="label6 flex ml-3">Website : </label>
            <input
              type="text"
              id="instituteWebsite"
              className="Autonomous border-2  border-[#9a9a9a] rounded-md w-96 h-8  pl-3
                "
              placeholder="www.website.com"
            />
          </div>
          <div className="cont5 justify-center flex m-3 ">
            <button
              onClick={handleSubmit}
              className="submit text-white border-2 border-[#021a36] py-1 px-10 w-96 mt-5 text-center rounded-md bg-[#2d8cff] "
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default InstituteForm;
