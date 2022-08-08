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
  const [selectedDepartmentCode, setSelectedDepartmentCode] = React.useState();

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
    getDeparments(props.data, props.courseCode);
    return () => {};
  }, []);

  const getSelectedDepartmentCode = (code) => {
    setSelectedDepartmentCode(code);
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
                    getSelectedDepartmentCode={getSelectedDepartmentCode}
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
            instituteCode={props.instituteCode}
            courseCode={props.courseCode}
            departmentCode={selectedDepartmentCode}
            data={allData}
          />
        }
      />
    </Routes>
  );
}

export default Departments;
