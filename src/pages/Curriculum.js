import React from "react";
import Modal from "react-modal";
import Header from "../components/Header";
import SubHead from "../components/SubHead";
import NewCurriculum from "./forms/NewCurriculum";

function Curriculum(props) {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [allData, setAllData] = React.useState([]);

  function getAllCurriculums(data) {
    let allSem = {};
    let semData = [];
    data.forEach((ele) => {
      if (ele.semesters) {
        allSem = ele.semesters;
      }
    });
    Object.keys(allSem).forEach((ele) => {
      semData.push(allSem[ele]);
    });
    setAllData(semData);
  }

  React.useEffect(() => {
    getAllCurriculums(props.data);
    return () => {};
  }, []);

  function openModal() {
    Modal.setAppElement("#formRoot");
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <Header title={"Curriculum"} />
      <SubHead title={"Curriculum"} btnFunc={openModal} />

      <div className="university-boxes jsGridView">
        {/* {allData.map((ele) => {
          console.log(ele);
        })} */}
      </div>

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
