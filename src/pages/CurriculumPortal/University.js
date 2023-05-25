import React, { useState, useEffect } from "react";
import Card from "../../components/Card";
import MSBTE_logo from "../../res/MSBTE_logo.png";
import { ref as dbref, child, get } from "firebase/database";
import { database } from "../../firebase/init-firebase";
import SubHead from "../../components/SubHead";
import Header from "../../components/Header";
import Modal from "react-modal";
import UniversityForm from "../forms/UniversityForm";
import HashLoader from "react-spinners/HashLoader";

export default function University(props) {
  const [data, setData] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

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
          console.log(allData);
          setData(allData);
          setLoading(false);
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
    Modal.setAppElement("#formRoot");
  }

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  return (
    <div className="parent-section" id="formRoot">
      <div>
        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "85vh",
              width: "100%",
            }}
          >
            <HashLoader size={36} margin={2} loading={loading} />
          </div>
        ) : (
          <>
            <Header />
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
                    location={ele.location}
                    institutes={ele.institutes}
                    website={ele.website}
                    key={index}
                    HiddenRoute={props.HiddenRoute}
                  />
                );
              })}
            </div>
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
              <UniversityForm btnFunc={closeModal} />
            </Modal>
          </>
        )}
      </div>
    </div>
  );
}
