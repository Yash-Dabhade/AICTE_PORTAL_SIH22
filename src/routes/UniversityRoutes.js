import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import MSBTE_logo from "../res/MSBTE_logo.png";
import Modal from "react-modal";
import Header from "../components/Header";
import SubHead from "../components/SubHead";
import UniversityForm from "../pages/forms/UniversityForm";
import HashLoader from "react-spinners/HashLoader";
import Institutes from "../pages/CurriculumPortal/Institutes";
import { ref as dbref, child, get } from "firebase/database";
import { database } from "../firebase/init-firebase";
import { Routes, Route, Outlet } from "react-router-dom";

export default function UniversityRoutes() {
  const [data, setData] = useState();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedInstitute, setSelectedInstiute] = useState();
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState();

  const getSelectedInstitute = (index) => {
    setIndex(index);
    window.sessionStorage.setItem("UniversityCode", data[index].code);
  };

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
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  useEffect(() => {
    setLoading(false);
    // setLoading(false);
    console.log(data);
    getAllUniversities();
    console.log(data);
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
    <div className="parent-section darkMode" id="formRoot">
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
        <Routes>
          <Route
            path="/*"
            element={
              <>
                <Header />
                <SubHead title={"University"} btnFunc={createUniversity} />
                <div className="university-boxes jsGridView ">
                  {data &&
                    data.map((ele, index) => {
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
                          index={index}
                          key={index}
                          getSelectedInstitute={getSelectedInstitute}
                        />
                      );
                    })}
                </div>
                <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
                  <UniversityForm btnFunc={closeModal} />
                </Modal>
              </>
            }
          />
          <Route
            path="institutes/*"
            element={
              <Institutes data={data && data[index] ? data[index] : null} />
            }
          ></Route>
        </Routes>
      )}
      <Outlet />
    </div>
  );
}
