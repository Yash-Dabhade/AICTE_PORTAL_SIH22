import React, { useState, useEffect } from "react";
import Card from "./Card";
import MSBTE_logo from "../res/MSBTE_logo.png";
import { ref as dbref, child, get } from "firebase/database";
import { database } from "../firebase/init-firebase";
import SubHead from "./SubHead";
import Header from "./Header";
import Modal from "react-modal";
import UniversityForm from "../pages/forms/UniversityForm";

export default function University() {
  const [data, setData] = useState([]);

  function getAllUniversities() {
    const db = dbref(database);
    get(child(db, `/universities/`))
      .then((snapshot) => {
        let allData = new Array();
        if (snapshot.exists()) {
          let data = snapshot.val();
          Object.keys(data).forEach((key) => {
            allData.push(data[key]);
          });
          setData(allData);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  useEffect(() => {
    return () => {
      getAllUniversities();
    };
  }, []);

  function createUniversity() {
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
    <div className="universities-section" id="formRoot">
      <Header title={"University"} />
      <SubHead title={"University"} btnFunc={createUniversity} />
      <div className="university-boxes jsGridView">
        {data.map((ele, index) => {
          return (
            <Card
              logo={MSBTE_logo}
              title={ele.initialName}
              fullName={ele.fullName}
              phone={ele.phone}
              email={ele.email}
              code={ele.code}
              institutes={ele.institutes}
              website={ele.website}
              key={index}
            />
          );
        })}
      </div>
      <Modal
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        // contentLabel={props.label}
      >
        <UniversityForm btnFunc={closeModal} />
      </Modal>
    </div>
  );
}
