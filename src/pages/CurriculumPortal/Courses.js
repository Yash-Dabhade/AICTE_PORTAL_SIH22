import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { ref as dbref, child, get, set } from "firebase/database";
import { database } from "../../firebase/init-firebase";
import SimpleCard from "../../components/SimpleCard";
import Header from "../../components/Header";
import SubHead from "../../components/SubHead";
import Departments from "./Departments";
import InstituteCourses from "../forms/InstituteCourses";
import { Route, Routes, Outlet } from "react-router-dom";

export default function Courses(props) {
  const [courses, setCourses] = useState([]);
  const [data, setData] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [courseCode, setCourseCode] = useState();

  function getFullInstituteDetails(instituteCode) {
    const db = dbref(database);
    get(child(db, `/institutesDetail/${instituteCode}/`))
      .then((snapshot) => {
        let allData = new Array();
        if (snapshot.exists()) {
          let data = snapshot.val();
          Object.keys(data).forEach((key) => {
            allData.push(data[key]);
          });
          let finalData = new Array();
          allData.map((ele) => {
            Object.keys(ele).forEach((key) => {
              finalData.push(ele[key]);
            });
          });
          setData(finalData);
          window.localStorage.setItem("CoursesData", JSON.stringify(finalData));
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    if (props.code) {
      getFullInstituteDetails(props.code);
      window.localStorage.setItem("instituteCode", props.code);
    } else {
      getFullInstituteDetails(window.localStorage.getItem("instituteCode"));
    }
    return () => {};
  }, []);

  const getSelectedCourseCode = (e) => {
    setCourseCode(e);
    window.localStorage.setItem("courseCode", e);
  };

  function createCourses() {
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
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <SubHead title={"Courses"} btnFunc={createCourses} />

              <div className="university-boxes jsGridView">
                {data.map((ele, index) => {
                  return (
                    <SimpleCard
                      getSelectedCourseCode={getSelectedCourseCode}
                      key={index}
                      data={ele}
                    />
                  );
                })}
              </div>
              <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
                <InstituteCourses
                  btnFunc={closeModal}
                  instituteCode={
                    props.code
                      ? props.code
                      : window.localStorage.getItem("instituteCode")
                  }
                />
              </Modal>
            </>
          }
        />
        <Route
          path="departments/*"
          element={
            <Departments
              data={data}
              courseCode={
                courseCode
                  ? courseCode
                  : window.localStorage.getItem("courseCode")
              }
              instituteCode={
                props.code
                  ? props.code
                  : window.localStorage.getItem("instituteCode")
              }
            />
          }
        />
      </Routes>
    </>
  );
}
