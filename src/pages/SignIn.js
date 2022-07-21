import React from 'react'
import logo from '../res/AICTE_logo.png'

function SignIn() {
  return (
    <>
    
      <div className="container bg-slate-100 ">
      <img className="h-32 w-32 mt-2  mx-auto" src={logo} alt="Logo" />
        <p className ="text-4xl font-bold text-center mt-2">Sign in to your account</p>
        <div className="right flex flex-col bg-white mx-80 mt-10 p-10 w-1/2 h-1/6 rounded-xl drop-shadow-xl">
            <p >Email address</p>
            <input className=" mt-2 text-lg px-3 h-12  border border-gray-400 outline-1 outline-blue-500 rounded-md" type="text" placeholder="Email address"/>
            <h2 className="mt-2">Password</h2>
            <input className="text-lg mt-4 px-3 h-12 border border-gray-400 outline-1 outline-blue-500 rounded-md" type="password" placeholder="Password"/>
            <span className="mt-3 mx-5 text-violet-900   cursor-pointer hover:underline">Forgot your password?</span>
            <button class="btn px-3 mt-4 h-12 rounded-lg bg-blue-700   hover:bg-blue-600 font-bold text-white text-xl">Sign In</button>
   
            
    
        </div>
    </div>
    
    
  
    </>
  )
}

export default SignIn
