import React, { useState } from "react";
import Modal from "react-modal";
import Header from "../components/Header";
import SubHead from "../components/SubHead";
import NewCurriculum from "./forms/NewCurriculum";
import DataTable from "react-data-table-component";
import axios from "axios";
import { database } from "../firebase/init-firebase";
import { ref as dbref, child, get, push } from "firebase/database";

function Curriculum(props) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [allData, setAllData] = useState([]);
  const [tags, setTags] = useState([]);
  const [curriculumId, setCurriculumId] = useState("");

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

    get(child(db, "/curriculumDetials/" + reference + "/"))
      .then((snapshot) => {
        let allData = new Array();

        if (snapshot.exists()) {
          let data = snapshot.val();
          console.log(data);
          Object.keys(data).forEach((key) => {
            if (data[key].departmentCode === props.departmentCode)
              allData.push(data[key]);
          });
          //setState
          setAllData(allData);
        } else {
          console.log(snapshot);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function getCurriculumId() {
    props.data.forEach((ele) => {
      if (ele.curriculum) {
        setCurriculumId(ele.curriculum.curriculumId);
        getAllCurriculums(ele.curriculum.curriculumId);
      }
    });
  }

  React.useEffect(() => {
    getCurriculumId();
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

      <div className="university-boxes">
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
                        Subject Code
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium  px-6 py-4 text-left"
                      >
                        Subject Name
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium  px-6 py-4 text-left"
                      >
                        Subject Level
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium  px-6 py-4 text-left"
                      >
                        Subject Tag
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium  px-6 py-4 text-left"
                      ></th>
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
                                {ele.title}
                              </td>
                              <td className="text-sm  font-light px-6 py-4 whitespace-nowrap">
                                {ele.level}
                              </td>
                              <td className="text-sm  font-light px-6 py-4 whitespace-nowrap">
                                {ele.tag}
                              </td>
                              <td className="text-sm  font-light px-6 py-4 whitespace-nowrap">
                                <a target="_blank" href={ele.fileUrl}>
                                  <button className="btn-compatible font-bold py-2 px-4 rounded-full">
                                    Open
                                  </button>
                                </a>
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
          reference={curriculumId}
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
