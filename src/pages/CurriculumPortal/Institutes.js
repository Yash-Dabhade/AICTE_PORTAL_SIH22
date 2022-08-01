import React from "react";
import Modal from "react-modal";
import Description from "../../components/Description";
import InstituteList from "../../components/InstituteList";
import ContactCard from "../../components/ContactCard";
import Header from "../../components/Header";
import SubHead from "../../components/SubHead";
import InstituteForm from "../forms/InstituteForm";

function Institutes(props) {
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function createInstitute() {
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
      <SubHead title={"Institute"} btnFunc={createInstitute} />
      <div className="flex justify-between ">
        <Description
          title={props.title}
          code={props.code}
          fullName={props.fullName}
        />
        <ContactCard
          email={props.email}
          phone={props.phone}
          location={props.location}
          website={props.website}
        />
      </div>
      <div className="universities-section-header">
        <p>Institutes</p>
      </div>
      <InstituteList institutes={props.institutes} root={props.root} />
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <InstituteForm btnFunc={closeModal} universityCode={props.code} />
      </Modal>
    </>
  );
}

export default Institutes;
