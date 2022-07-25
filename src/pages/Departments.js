import React from "react";
import Modal from "react-modal";
import SimpleCard2 from "../components/SimpleCard2";
import Header from "../components/Header";
import SubHead from "../components/SubHead";
import NewDepartment from "./forms/NewDepartment";
import Curriculum from "./Curriculum";

function Departments(props) {
  function renderCurriculumDetails() {
    props.root.render(
      <Curriculum
        instituteCode={props.instituteCode}
        courseCode={props.courseCode}
        departmentCode={props.departmentCode}
      />
    );
  }

  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <Header title={"Departments"} />
      <SubHead title={"Departments"} btnFunc={openModal} />
      <SimpleCard2 renderDetails={renderCurriculumDetails} />
      <Modal
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        // contentLabel={props.label}
      >
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
