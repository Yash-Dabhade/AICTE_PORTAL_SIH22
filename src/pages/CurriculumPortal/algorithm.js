import React, { useState, useEffect } from "react";

function algorithm(props) {
  const [curriulum, setCurriculum] = useState(null);

  function getCurriculumFromRef(reference) {
    //get curriculum and setState
  }

  function checkIfAlreadyExisit(title) {
    //return true or false based on the
    let subject = new String(title).toLowerCase();
    curriculum.forEach((ele) => {
      if (new String(ele).toLocaleLowerCase().search(subject) !== -1) {
        return true;
      }
    });
    return false;
  }

  function searchPrerequisitesSem(prerequisite) {
    //return -1 if not found, else return the semeter number where it is found
    let subject = new String(prerequisite).toLowerCase();
    curriculum.forEach((ele) => {
      if (new String(ele).toLocaleLowerCase().search(subject) !== -1) {
        return ele.semester;
      }
    });
    return -1;
  }

  function compute() {
    //check if curriculum already exisits
    //pass report subject title
    if (checkIfAlreadyExisit(props.title)) {
      //show modal
    } else {
      //search for prerequisites and return if prerequisites present in which sem
      let prerequisitesInSem = searchPrerequisitesSem(props.prerequisite);
      if (prerequisitesInSem === -1) {
        //show modal that prerequisites not found, search for prerequisite
      } else {
        if (prerequisitesInSem === curriulum.totalSem) {
          // message = Shift preqruisite in prerequisitesInSem-1 and suggest to put props.title in prerequisitiesInSem
        } else {
          // message =  suggest to put props.title in prerequisitiesInSem + 1
        }
      }
    }
  }

  useEffect(() => {
    //getCurriculumFromRef(reference)
    //compute()
  }, []);

  return <div>algorithm</div>;
}

export default algorithm;
