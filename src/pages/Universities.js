import React, { useEffect, useState } from "react";
import SimpleCard from "../components/SimpleCard";
import MSBTE_logo from "../res/MSBTE_logo.png";
import { ref as dbref, update, child, get } from "firebase/database";
import { database } from "../firebase/init-firebase";

export default function Universities() {
  const [data, setData] = useState([]);
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
      window.sessionStorage.setItem("UniversityCode", 1001);
      getAllUniversities();
    };
  }, []);

  return (
    <>
      <div>
        <div>
          <div className="flex gap-x-3 flex-wrap items-center content-center">
            {data.map((ele) => {
              return (
                <SimpleCard
                  logo={MSBTE_logo}
                  title={ele.initialName}
                  desc={ele.fullName}
                />
              );
            })}
            <SimpleCard logo={MSBTE_logo} title={"Test"} desc={"Test"} />
            <SimpleCard logo={MSBTE_logo} title={"Test"} desc={"Test"} />
            <SimpleCard logo={MSBTE_logo} title={"Test"} desc={"Test"} />
            <SimpleCard logo={MSBTE_logo} title={"Test"} desc={"Test"} />
          </div>
        </div>
      </div>
    </>
  );
}
