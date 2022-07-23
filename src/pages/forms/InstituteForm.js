import React from "react";
import { saveNewInstitute } from "../../utils/dbHelper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function InstituteForm() {
  function handleSubmit(e) {
    e.preventDefault();

    let name = document.getElementById("name").value;
    let code = document.getElementById("code").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    let location = document.getElementById("location").value;
    let website = document.getElementById("website").value;

    // check if the values are empty

    // submitting to database
    saveNewInstitute(name, code, email, phone, location, website);
  }

  return (
    <div className="container  flex justify-center h-screen items-center">
      <div className="content flex-col mt-20">
        <div className="title flex justify-center mb-10 ">
          <label className="title text-4xl">New Institue Details</label>
        </div>
        <form className="form w-fit mb-20 px-20 pb-5 pt-3  border-2 border-[#eeeeee] shadow-lg">
          <div className="cont flex-col m-3  ">
            <label className="label1 flex ml-3">Name : </label>
            <input
              type="text"
              id="name"
              className="initialname  border-2 border-[#9a9a9a] rounded-md w-96 pl-3 h-8
                "
              placeholder="Institute Name"
            />
          </div>

          <div className="cont3 flex-col m-3  ">
            <label className="label4 flex ml-3">Email : </label>
            <input
              type="email"
              id="email"
              className="email border-2 border-[#9a9a9a] rounded-md w-96 h-8  pl-3
                  "
              placeholder="example123@gmail.com"
            />
          </div>
          <div className="cont2 flex-col m-3  ">
            <label className="label3 flex ml-3">Code : </label>
            <input
              type="text"
              id="code"
              className="code border-2 border-[#9a9a9a] rounded-md w-96 h-8  pl-3
                  "
              placeholder="example : 0129"
            />
          </div>
          <div className="cont4 flex-col align-middle m-3  ">
            <label className="label5 flex ml-3">Phone : </label>
            <input
              type="text"
              id="phone"
              className="phone border-2 border-[#9a9a9a] rounded-md w-96 h-8  pl-3
                  "
              placeholder="+91 1234567890"
            />
          </div>
          <div className="cont flex-col m-3  ">
            <label className="label6 flex ml-3">Location : </label>
            <input
              type="text"
              id="location"
              className="website border-2  border-[#9a9a9a] rounded-md w-96 h-8  pl-3
                "
              placeholder="Region ,City ,State  "
            />
          </div>
          <div className="cont flex-col m-3  ">
            <label className="label6 flex ml-3">Autonomous : </label>
            <input
              type="text"
              id="website"
              className="Autonomous border-2  border-[#9a9a9a] rounded-md w-96 h-8  pl-3
                "
              placeholder="www.abc.org.in"
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
