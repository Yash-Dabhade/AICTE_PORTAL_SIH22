import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import {
  BsFillBarChartLineFill,
  BsBookFill,
  BsFillDiagram3Fill,
  BsGearFill,
  BsFillFileEarmarkArrowDownFill,
} from "react-icons/bs";

function ExpertHome(props) {
  const [isNavOpen, setIsNavOpen] = useState(true);
  const [reportOpen, setReportOpen] = useState(true);
  const [assigedOpen, setAssignedOpen] = useState(false);
  const [respondedOpen, setRespondedOpen] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);

  function getReportsOpen(e) {
    setReportOpen(e);
  }
  function getAssignedOpen(e) {
    setAssignedOpen(e);
  }
  function getRespondedOpen(e) {
    setRespondedOpen(e);
  }
  function getFeedbackOpen(e) {
    setFeedbackOpen(e);
  }

  const links = ["Reports", "Assigned", "Responded", "Feedback"];
  const icons = [
    <BsBookFill size={22} className="mx-2" />,
    <BsFillBarChartLineFill size={22} className="mx-2" />,
    <BsFillDiagram3Fill size={22} className="mx-2" />,
    <BsFillFileEarmarkArrowDownFill size={22} className="mx-2" />,
  ];
  const linkFunc = [
    getReportsOpen,
    getAssignedOpen,
    getRespondedOpen,
    getFeedbackOpen,
  ];

  return (
    <div className="app-content Expert">
      <Sidebar
        links={links}
        icons={icons}
        linkFunc={linkFunc}
        isNavOpen={props.isNavOpen}
      />
    </div>
  );
}

export default ExpertHome;
