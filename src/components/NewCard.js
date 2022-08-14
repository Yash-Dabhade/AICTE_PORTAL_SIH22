import React, { useState } from "react";
import Modal from "react-modal";
import NewReport from "../pages/forms/NewReport";

function NewCard() {
  const [modalIsOpen, setIsOpen] = useState(false);

  function createUniversity() {
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
    <div className="flex">
      <div
        onClick={() => setIsOpen(true)}
        className="border-2 flex justify-center items-center cursor-pointer hover:shadow-lg border-compatible border-black bg-white  card w-52 h-40 rounded-lg"
      >
        <div className="text-center text-6xl font-medium">+</div>
      </div>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <NewReport btnFunc={closeModal} />
      </Modal>
    </div>
  );
}

export default NewCard;
