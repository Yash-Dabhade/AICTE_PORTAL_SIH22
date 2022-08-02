import React, { Component } from "react";
import { saveNewUniversity } from "../../utils/dbHelper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export class NewExpertForm extends Component {
  render() {
    function handleSubmit(e) {
      e.preventDefault();
      let name = document.getElementById("Name").value;
      let position = document.getElementById("position").value;
      let email = document.getElementById("Email").value;
      let phone = document.getElementById("Phone").value;
      let Company = document.getElementById("Company").value;

      console.log(Company, name, email, phone, position);
      //   saveNewUniversity(initialName, name, code, email, phone, website);
    }

    return (
      <div className="container darkMode flex flex-col content-center justify-center mt-10 items-center">
        <button
          className="CROSS-ICON absolute top-0 right-0 px-8 py-8 darkMode"
          onClick={this.props.btnFunc}
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
            <label className="title text-4xl">New Expert Form</label>
          </div>
          <form className="form w-fit px-20 pb-5 pt-3 border-2 border-[#eeeeee] rounded-md">
            <div className="cont flex-col m-3  ">
              <label className="label2 flex ml-3">Name : </label>
              <input
                type="text"
                id="Name"
                className="name  border-2 border-[#9a9a9a] rounded-md w-96 h-8  pl-3
              "
                placeholder="Name"
              />
            </div>

            <div className="cont3 flex-col m-3  ">
              <label className="label4 flex ml-3">Email : </label>
              <input
                type="email"
                id="Email"
                className="email border-2 border-[#9a9a9a] rounded-md w-96 h-8  pl-3
                "
                placeholder="example123@gmail.com"
              />
            </div>
            <div className="cont4 flex-col align-middle m-3  ">
              <label className="label5 flex ml-3 ">Position : </label>
              <input
                type="position"
                id="position"
                className="position border-2 border-[#9a9a9a] rounded-md w-96 h-8  pl-3
                "
                placeholder="+91 1234567890"
              />
            </div>
            <div className="cont flex-col m-3 ">
              <label className="label6 flex ml-3">Company : </label>
              <input
                type="text"
                id="Company"
                className="Company border-2 border-[#9a9a9a] rounded-md w-96 h-8  pl-3
              "
                placeholder="Company Name"
              />
            </div>
            <div className="cont flex-col m-3 ">
              <label className="label6 flex ml-3">Phone : </label>
              <input
                type="text"
                id="Phone"
                className="Phone border-2 border-[#9a9a9a] rounded-md w-96 h-8  pl-3
              "
                placeholder="+91 0000000000"
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

export default NewExpertForm;
