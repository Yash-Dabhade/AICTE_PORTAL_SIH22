import React from "react";
import Modal from "react-modal";
import SimpleCard from "../../components/SimpleCard";
import Header from "../../components/Header";
import SubHead from "../../components/SubHead";
import NewDepartment from "../forms/NewDepartment";
import Curriculum from "./Curriculum";
import { Route, Routes } from "react-router-dom";

function Departments(props) {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [allData, setAllData] = React.useState([]);
  const [deptCodes, setDeptCode] = React.useState([]);
  const [selectedDepartment, setSelectedDepartment] = React.useState();

  function getDeparments(data, courseCode) {
    let allDept = {};
    let deptData = [];
    data.forEach((ele) => {
      if (!ele.departments) return;
      if (ele.code == courseCode) allDept = ele.departments;
    });
    setDeptCode(Object.keys(allDept));
    Object.keys(allDept).forEach((ele) => {
      deptData.push(allDept[ele]);
    });
    setAllData(deptData);
  }

  React.useEffect(() => {
    if (props.data.length > 0) {
      getDeparments(props.data, props.courseCode);
    } else {
      getDeparments(
        JSON.parse(window.localStorage.getItem("CoursesData")),
        props.courseCode
      );
    }
    return () => {};
  }, []);

  const getSelectedDepartment = (obj) => {
    setSelectedDepartment(obj);
    window.localStorage.setItem("selectedDepartment", JSON.stringify(obj));
    console.log(obj);
    window.localStorage.setItem("selectedDepartmentCode", obj.code);
  };

  function openModal() {
    Modal.setAppElement("#formRoot");
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Header title={"Departments"} />
            <SubHead title={"Departments"} btnFunc={openModal} />
            <div className="university-boxes jsGridView">
              {allData.map((ele, index) => {
                return (
                  <SimpleCard
                    getSelectedDepartment={getSelectedDepartment}
                    data={ele}
                    key={index}
                    deptCode={deptCodes[index]}
                  />
                );
              })}
            </div>
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
              <NewDepartment
                btnFunc={closeModal}
                instituteCode={props.instituteCode}
                courseCode={props.courseCode}
              />
            </Modal>
          </>
        }
      />
      <Route
        path={`/curriculums`}
        element={
          <Curriculum
            instituteCode={
              props.instituteCode
                ? props.instituteCode
                : window.localStorage.getItem("instituteCode")
            }
            courseCode={
              props.courseCode
                ? props.courseCode
                : window.localStorage.getItem("courseCode")
            }
            departmentCode={
              selectedDepartment
                ? selectedDepartment.code
                : window.localStorage.getItem("selectedDepartmentCode")
            }
            selectedDept={selectedDepartment}
          />
        }
      />
    </Routes>
  );
}

export default Departments;
