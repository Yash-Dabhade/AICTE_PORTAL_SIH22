import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { ref as dbref, child, get } from "firebase/database";
import { database } from "../../firebase/init-firebase";
import SimpleCard from "../../components/SimpleCard";
import Header from "../../components/Header";
import SubHead from "../../components/SubHead";
import Departments from "./Departments";
import InstituteCourses from "../forms/InstituteCourses";

export default function Courses(props) {
  const [courses, setCourses] = useState([]);
  const [data, setData] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);

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
          // Object.keys(data).forEach((key) => {
          //   allData.push(Object.values(data[key]));
          // });
          let finalData = new Array();
          allData.map((ele) => {
            Object.keys(ele).forEach((key) => {
              finalData.push(ele[key]);
            });
          });
          setData(finalData);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    getFullInstituteDetails(props.code);
    return () => {};
  }, []);

  function renderCourseDetails(code) {
    props.root.render(
      <Departments
        data={data}
        root={props.root}
        instituteCode={props.code}
        courseCode={code}
      />
    );
  }

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
      <Header />
      <SubHead title={"Courses"} btnFunc={createCourses} />

      <div className="university-boxes jsGridView">
        {data.map((ele, index) => {
          return (
            <SimpleCard
              renderDetails={renderCourseDetails}
              key={index}
              data={ele}
            />
          );
        })}
      </div>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <InstituteCourses btnFunc={closeModal} instituteCode={props.code} />
      </Modal>
    </>
  );
}