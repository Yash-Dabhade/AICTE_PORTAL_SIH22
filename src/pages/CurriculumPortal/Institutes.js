import React from "react";
import Modal from "react-modal";
import Description from "../../components/Description";
import InstituteList from "../../components/InstituteList";
import ContactCard from "../../components/ContactCard";
import Header from "../../components/Header";
import SubHead from "../../components/SubHead";
import InstituteForm from "../forms/InstituteForm";
import Courses from "./Courses";
import { Routes, Route } from "react-router-dom";

function Institutes(props) {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [instituteCode, setInstituteCode] = React.useState();
  const [institutesData, setInstitutesData] = React.useState([]);

  const getInstituteCode = (e) => {
    setInstituteCode(e);
  };

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

  React.useEffect(() => {
    if (props.data !== null) {
      window.localStorage.setItem("institutesData", JSON.stringify(props.data));
      window.localStorage.setItem(
        "institutes",
        JSON.stringify(props.data.institutes)
      );
    } else {
      setInstitutesData(
        JSON.parse(window.localStorage.getItem("institutesData"))
      );
    }
    return () => {};
  }, []);

  return (
    <>
      <Routes>
        {props.data ? (
          <Route
            path="/"
            element={
              <>
                <Header />
                <SubHead title={"Institute"} btnFunc={createInstitute} />
                <div className="flex justify-between ">
                  <Description
                    title={props.data.initialName}
                    code={props.data.code}
                    fullName={props.data.fullName}
                  />
                  <ContactCard
                    email={props.data.email}
                    phone={props.data.phone}
                    location={props.data.location}
                    website={props.data.website}
                  />
                </div>
                <div className="universities-section-header">
                  <p>Institutes</p>
                </div>
                <InstituteList
                  institutes={props.data.institutes}
                  getInstituteCode={getInstituteCode}
                />
                <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
                  <InstituteForm
                    btnFunc={closeModal}
                    universityCode={props.data.code}
                  />
                </Modal>
              </>
            }
          ></Route>
        ) : (
          <Route
            path="/"
            element={
              <>
                <Header />
                <SubHead title={"Institute"} btnFunc={createInstitute} />
                <div className="flex justify-between ">
                  <Description
                    title={institutesData.initialName}
                    code={institutesData.code}
                    fullName={institutesData.fullName}
                  />
                  <ContactCard
                    email={institutesData.email}
                    phone={institutesData.phone}
                    location={institutesData.location}
                    website={institutesData.website}
                  />
                </div>
                <div className="universities-section-header">
                  <p>Institutes</p>
                </div>
                <InstituteList
                  institutes={institutesData.institutes}
                  getInstituteCode={getInstituteCode}
                />
                <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
                  <InstituteForm
                    btnFunc={closeModal}
                    universityCode={institutesData.code}
                  />
                </Modal>
              </>
            }
          />
        )}
        <Route
          path="courses/*"
          element={<Courses code={instituteCode ? instituteCode : null} />}
        ></Route>
      </Routes>
      {/* <Outlet /> */}
    </>
  );
}

export default Institutes;
