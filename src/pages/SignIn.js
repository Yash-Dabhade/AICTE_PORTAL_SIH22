import React from "react";
import logo from "../res/AICTE_logo.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../contexts/AuthContext";

function SignIn() {
  const { login } = useAuth();

  const notify = () => {
    toast.error("Wrong email or password !", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const signInNow = () => {
    let logemail = document.querySelector("#email").value;
    let logpassword = document.querySelector("#password").value;
    //disable signInBtn
    login(logemail, logpassword)
      .then((res) => {
        //redirect to home page
        toast("Login in successful !", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        window.location.href = "/home";
      })
      .catch((error) => {
        // alert("Unable to login !");
        notify();
      });
  };

  return (
    <div>
      <div className="container bg-slate-100 ">
        <img className="h-28 mt-2  mx-auto w-28" src={logo} alt="Logo" />
        <p className="text-3xl font-bold text-center mt-2">
          Sign in to your account
        </p>
        <div className="right flex flex-col bg-white mx-80 mt-10 p-10 w-1/2 h-1/6 rounded-xl drop-shadow-xl">
          <p>Email address</p>
          <input
            id="email"
            className=" mt-2 text-lg px-3 h-10  border border-gray-400 outline-1 outline-blue-500 rounded-md"
            type="text"
            placeholder="Email address"
          />
          <h2 className="mt-2">Password</h2>
          <input
            id="password"
            className="text-lg mt-4 px-3 h-10 border border-gray-400 outline-1 outline-blue-500 rounded-md"
            type="password"
            placeholder="Password"
          />
          <span className="mt-3 mx-2 text-violet-900   cursor-pointer hover:underline">
            Forgot your password?
          </span>
          <button
            id="signInBtn"
            onClick={signInNow}
            class="btn px-3 mt-4 h-10 rounded-lg bg-blue-700   hover:bg-blue-600 font-bold text-white text-xl"
          >
            Sign In
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default SignIn;
