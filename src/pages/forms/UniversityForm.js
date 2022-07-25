import React, { Component } from "react";
import { saveNewUniversity } from "../../utils/dbHelper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export class UniversityForm extends Component {
  render() {
    function validatePhoneNumber(input_str) {
      var re = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
      if (re.test(input_str)) return true;
      toast.error("Please enter valid phone number");
      return false;
    }

    function ValidateEmail(email) {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        return true;
      }
      toast.error("You have entered an invalid email address!");
      return false;
    }
    function handleSubmit(e) {
      e.preventDefault();
      console.log("asass  ");
      let initialName = document.getElementById("initialName").value;
      let name = document.getElementById("name").value;
      let code = document.getElementById("code").value;
      let email = document.getElementById("email").value;
      let phone = document.getElementById("phone").value;
      let website = document.getElementById("website").value;
      let res1 = false;
      let res2 = false;
      let res3 = false;
      //check all details r there or not
      if (
        initialName == "" ||
        name == "" ||
        code == "" ||
        email == "" ||
        phone == "" ||
        website == ""
      ) {
        toast.error("All details must be filled");
      } else {
        res1 = true;
        if (ValidateEmail(email)) {
          res2 = true;
        }
        if (validatePhoneNumber(phone)) {
          res3 = true;
        }
      }
      // submitting to database
      if (res1 && res2 && res3) {
        saveNewUniversity(initialName, name, code, email, phone, website);
      }
    }

    return (
      <div className="container flex content-center justify-center h-screen items-center">
        <div className="content flex-col mt-20">
          <div className="title flex justify-center mb-10 ">
            <label className="title text-4xl">New University Details</label>
          </div>
          <form className="form w-fit mb-20 px-20 pb-5 pt-3  border-2 border-[#eeeeee] shadow-lg">
            <div className="cont flex-col m-3  ">
              <label className="label1 flex ml-3">Initial Name : </label>
              <input
                type="text"
                id="initialName"
                className="initialname  border-2 border-[#9a9a9a] rounded-md w-96 pl-3 h-8
              "
                placeholder="Initial Name"
              />
            </div>
            <div className="cont flex-col m-3  ">
              <label className="label2 flex ml-3">Full Name : </label>
              <input
                type="text"
                id="name"
                className="name  border-2 border-[#9a9a9a] rounded-md w-96 h-8  pl-3
              "
                placeholder="Full Name"
              />
            </div>
            <div className="cont2 flex-col m-3  ">
              <label className="label3 flex ml-3">Code : </label>
              <input
                type="text"
                id="code"
                className="code border-2 border-[#9a9a9a] rounded-md w-96 h-8  pl-3
                "
                placeholder="example:213312"
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
            <div className="cont4 flex-col align-middle m-3  ">
              <label className="label5 flex ml-3 ">Phone : </label>
              <input
                type="text"
                id="phone"
                className="phone border-2 border-[#9a9a9a] rounded-md w-96 h-8  pl-3
                "
                placeholder="+91 1234567890"
              />
            </div>
            <div className="cont flex-col m-3  ">
              <label className="label6 flex ml-3">Website : </label>
              <input
                type="text"
                id="website"
                className="website border-2  border-[#9a9a9a] rounded-md w-96 h-8  pl-3
              "
                placeholder="wwww.website.com"
              />
            </div>
            <div className="cont5 justify-center flex m-3 ">
              <button
                onClick={handleSubmit}
                className="submit text-white border-2  border-[#021a36] py-1 px-10 w-96 mt-5 text-center rounded-md bg-[#2d8cff] "
              >
                Submit
              </button>
            </div>
          </form>
          <ToastContainer />
        </div>
      </div>
    );
  }
}

export default UniversityForm;
