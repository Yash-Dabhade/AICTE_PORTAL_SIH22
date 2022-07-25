import React from "react";
import SimpleCard2 from "../components/SimpleCard2";

function Departments(props) {
  function renderCurriculumDetails() {
    alert("Curriculum");
  }

  return <SimpleCard2 renderDetails={renderCurriculumDetails} />;
}

export default Departments;
