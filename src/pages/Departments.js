import React from "react";
import Modal from "react-modal";
import SimpleCard2 from "../components/SimpleCard2";
import Header from "../components/Header";
import SubHead from "../components/SubHead";
import NewDepartment from "./forms/NewDepartment";
import Curriculum from "./Curriculum";

function Departments(props) {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [allData, setAllData] = React.useState([]);

  function getDeparments(data) {
    let allDept = {};
    let deptData = [];
    data.forEach((ele) => {
      if (ele.departments) {
        allDept = ele.departments;
      }
    });
    Object.keys(allDept).forEach((ele) => {
      deptData.push(allDept[ele]);
    });
    setAllData(deptData);
  }

  React.useEffect(() => {
    getDeparments(props.data);
    return () => {};
  }, []);

  function renderCurriculumDetails() {
    props.root.render(
      <Curriculum
        instituteCode={props.instituteCode}
        courseCode={props.courseCode}
        departmentCode={props.departmentCode}
        data={allData}
      />
    );
  }

  function openModal() {
    Modal.setAppElement("#formRoot");
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <Header title={"Departments"} />
      <SubHead title={"Departments"} btnFunc={openModal} />
      <div className="university-boxes jsGridView">
        {allData.map((ele, index) => {
          return (
            <SimpleCard2
              renderDetails={renderCurriculumDetails}
              data={ele}
              key={index}
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
  );
}

export default Departments;
