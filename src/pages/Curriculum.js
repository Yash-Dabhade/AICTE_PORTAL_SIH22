import React from "react";
import Modal from "react-modal";
import Header from "../components/Header";
import SubHead from "../components/SubHead";
import NewCurriculum from "./forms/NewCurriculum";
import DataTable from "react-data-table-component";
import axios from "axios";
import { database } from "../firebase/init-firebase";
import { ref as dbref, child, get, push } from "firebase/database";

function Curriculum(props) {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [allData, setAllData] = React.useState([]);
  const [tags, setTags] = React.useState([]);

  function getAllTags() {
    const db = dbref(database);
    get(child(db, `/tags/`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          let data = snapshot.val();
          let allData = new Array();
          Object.keys(data).forEach((key) => {
            allData.push(data[key]);
          });
          setTags(allData);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function getAllCurriculums(reference) {
    const db = dbref(database);
    // const ref = push(db,"")
    get(child(db, "/curriculumDetails/" + reference + "/"))
      .then((snapshot) => {
        let allData = new Array();
        if (snapshot.exists()) {
          let data = snapshot.val();
          Object.keys(data).forEach((key) => {
            allData.push(data[key]);
          });

          //setState
          setAllData(allData);
          console.log(allData);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  React.useEffect(() => {
    // getAllCurriculums();
    getAllTags();
    return () => {};
  }, []);

  function openModal() {
    Modal.setAppElement("#formRoot");
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <Header title={"Curriculum"} />
      <SubHead title={"Curriculum"} btnFunc={openModal} />

      <div className="university-boxes jsGridView">
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
              <div className="overflow-x-auto">
                <table className="min-w-full darkMode">
                  <thead className="border-b">
                    <tr>
                      <th
                        scope="col"
                        className="text-sm font-medium  px-6 py-4 text-left"
                      >
                        #
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium  px-6 py-4 text-left"
                      >
                        Code
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium  px-6 py-4 text-left"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium  px-6 py-4 text-left"
                      >
                        Phone
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium  px-6 py-4 text-left"
                      >
                        email
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium  px-6 py-4 text-left"
                      >
                        website
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {allData
                      ? allData.map((ele, index) => {
                          return (
                            <tr className="border-b" key={index}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium ">
                                {index + 1}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium ">
                                {ele.code}
                              </td>
                              <td className="text-sm  font-light px-6 py-4 whitespace-nowrap">
                                {ele.name}
                              </td>
                              <td className="text-sm  font-light px-6 py-4 whitespace-nowrap">
                                {ele.phone}
                              </td>
                              <td className="text-sm  font-light px-6 py-4 whitespace-nowrap">
                                {ele.email}
                              </td>
                              <td className="text-sm  font-light px-6 py-4 whitespace-nowrap">
                                {ele.website}
                              </td>
                            </tr>
                          );
                        })
                      : null}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <NewCurriculum
          btnFunc={closeModal}
          instituteCode={props.instituteCode}
          courseCode={props.courseCode}
          departmentCode={props.departmentCode}
          tags={tags}
        />
      </Modal>
    </>
  );
}

export default Curriculum;
