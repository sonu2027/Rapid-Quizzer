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
import EventDetails from './component/EventDetails.jsx'

function Routing() {
    return (
        <Routes>
            <Route path='/' element={<Login/>} />
            <Route path='/register' element={<Signup/>} />
            <Route path='/home' element={<Home/>} />
            <Route path='/pastcontest' element={<PastContest/>} />
            <Route path='/leaderboard' element={<Dashboard/>} />
            <Route path='/verifyemail' element={<VerifyEmail/>} />
            <Route path='/changepassword' element={<ChangePassword/>} />
            <Route path='/home/addcontest' element={<AddContest/>} />
            <Route path='/home/eventdetails' element={<EventDetails/>} />
        </Routes>
    )
}

export default Routing