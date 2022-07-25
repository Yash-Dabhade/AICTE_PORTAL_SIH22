import React from "react";
import Modal from "react-modal";

export default function SubHead(props) {
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [renderELe, setRenderELe] = React.useState("");
  // let renderEle = UniversityForm;
  const setElement = () => {};

  function openModal() {
    Modal.setAppElement("#formRoot");
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }
  return (
    <div className="universities-subSection-header flex justify-center mw-full">
      <div className="white w-full">
        <div className="right bg-white px-2 w-full h-11  border-b border-neutral-500 flex justify-between">
          <p className="font-bold mt-2 w-80 ">{props.title}</p>
          <button
            className="btn px-2 mt-1 mb-1 ml-28 rounded-md h-8 w-max bg-gray-400 font-bold text-white hover:bg-gray-300  "
            onClick={props.btnFunc}
          >
            {`Create ${props.title}`}
          </button>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        contentLabel={props.label}
      >
        {/* <UniversityForm btnFunc={closeModal} /> */}
      </Modal>
    </div>
  );
}
SubHead.defaultProps = {
  heading: "Universities",
  btnText: "Create University",
  // btnFunc: "button Function here",
};

/*
import React from "react";
import UniversityForm from "../pages/forms/UniversityForm";

export default function SubHead(props) {
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [renderELe, setRenderELe] = React.useState("");
  let renderEle = UniversityForm;
  const setElement = () => {};

  function openModal() {
    Modal.setAppElement("#formRoot");
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <div className="white w-full" id="formRoot">
        <div className="right bg-white px-2 w-full h-11  border-b border-neutral-500 flex justify-between">
          <p className="font-bold mt-2 w-80 ">{props.heading}</p>
          <button
            className="btn px-2 mt-1 mb-1 ml-28 rounded-md h-8 w-max bg-gray-400 font-bold text-white hover:bg-gray-300  "
            onClick={openModal}
          >
            {`Create ${props.heading}`}
          </button>
        </div>
        <Modal
          isOpen={modalIsOpen}
          // onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          contentLabel={props.label}
        >
          <UniversityForm btnFunc={closeModal} />
        </Modal>
      </div>
    </>
  );
}
SubHead.defaultProps = {
  heading: "Universities",
  btnText: "Create University",
  btnFunc: "button Function here",
};


*/
