import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

import HomePage from "../testing/HomePage"
import TestPage from "../testing/TestPage"

function AppRouter() {
  return (
    <Router>
        <Routes>
            <Route exact path='/' element={<HomePage/>} />
            <Route path='/home' element={<HomePage/>} />
            <Route path='/test' element={<TestPage/>} />
        </Routes>
    </Router>
  )
}

export default AppRouter