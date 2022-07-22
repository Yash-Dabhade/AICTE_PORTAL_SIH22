import React from 'react'
import SimpleCard from '../components/SimpleCard'
import MSBTE_logo from '../res/MSBTE_logo.png'

export default function () {
  return (
    <div> 
      <SimpleCard logo = {MSBTE_logo} desc = "Hello This is description from main file"  title = "Hello this is Title "/> 
    </div>
  )
}
