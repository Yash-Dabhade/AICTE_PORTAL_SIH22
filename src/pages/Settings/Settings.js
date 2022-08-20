import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import NewExpertForm from "../forms/NewExpertForm";
import { BsArrowRight } from "react-icons/bs";
import ExpertDetails from "../ExpertPortal/ExpertDetails";
import ExpertLists from "../../components/ExpertLists";
import NewTag from "../forms/NewTag";
import TagList from "../../components/TagList";
import { Routes, Route, Link, Outlet } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

import { child, get, ref as dbref } from "firebase/database";
import { database } from "../../firebase/init-firebase";

export default function Settings() {
  const [ExpertFormModalIsOpen, setIsExpertFormModalIsOpen] = useState(false);
  const [ExpertDetailsModalIsOpen, setIsExpertDetailsModalIsOpen] =
    useState(false);
  const [addTagModalIsOpen, setIsAddTagModalIsOpen] = useState(false);
  const [TagDetailsModalIsOpen, setIsTagDetailsModalIsOpen] = useState(false);

  useEffect(() => {
    getAllTags();
    getAllExperts();
    Modal.setAppElement("#formRoot");
    return () => {};
  }, []);

  function closeModal() {
    setIsExpertFormModalIsOpen(false);
    setIsExpertDetailsModalIsOpen(false);
    setIsAddTagModalIsOpen(false);
    setIsTagDetailsModalIsOpen(false);
  }

  function openExpertFormModal() {
    setIsExpertFormModalIsOpen(true);
  }

  function openExpertDetailsModal() {
    setIsExpertDetailsModalIsOpen(true);
  }

  function openAddTagModal() {
    setIsAddTagModalIsOpen(true);
  }

  function openTagDetailsModal() {
    setIsTagDetailsModalIsOpen(true);
  }

  const [tags, setTags] = React.useState();
  const [experts, setExperts] = React.useState();

  function getAllTags() {
    const db = dbref(database);
    get(child(db, `/tags/`)).then((snapshot) => {
      let alltags = [];
      if (snapshot.exists()) {
        alltags = snapshot.val();
        setTags(alltags);
      }
    });
  }
  function getAllExperts() {
    const db = dbref(database);
    get(child(db, `/expertsEmails/`)).then((snapshot) => {
      let allExperts = [];
      if (snapshot.exists()) {
        allExperts = snapshot.val();
        setExperts(allExperts);
      }
    });
  }

  function notify(e) {
    toast(e, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
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
          openExpertFormModal();
        }}
      >
        <span>Add Expert</span>
        <BsArrowRight />
      </div>
      <div
        className="w-full border-2 border-compatible py-2 px-8 flex justify-between items-center focus:outline-none hover:bg-indigo-200 hover:text-black rounded text-lg"
        onClick={() => {
          openExpertDetailsModal();
        }}
      >
        <span>Show Expert Details</span>
        <BsArrowRight />
      </div>
      <div
        className="w-full border-2 border-compatible py-2 px-8 flex justify-between items-center focus:outline-none hover:bg-indigo-200 hover:text-black rounded text-lg"
        onClick={() => {
          openAddTagModal();
        }}
      >
        <span>Add Tags</span>
        <BsArrowRight />
      </div>
      <div
        className="w-full border-2 border-compatible py-2 px-8 flex justify-between items-center focus:outline-none hover:bg-indigo-200 hover:text-black rounded text-lg"
        onClick={openTagDetailsModal}
      >
        <span>Show Tags</span>
        <BsArrowRight />
      </div>

      <Modal isOpen={ExpertFormModalIsOpen} onRequestClose={closeModal}>
        <NewExpertForm btnFunc={closeModal} />
      </Modal>
      <Modal isOpen={ExpertDetailsModalIsOpen} onRequestClose={closeModal}>
        <ExpertLists btnFunc={closeModal} experts={experts} notify={notify} />
      </Modal>
      <Modal isOpen={addTagModalIsOpen} onRequestClose={closeModal}>
        <NewTag btnFunc={closeModal} />
      </Modal>
      <Modal isOpen={TagDetailsModalIsOpen} onRequestClose={closeModal}>
        <TagList btnFunc={closeModal} tags={tags} notify={notify} />
      </Modal>
      <ToastContainer />
    </div>
  );
}
