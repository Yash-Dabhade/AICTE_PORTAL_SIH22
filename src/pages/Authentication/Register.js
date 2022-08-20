import React, { useEffect, useRef, useState } from "react";
import { ref as dbref, child, get } from "firebase/database";
import { database } from "../../firebase/init-firebase";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import useMounted from "../../hooks/useMounted";
import styled from "styled-components";
import { toast } from "react-toastify";
import Modal from "react-modal";
import CollectExpertDetails from "../forms/CollectExpertDetails";
import "react-toastify/dist/ReactToastify.css";

function Register() {
  const notify = (e) => {
    toast.error(e, {
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
    if (password !== confirmPass) {
      notify("Password does not match !");
      document.getElementById("registerBtn").style.disabeld = false;
    } else {
      const db = dbref(database);
      let emailName = String(email).toLowerCase().split("@")[0];
      get(child(db, `/expertsEmails/${emailName}`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            // console.log(fname, lname, email, enroll);
            if (
              String(data.email).toLowerCase() === String(email).toLowerCase()
            ) {
              setEmail(email);
              setPassword(password);
              collectDetails();
            } else {
              notify("Details does not match the records !");
              document.getElementById("registerBtn").style.disabeld = false;
            }
          } else {
            notify("Expert email not found !");
            document.getElementById("registerBtn").style.disabeld = false;
          }
        })
        .catch((error) => {
          notify("Some error occured");
          document.getElementById("registerBtn").style.disabeld = false;
          return;
        });
    }
  }

  // To take details of the Expert

  const [modalIsOpen, setIsOpen] = useState(false);

  function collectDetails() {
    openModal();
    Modal.setAppElement("#formRoot");
  }

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div
      className="container flex flex-col justify-center items-center"
      id="formRoot"
    >
      <div>
        <p className="text-3xl font-bold text-center mt-2">Register account</p>
      </div>
      <div className="flex flex-col bg-white mt-10 p-5 md:p-10 w-80 md:w-card rounded-xl drop-shadow-xl">
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
        <div className="flex justify-between items-center mt-3">
          <Link to="/forgetpassword">
            <span className=" text-violet-900   cursor-pointer hover:underline">
              Forgot password ?
            </span>
          </Link>
          <Link to="/signin">
            <span className=" text-violet-900   cursor-pointer hover:underline">
              Already have an account ?
            </span>
          </Link>
        </div>
        <button
          id="registerBtn"
          onClick={registerNow}
          className="btn btn-compatible px-3 mt-4 h-10 rounded-lg hover:border-[#1f1c2e] hover:border-2 font-bold text-white text-xl"
        >
          Register
        </button>
      </div>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <CollectExpertDetails
          btnFunc={closeModal}
          email={email ? email : null}
          password={password ? password : null}
          notify={notify}
        />
      </Modal>
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
