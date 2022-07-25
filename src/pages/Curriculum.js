import React from "react";
import Modal from "react-modal";
import Header from "../components/Header";
import SubHead from "../components/SubHead";
import NewCurriculum from "./forms/NewCurriculum";

function Curriculum(props) {
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <Header title={"Curriculum"} />
      <SubHead title={"Curriculum"} btnFunc={openModal} />
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <NewCurriculum
          btnFunc={closeModal}
          instituteCode={props.instituteCode}
          courseCode={props.courseCode}
          departmentCode={props.departmentCode}
        />
      </Modal>
    </>
  );
}

export default Curriculum;
