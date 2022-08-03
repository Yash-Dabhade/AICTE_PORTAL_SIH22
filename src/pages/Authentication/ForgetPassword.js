import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import logo from "../../res/AICTE_logo.png";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ForgetPassword() {
  const { forgotPassword } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  function registerNow() {
    document.querySelector("#forgetBtn").style.disabled = true;
    let email = document.getElementById("email").value;

    setIsSubmitting(true);
    forgotPassword(email)
      .then((res) => {
        window.location.href = "/signin";
      })
      .catch((error) => {
        console.log(error.message);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }

  return (
    <div className="contain">
      <div className="flex flex-col justify-center items-center bg-slate-100 ">
        <div>
          <img className="h-28 mt-2  mx-auto w-28" src={logo} alt="Logo" />
          <p className="text-3xl font-bold text-center mt-2">Forget Password</p>
        </div>
        <div className="flex flex-col bg-white  mt-10 p-10 w-card rounded-xl drop-shadow-xl ">
          <p>Email</p>
          <input
            id="email"
            className=" mt-2 text-lg px-3 h-10  border border-gray-400 outline-1 outline-blue-500 rounded-md"
            type="text"
            placeholder="Email address"
          />
          <div className="flex justify-between items-center mt-3">
            <a href="/signin">
              <span className="mt-3 mx-2 text-violet-900   cursor-pointer hover:underline">
                Sign In
              </span>
            </a>
            <a href="/register">
              <span className="mt-3 mx-2 text-violet-900   cursor-pointer hover:underline">
                Register
              </span>
            </a>
          </div>
          <button
            id="forgetBtn"
            onClick={registerNow}
            className="btn px-3 mt-4 h-10 rounded-lg bg-blue-700 hover:bg-blue-600 font-bold text-white text-xl"
          >
            ForgetPassword
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default ForgetPassword;
