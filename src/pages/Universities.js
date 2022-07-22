import React from 'react'
import SimpleCard from '../components/SimpleCard'
import MSBTE_logo from '../res/MSBTE_logo.png'
import {getAllUniversities} from '../utils/dbHelper'

export default function () {
    const arr = getAllUniversities()
    setTimeout(() => console.log(arr), 1000);

  return (
    <> 
    <div><h1></h1></div>
    <div className='h-56 grid grid-cols-3 gap-4 content-start mx-10 '>
      <SimpleCard logo = {MSBTE_logo} desc = "Hello This is MSBTE"  title = "Maharstra State Board of Technical Education "/> 
      <SimpleCard logo = {MSBTE_logo} desc = "Hello This is description from main file"  title = "All India Councile for technical education "/> 
      <SimpleCard logo = {MSBTE_logo} desc = "Hello This is description from main file"  title = "Hello this is Title "/> 
    </div>
    </>
  )
}
