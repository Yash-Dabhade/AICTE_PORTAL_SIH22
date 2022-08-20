import React, { useEffect, useRef, useState } from "react";
import { ref as dbref, child, get } from "firebase/database";
import { database } from "../firebase/init-firebase";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import useMounted from "../hooks/useMounted";
import styled from "styled-components";
import logo from "../res/AICTE_logo.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register() {
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

  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const { register, login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { currentUser } = useAuth();

  const regmounted = useRef(false);
  const mounted = useMounted();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    regmounted.current = true;
    return () => {
      regmounted.current = false;
    };
  }, []);

  function registerNow() {
    let email = document.getElementById("regEmail").value;
    let password = document.getElementById("regPassword").value;
    let confirmPass = document.getElementById("confirmRegPass").value;

    document.getElementById("registerBtn").style.disabeld = true;
    if (password != confirmPass) {
      alert("Password does not match  !");
      document.getElementById("registerBtn").style.disabeld = false;
      return;
    }

    const db = dbref(database);
    let emailName = String(email).split("@")[0];
    // console.log(emailName);
    get(child(db, `/expertsEmails/${emailName}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          // console.log(fname, lname, email, enroll);

          if (data.email == email) {
            setIsSubmitting(true);
            register(email, password)
              .then((res) => {
                data.registerStatus.isRegister = false;
              })
              .catch((error) => {
                console.log(error.message);
              })
              .finally(() => {
                mounted.current && setIsSubmitting(false);
              });
          } else {
            alert("Details does not match the records !");
            document.getElementById("registerBtn").style.disabeld = false;
          }
        } else {
          alert("Expert email not found !");
          document.getElementById("registerBtn").style.disabeld = false;
        }
      })
      .catch((error) => {
        alert("Some error occured");
        document.getElementById("registerBtn").style.disabeld = false;
        return;
      });
  }

  return (
    <div>
      <div className="container flex flex-col justify-center items-center bg-slate-100 ">
        <div>
          <img className="h-28 mt-2  mx-auto w-28" src={logo} alt="Logo" />
          <p className="text-3xl font-bold text-center mt-2">
            Register account
          </p>
        </div>
        <div className="flex flex-col bg-white mt-10 p-10 w-card h-1/6 rounded-xl drop-shadow-xl">
          <p>Email</p>
          <input
            id="regEmail"
            className=" mt-2 text-lg px-3 h-10  border border-gray-400 outline-1 outline-blue-500 rounded-md"
            type="text"
            placeholder="Email address"
          />
          <h2 className="mt-2">Password</h2>
          <input
            id="regPassword"
            className="text-lg mt-4 px-3 h-10 border border-gray-400 outline-1 outline-blue-500 rounded-md"
            type="password"
            placeholder="Password"
          />
          <h2 className="mt-2">Confirm Password</h2>
          <input
            id="confirmRegPass"
            className="text-lg mt-4 px-3 h-10 border border-gray-400 outline-1 outline-blue-500 rounded-md"
            type="password"
            placeholder="Confirm Password"
          />

          <button
            id="registerBtn"
            onClick={registerNow}
            className="btn btn-compatible px-3 mt-4 h-10 rounded-lg hover:border-[#1f1c2e] hover:border-2 font-bold text-white text-xl"
          >
            Register
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

const Contain = styled.div`
  @media (max-width: 650px) {
    position: absolute;
    background-attachment: fixed;
    height: fit-content;
    width: 110wh;
  }
`;

export default Register;
