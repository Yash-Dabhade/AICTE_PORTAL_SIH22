import React, {useState, useEffect } from "react";
import TrendingIntro from "../../components/TrendingInro";
import NewCard from "../../components/NewCard";
import { ref as dbref, child, get } from "firebase/database";
import { database } from "../../firebase/init-firebase";

function Trending() {
  const [data, setData] = useState([]);

  function getAllReports() {
    const db = dbref(database);
    get(child(db, `/reportsList/`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          let data = snapshot.val();
          let allData = new Array();
          Object.keys(data).forEach((key) => {
            allData.push(data[key]);
          });
          // setState here
          //ex : setData(allData)
          console.log(allData);
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
    <div className="parent-section darkMode">
      <TrendingIntro />
      <div className="flex m-8">
      {data.map((ele) => {
        console.log(ele)
                return(
                <NewCard date={ele.date} name={ele.name} key={ele.id}/>
                )
              })}
      </div>
    </div>
  );
}

export default Trending;
