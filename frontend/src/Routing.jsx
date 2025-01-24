import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from "./component/Login.jsx"
import Signup from './component/Signup.jsx'
import Home from './component/Home.jsx'
import VerifyEmail from './component/VerifyEmail.jsx'
import ChangePassword from './component/ChangePassword.jsx'
import PastContest from "./component/PastContest.jsx"
import Dashboard from "./component/Dashboard.jsx"
import AddContest from './component/AddContest.jsx'

function Routing() {
    return (
        <Routes>
            <Route path='/' element={<Login/>} />
            <Route path='/register' element={<Signup/>} />
            <Route path='/home' element={<Home/>} />
            <Route path='/pastcontest' element={<PastContest/>} />
            <Route path='/dashboard' element={<Dashboard/>} />
            <Route path='/verifyemail' element={<VerifyEmail/>} />
            <Route path='/changepassword' element={<ChangePassword/>} />
            <Route path='/home/addcontest' element={<AddContest/>} />
        </Routes>
    )
}

export default Routing