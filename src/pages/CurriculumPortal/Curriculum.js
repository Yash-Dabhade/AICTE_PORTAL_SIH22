import React, { useState } from "react";
import Modal from "react-modal";
import Header from "../../components/Header";
import SubHead from "../../components/SubHead";
import NewCurriculum from "../forms/NewCurriculum";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { database } from "../../firebase/init-firebase";
import { ref as dbref, child, get, push } from "firebase/database";

function Curriculum(props) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [allData, setAllData] = useState([]);
  const [tags, setTags] = useState([]);
  const [curriculumId, setCurriculumId] = useState("");
  const [totalSem, setTotalSem] = useState(null);
  const [filteredData, setFilteredData] = useState([]);

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

    get(child(db, "/curriculumDetails/" + reference + "/"))
      .then((snapshot) => {
        let allData = new Array();

        if (snapshot.exists()) {
          let data = snapshot.val();
          Object.keys(data).forEach((key) => {
            if (data[key].departmentCode === props.departmentCode)
              allData.push(data[key]);
          });
          //setState
          setAllData(allData);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function getCurriculumId() {
    if (props.selectedDept) {
      setTotalSem(props.selectedDept.totalSems);
      if (props.selectedDept.curriculum) {
        setCurriculumId(props.selectedDept.curriculum.curriculumId);
        getAllCurriculums(props.selectedDept.curriculum.curriculumId);
      }
    } else {
      let selectedDept = JSON.parse(
        window.localStorage.getItem("selectedDepartment")
      );
      setTotalSem(selectedDept.totalSems);
      if (selectedDept.curriculum) {
        setCurriculumId(selectedDept.curriculum.curriculumId);
        getAllCurriculums(selectedDept.curriculum.curriculumId);
      }
      // }
    }
  }

  function openModal() {
    Modal.setAppElement("#formRoot");
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const notify = () => {
    toast.success("ID Copied to Clipboard !", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  React.useEffect(() => {
    getCurriculumId();
    getAllTags();
    return () => {};
  }, []);

  function handleCurriculumSearch(searchQuery) {
    let filteredData = allData.filter((data) => {
      return (
        String(data.title)
          .toLowerCase()
          .trim()
          .includes(String(searchQuery).toLowerCase().trim()) ||
        String(data.code)
          .toLowerCase()
          .trim()
          .includes(String(searchQuery).toLowerCase().trim())
      );
    });
    setFilteredData(filteredData);
  }

  return (
    <>
      <Header title={"Curriculum"} />
      <SubHead
        title={"Curriculum"}
        btnFunc={openModal}
        copyRef={curriculumId}
        copyRefBtnFunc={notify}
      />
      <div className="search-wrapper m-2 border border-compatible">
        <input
          className="search-input"
          type="text"
          placeholder="Search"
          id="pageSearch"
          onChange={(e) => handleCurriculumSearch(e.target.value)}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          className="feather feather-search"
          viewBox="0 0 24 24"
        >
          <defs></defs>
          <circle cx="11" cy="11" r="8"></circle>
          <path d="M21 21l-4.35-4.35"></path>
        </svg>
      </div>
      <ToastContainer />
      <div className="university-boxes">
        <div className="flex flex-col">
          <div className="overflow-y-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
              <div className="overflow-y-scroll h-report">
                <table className="min-w-full darkMode">
                  <thead className="border-b">
                    <tr>
                      <th
                        scope="col"
                        className="text-sm font-medium py-4 text-center"
                      >
                        #
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium py-4 text-center"
                      >
                        Subject Code
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium py-4 text-center"
                      >
                        Subject Name
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium py-4 text-center"
                      >
                        Subject Level
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium py-4 text-center"
                      >
                        Subject Tag
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium py-4 text-center"
                      >
                        View
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData && filteredData.length > 0
                      ? filteredData.map((ele, index) => {
                          return (
                            <tr className="border-b" key={index}>
                              <td className=" text-sm font-medium py-4 text-center">
                                {index + 1}
                              </td>
                              <td className=" text-sm font-medium py-4 text-center">
                                {ele.code}
                              </td>
                              <td className="text-sm font-light py-4 text-center">
                                {ele.title}
                              </td>
                              <td className="text-sm font-light py-4 text-center">
                                {ele.level}
                              </td>
                              <td className="text-sm font-light py-4 text-center">
                                {ele.tag}
                              </td>
                              <td className="text-sm font-light py-4 text-center">
                                <a target="_blank" href={ele.fileUrl}>
                                  <button className="btn-compatible font-bold py-2 px-4 rounded-full">
                                    Open
                                  </button>
                                </a>
                              </td>
                            </tr>
                          );
                        })
                      : allData.map((ele, index) => {
                          return (
                            <tr className="border-b" key={index}>
                              <td className=" text-sm font-medium py-4 text-center">
                                {index + 1}
                              </td>
                              <td className=" text-sm font-medium py-4 text-center">
                                {ele.code}
                              </td>
                              <td className="text-sm font-light py-4 text-center">
                                {ele.title}
                              </td>
                              <td className="text-sm font-light py-4 text-center">
                                {ele.level}
                              </td>
                              <td className="text-sm font-light py-4 text-center">
                                {ele.tag}
                              </td>
                              <td className="text-sm font-light py-4 text-center">
                                <a target="_blank" href={ele.fileUrl}>
                                  <button className="btn-compatible font-bold py-2 px-4 rounded-full">
                                    Open
                                  </button>
                                </a>
                              </td>
                            </tr>
                          );
                        })}
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
          totalSems={totalSem ? totalSem : null}
          tags={tags}
        />
      </Modal>
    </>
  );
}

export default Curriculum;
