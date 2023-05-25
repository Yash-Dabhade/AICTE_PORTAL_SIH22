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
  const [universityCode, setUniversityCode] = React.useState(null);

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
    setUniversityCode(window.sessionStorage.getItem("UniversityCode"));
    if (props.data !== null) {
      setInstitutesData(props.data);
      window.sessionStorage.setItem(
        window.sessionStorage.getItem("UniversityCode"),
        JSON.stringify(props.data)
      );
      if (!props.data.institutes) return;
      window.sessionStorage.setItem(
        window.sessionStorage.getItem("UniversityCode") + "Institutes",
        JSON.stringify(props.data.institutes)
      );
    } else {
      // if (window.sessionStorage.getItem() !== null) {
      let data = JSON.parse(
        window.sessionStorage.getItem(
          window.sessionStorage.getItem("UniversityCode")
        )
      );
      setInstitutesData(data);
      // }
    }
    return () => {};
  }, []);

  return (
    <>
      <Routes>
        {institutesData && (
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
                  universityCode={window.sessionStorage.getItem(
                    "UniversityCode"
                  )}
                  institutes={institutesData ? institutesData.institutes : null}
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
