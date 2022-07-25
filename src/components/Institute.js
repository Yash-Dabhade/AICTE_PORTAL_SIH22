import React from "react";
import Modal from "react-modal";
import Description from "./Description";
import InstituteList from "./InstituteList";
import ContactCard from "./ContactCard";
import Header from "./Header";
import SubHead from "./SubHead";
import InstituteForm from "../pages/forms/InstituteForm";

function Institute(props) {
  function createInstitute() {
    openModal();
    console.log("University ");
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
      <SubHead title={"Institute"} btnFunc={createInstitute} />
      <div className="flex justify-between ">
        <Description
          title={props.title}
          code={props.code}
          fullName={props.fullName}
        />
        {/* <SimpleCard2 /> */}
        <ContactCard />
      </div>
      <div className="universities-section-header">
        <p>Institutes</p>
      </div>
      <InstituteList institutes={props.institutes} root={props.root} />
      <Modal
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        // contentLabel={props.label}
      >
        <InstituteForm btnFunc={closeModal} universityCode={props.code} />
      </Modal>
    </>
  );
}

export default Institute;
