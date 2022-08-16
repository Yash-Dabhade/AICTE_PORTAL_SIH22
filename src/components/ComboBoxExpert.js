import React, { useState, useEffect } from "react";
import MultiSelect from "react-multiple-select-dropdown-lite";
import "react-multiple-select-dropdown-lite/dist/index.css";
import { ref as dbref, set, update, child, get, push } from "firebase/database";
import { database } from "../firebase/init-firebase";

const App = () => {
  const [value, setvalue] = useState("");
  const [options, setOptions] = useState([]);

  const handleOnchange = (val) => {
    console.log(val);
    setvalue(val);
  };

  function getAllExpertEmails() {
    const db = dbref(database);
    get(child(db, `/expertsEmails/`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          let data = snapshot.val();
          let allData = new Array();
          Object.keys(data).forEach((key) => {
            allData.push({ label: data[key].email, value: data[key].email });
          });
          // setState here
          setOptions(allData);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    getAllExpertEmails();
    return () => {};
  }, []);

  return (
    <div className="app">
      <button className="border-2 mb-4 border-compatible border-slate-800 rounded-xl mt-2 p-2 hover:bg-slate-600 hover:text-zinc-100 font-semibold font-serif w-full">
        Apply Changes
      </button>
      <MultiSelect
        className="text-black "
        onChange={handleOnchange}
        options={options}
      />
    </div>
  );
};
export default App;
