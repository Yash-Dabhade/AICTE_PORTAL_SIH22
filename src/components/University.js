import React, { useState, useEffect } from "react";
import Card from "./Card";
import MSBTE_logo from "../res/MSBTE_logo.png";
import { ref as dbref, child, get } from "firebase/database";
import { database } from "../firebase/init-firebase";
import SubHead from "./SubHead";

export default function University() {
  const [data, setData] = useState([]);
  const [header, setHeader] = useState("University");
  const [subheader, setSubheader] = useState("University");
  function getAllUniversities() {
    const db = dbref(database);
    get(child(db, `/universities/`))
      .then((snapshot) => {
        let allData = new Array();
        if (snapshot.exists()) {
          let data = snapshot.val();
          Object.keys(data).forEach((key) => {
            allData.push(data[key]);
          });
          setData(allData);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  useEffect(() => {
    return () => {
      getAllUniversities();
    };
  }, []);

  const sectionHeader = (e) => {
    setHeader(e);
  };
  const sectionSubHeader = (e) => {
    setSubheader(e);
  };

  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div className="universities-section">
      <div className="universities-section-header">
        <svg
          style={{ width: "42px", height: "42px" }}
          onClick={() => {
            window.location.href = "/";
          }}
        >
          <path
            d="M8 42V18L24.1 6 40 18v24H28.3V27.75h-8.65V42Zm3-3h5.65V24.75H31.3V39H37V19.5L24.1 9.75 11 19.5Zm13-14.65Z"
            strokeWidth="1"
            stroke="currentColor"
          />
        </svg>
        <p className="uHeader">{header}</p>
        <p className="time">
          {month[new Date().getMonth()]} , {new Date().getDate()}
        </p>
      </div>
      <div className="flex justify-center mw-full">
        <SubHead heading={subheader} />
      </div>
      <div className="university-boxes jsGridView">
        {data.map((ele, index) => {
          return (
            <Card
              sectionHeader={sectionHeader}
              sectionSubHeader={sectionSubHeader}
              logo={MSBTE_logo}
              title={ele.initialName}
              fullName={ele.fullName}
              phone={ele.phone}
              email={ele.email}
              code={ele.code}
              institutes={ele.institutes}
              website={ele.website}
              key={index}
            />
          );
        })}
      </div>
    </div>
  );
}
