import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import NewExpertForm from "../forms/NewExpertForm";
import { BsArrowRight } from "react-icons/bs";
import ExpertDetails from "../ExpertPortal/ExpertDetails";
import ExpertLists from "../../components/ExpertLists";

export default function Settings() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [ExpertFormModalIsOpen, setIsExpertFormModalIsOpen] = useState(false);

  useEffect(() => {
    Modal.setAppElement("#formRoot");
    return () => {};
  }, []);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function openExpertForm() {
    setIsExpertFormModalIsOpen(true);
  }

  function closeExpertForm() {
    setIsExpertFormModalIsOpen(false);
  }
  return (
    <div className="parent-section gap-4 darkMode" id="formRoot">
      <div className="flex flex-col text-center w-full">
        <h1 className="text-2xl font-medium title-font tracking-widest">
          SETTINGS
        </h1>
      </div>
      <div
        className="w-full border-2 border-compatible py-2 px-8 flex justify-between items-center focus:outline-none hover:bg-indigo-200 hover:text-black rounded text-lg"
        onClick={() => {
          openExpertForm();
        }}
      >
        <span>Add Expert</span>
        <BsArrowRight />
      </div>
      <div
        className="w-full border-2 border-compatible py-2 px-8 flex justify-between items-center focus:outline-none hover:bg-indigo-200 hover:text-black rounded text-lg"
        onClick={() => {
          openModal();
        }}
      >
        <span>Show Expert Details</span>
        <BsArrowRight />
      </div>
      <Modal isOpen={ExpertFormModalIsOpen} onRequestClose={closeModal}>
        <NewExpertForm btnFunc={closeExpertForm} />
      </Modal>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <ExpertLists btnFunc={closeModal} />
      </Modal>
    </div>
  );
}
