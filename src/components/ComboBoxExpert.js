import React, { useState, useEffect } from "react";
import MultiSelect from "react-multiple-select-dropdown-lite";
import "react-multiple-select-dropdown-lite/dist/index.css";
import { ref as dbref, set, update, child, get, push } from "firebase/database";
import { database } from "../firebase/init-firebase";
import { assignToExperts } from "../utils/dbHelper";

const App = ({ reportId, name, date }) => {
  const [emailsToAssign, setEmailsToAssign] = useState();
  const [options, setOptions] = useState([]);
  const [selectedEmails, setSelectedEmails] = useState([]);

  const handleOnchange = (val) => {
    setEmailsToAssign(val);
  };

  function getAllExpertEmails(selected) {
    const db = dbref(database);
    get(child(db, `/expertsEmails/`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          let data = snapshot.val();
          let allData = new Array();
          Object.keys(data).forEach((key) => {
            //showing only unselected emails
            if (!selected.includes(data[key].email))
              allData.push({ label: data[key].email, value: data[key].email });
            else
              allData.push({
                label: data[key].email,
                value: data[key].email,
                disabled: true,
              });
          });
          setOptions(allData);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function getAllExpertEmailsByReportID(reportID) {
    const db = dbref(database);
    get(child(db, `/reportDetails/${reportID}/expertsEmails/`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          let data = snapshot.val();
          setSelectedEmails(data);
          getAllExpertEmails(data);
        } else {
          getAllExpertEmails([]);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function handleAssignToExperts() {
    if (emailsToAssign) {
      let finalSelected = selectedEmails;
      finalSelected.push(...emailsToAssign.split(","));
      assignToExperts(reportId, name, date, finalSelected);
    }
  }

  useEffect(() => {
    getAllExpertEmailsByReportID(reportId);
    return () => {};
  }, []);

  return (
    <div className="app min-h-report w-full">
      <button
        onClick={handleAssignToExperts}
        className="btn btn-compatible border border-compatible rounded-xl p-2 font-semibold font-serif mb-3 w-full"
      >
        Apply Changes
      </button>
      {/* <div className="h-36 overflow-y-auto overflow-x-hidden"> */}
      <MultiSelect
        className="text-black w-selectBox"
        onChange={handleOnchange}
        options={options}
      />
      {/* </div> */}
    </div>
  );
};
export default App;
