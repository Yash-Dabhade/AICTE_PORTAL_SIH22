import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
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
    <div className="flex flex-col justify-center items-center bg-slate-100 ">
      <div>
        <p className="text-3xl font-bold text-center mt-2">Forget Password</p>
      </div>
      <div className="flex flex-col bg-white mt-10 p-5 md:p-10 w-80 md:w-card rounded-xl drop-shadow-xl">
        <p>Email</p>
        <input
          id="email"
          className=" mt-2 text-lg px-3 h-10  border border-gray-400 outline-1 outline-blue-500 rounded-md"
          type="text"
          placeholder="Email address"
        />
        <div className="flex justify-between items-center mt-3">
          <Link to="/signin">
            <span className="mt-3 mx-2 text-violet-900   cursor-pointer hover:underline">
              Sign In
            </span>
          </Link>
          <Link to="/register">
            <span className="mt-3 mx-2 text-violet-900   cursor-pointer hover:underline">
              Register
            </span>
          </Link>
        </div>
        <button
          id="forgetBtn"
          onClick={registerNow}
          className="btn btn-compatible px-3 mt-4 h-10 rounded-lg hover:border-[#1f1c2e] hover:border-2 font-bold text-white text-xl"
        >
          ForgetPassword
        </button>
      </div>
    </div>
  );
}

export default ForgetPassword;
