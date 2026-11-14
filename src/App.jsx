import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/common/Navbar'
import Auth from './pages/Auth'

// import Footer from './components/common/Footer'

function App() {
 

  return (
    <>

           <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/auth' element={<Auth/>} />
           </Routes>


    </>
  )
}

export default App
