import React, { useState, useEffect } from "react";
import { ref as dbref, child, get } from "firebase/database";
import { database } from "../firebase/init-firebase";
import SimpleCard2 from "./SimpleCard2";
import Departments from "../pages/Departments";

function InstituteDetails(props) {
  // const [courses, setCourses] = useState([]);
  // const [data, setData] = useState([]);

  // function getAllCourses() {
  //   const db = dbref(database);
  //   get(child(db, `${props.code}/courses/`))
  //     .then((snapshot) => {
  //       let allData = new Array();
  //       if (snapshot.exists()) {
  //         let data = snapshot.val();
  //         Object.keys(data).forEach((key) => {
  //           allData.push(data[key]);
  //         });
  //         setData(allData);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }
  // useEffect(() => {
  //   return () => {
  //     getAllCourses();
  //   };
  // }, []);

  function renderCourseDetails() {
    // Add Department name after fetching from database
    // props.sectionHeader()
    props.sectionSubHeader("Departments");
    props.root.render(<Departments />);
  }

  return (
    <>
      {/* <div className="flex flex-col">
        <div className="universities-section-header">
          <p>Institutes Name</p>
        </div>
        <div className="flex flex-col">These are details of institute</div>
      </div> */}
      <SimpleCard2 renderDetails={renderCourseDetails} />
      <SimpleCard2 renderDetails={renderCourseDetails} />
      <SimpleCard2 renderDetails={renderCourseDetails} />
      <SimpleCard2 renderDetails={renderCourseDetails} />
    </>
  );
}

export default InstituteDetails;
