import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from "./component/Login.jsx"
import Signup from './component/Signup.jsx'
import Home from './component/Home.jsx'

function Routing() {
    return (
        <Routes>
            <Route path='/' element={<Login/>} />
            <Route path='/signup' element={<Signup/>} />
            <Route path='/home' element={<Home/>} />
        </Routes>
    )
}

export default Routing