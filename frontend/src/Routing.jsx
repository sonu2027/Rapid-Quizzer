import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from "./component/Login.jsx"
import Signup from './component/Signup.jsx'
import Home from './component/Home.jsx'
import VerifyEmail from './component/VerifyEmail.jsx'

function Routing() {
    return (
        <Routes>
            <Route path='/' element={<Login/>} />
            <Route path='/register' element={<Signup/>} />
            <Route path='/home' element={<Home/>} />
            <Route path='/verifyemail' element={<VerifyEmail/>} />
        </Routes>
    )
}

export default Routing