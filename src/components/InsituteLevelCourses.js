import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { ref as dbref, child, get } from "firebase/database";
import { database } from "../firebase/init-firebase";
import SimpleCard2 from "./SimpleCard2";
import Header from "./Header";
import SubHead from "./SubHead";
import Departments from "../pages/Departments";
import InstituteCourses from "../pages/forms/InstituteCourses";

export default function InstituteLevelCourses(props) {
  const [courses, setCourses] = useState([]);
  const [data, setData] = useState([]);

  function getFullInstituteDetails(instituteCode) {
    const db = dbref(database);
    get(child(db, `/institutesDetail/${instituteCode}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          let data = snapshot.val();
          // Object.keys(data).forEach((key) => {
          //   allData.push(data[key]);
          // });
          // setState
          setData(data);
          console.log(data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    return () => {
      // getFullInstituteDetails(props.code);
    };
  }, []);

  function renderCourseDetails() {
    props.root.render(
      <Departments
        root={props.root}
        instituteCode={props.instituteCode}
        courseCode={props.courseCode}
      />
    );
  }

  function createCourses() {
    openModal();
    Modal.setAppElement("#formRoot");
  }

  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <Header title={"Institute"} />
      <SubHead title={"Courses"} btnFunc={createCourses} />

      <div>
        <SimpleCard2 renderDetails={renderCourseDetails} />
        <SimpleCard2 renderDetails={renderCourseDetails} />
        <SimpleCard2 renderDetails={renderCourseDetails} />
        <SimpleCard2 renderDetails={renderCourseDetails} />
      </div>
      <Modal
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        // contentLabel={props.label}
      >
        <InstituteCourses btnFunc={closeModal} instituteCode={props.code} />
      </Modal>
    </>
  );
}
