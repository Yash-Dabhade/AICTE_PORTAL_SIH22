import React, { useEffect, useState } from 'react'
import SimpleCard from '../components/SimpleCard'
import MSBTE_logo from '../res/MSBTE_logo.png'
import { ref as dbref, update, child, get } from "firebase/database";
import { database } from "../firebase/init-firebase";
import { data } from 'jquery';


export default function universities  () {

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
  useEffect(() =>{
    return() =>{
      getAllUniversities();
    };
  }, []);
  console.log(data);
  
  return (
    <> 
    <div >
      <div>
        {data.map((ele)=>{
            return (
            // <div className='h-56 grid grid-row-3 grid-cols-3  gap-4 content-start mx-10 '>
            // <div className=' h-96 grid grid-rows-3 grid-flow-col -mb-96 ml-96 gap-4'>
            <div className=' h-96 grid grid-rows-3 grid-flow-col -ml-10  gap-4'>


              <div className='displya-flex' key={ele.code}>
              {<SimpleCard  logo = {MSBTE_logo}  title = {ele.initialName} desc = {ele.fullName}/>}
              </div>
            </div>
            )
            })
            }
      </div>
    </div>
    </>
  )
}
