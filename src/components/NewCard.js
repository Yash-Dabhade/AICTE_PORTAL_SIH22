import React, { useState } from "react";
import Modal from "react-modal";
import NewReport from "../pages/forms/NewReport";

function NewCard() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function createNewReport() {
    Modal.setAppElement("#newCardParent");
    openModal();
  }

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  return (
    <div
      onClick={createNewReport}
      className="border-2 rounded-xl border-compatible w-56 h-40 flex items-center justify-center cursor-pointer"
      id="newCardParent"
    >
      <div>
        <div className="text-center text-6xl font-medium">+</div>
      </div>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <NewReport btnFunc={closeModal} />
      </Modal>
    </div>
  );
}

export default NewCard;
