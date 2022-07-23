import React from 'react'
import { HiOutlineDotsVertical, HiOutlineMail, HiOutlinePhone } from "react-icons/hi";

export default function SimpleCard(props) {
  return (
    // py-24 -mx-52
      <>
<<<<<<< HEAD
      <div className="container   bg-slate-100 " >
        <div className="right bg-white mx-80 mt-10 p-5 w-72 h-1/2  rounded-lg drop-shadow-2xl scale-95 hover:scale-100 ease-in duration-500 py">
        <button className="mx-56 rounded-full hover:bg-slate-200" ><HiOutlineDotsVertical size="24px"/> </button>
        <img className="mx-20 h-24  w-24" src={props.logo} alt="Logo"/>
        
          <p className="font-bold mt-2" key={props.key}>{props.title}</p>
          <p className="text-sm">{props.desc}</p>
=======
      <div className="container  bg-slate-100 py-24 -mx-52">
        <div className="right bg-white mx-80 mt-10 p-5 w-72 h-96 rounded-lg drop-shadow-2xl scale-95 hover:scale-100 ease-in duration-500 py">
        <button className="mx-56 rounded-full hover:bg-slate-200"><HiOutlineDotsVertical size="24px"/> </button>
        <img className="mx-20 h-24  w-24" src={props.logo} alt="Logo"/>
        
          <p className="font-bold mt-2">{props.title}</p>
          <p>{props.desc}</p>
          
          <button id="email" className="btn px-16 pt-3 mt-2 h-12 w-60 rounded-md bg-slate-300  hover:bg-slate-200 font-light flex "><HiOutlineMail className="mx-2" size="26px" />Email</button>
          <button id="call" className="btn px-16 pt-3  mt-4 h-12 w-60 rounded-md  bg-slate-300  hover:bg-slate-200 font-light flex"><HiOutlinePhone className="mx-2" size="26px "/>Call</button>
>>>>>>> b537ff1cc0d2fc006e05015a8c037db85cffa43c
          
        </div>
      </div>
 
  </>
  )
}
SimpleCard.defaultProps = {
  title: 'Set title here',
  desc: 'Description here',
  logo:'logo here'
}