import React, { Component } from "react";

export class UniversityForm extends Component {
  render() {
    return (
      <div className="container flex justify-center h-screen items-center">
        <div className="content flex-col">
          <div className="title flex justify-center mb-10 ">
            <label className="titl text-4xl">New University Details</label>
          </div>
          <form className="form w-fit mb-20   border-2 border-[#eeeeee] shadow-lg">
            <div className="cont flex-col m-3  ">
              <label className="label1 flex ml-3">Initial Name : </label>
              <input
                type="text"
                className="initialname  border-2 border-[#9a9a9a] rounded-md w-96 pl-3 h-8
              "
                placeholder="Initial Name"
              />
            </div>
            <div className="cont flex-col m-3  ">
              <label className="label2 flex ml-3">Full Name : </label>
              <input
                type="text"
                className="name  border-2 border-[#9a9a9a] rounded-md w-96 h-8  pl-3
              "
                placeholder="Full Name"
              />
            </div>
            <div className="cont2 flex-col m-3  ">
              <label className="label3 flex ml-3">Code : </label>
              <input
                type="text"
                className="code border-2 border-[#9a9a9a] rounded-md w-96 h-8  pl-3
                "
                placeholder="example:213312"
              />
            </div>
            <div className="cont3 flex-col m-3  ">
              <label className="label4 flex ml-3">Email : </label>
              <input
                type="email"
                className="email border-2 border-[#9a9a9a] rounded-md w-96 h-8  pl-3
                "
                placeholder="example123@gmail.com"
              />
            </div>
            <div className="cont4 flex-col align-middle m-3  ">
              <label className="label5 flex ml-3">Phone : </label>
              <input
                type="text"
                className="phone border-2 border-[#9a9a9a] rounded-md w-96 h-8  pl-3
                "
                placeholder="+91 1234567890"
              />
            </div>
            <div className="cont flex-col m-3  ">
              <label className="label6 flex ml-3">Website : </label>
              <input
                type="text"
                className="website border-2  border-[#9a9a9a] rounded-md w-96 h-8  pl-3
              "
                placeholder="wwww.website.com"
              />
            </div>
            <div className="cont5 justify-center flex m-3 ">
              <a className="submit text-white border-2 border-[#021a36] py-1 px-10 w-96 text-center rounded-md bg-[#2d8cff] ">
                {" "}
                Submit
              </a>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default UniversityForm;
