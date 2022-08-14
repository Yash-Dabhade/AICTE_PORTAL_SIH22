import React, { useState, useEffect } from "react";
import TrendingIntro from "../../components/TrendingInro";
import NewCard from "../../components/NewCard";
import { ref as dbref, child, get } from "firebase/database";
import { database } from "../../firebase/init-firebase";
import ReportCard from "../../components/ReportCard";

function Trending() {
  const [allReports, setReports] = useState([]);

  function getAllReports() {
    const db = dbref(database);
    get(child(db, `/reportsList/`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          let data = snapshot.val();
          console.log(data);
          let allData = new Array();
          Object.keys(data).forEach((key) => {
            allData.push(data[key]);
          });
          // setState here
          setReports(allData);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    return () => {
      getAllReports();
    };
  }, []);

  return (
    <div id="formRoot" className="parent-section darkMode">
      <TrendingIntro />
      <div className="flex items-center justify-start gap-5 mt-6">
        <NewCard />
        {allReports.map((data) => {
          return (
            <ReportCard key={data.id} title={data.name} date={data.date} />
          );
        })}
      </div>
    </div>
  );
}

export default Trending;
