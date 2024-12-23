import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Intro from './pages/Intro'
import Home from './pages/Home'
import Registration from './pages/Registration'
import Login from './pages/Login'

import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Intro />}/>
        <Route path="/home" element={<Home />} />
        <Route path="/registration" element={<Registration/>}/>
        <Route path="/login" element={<Login />} />
      </Routes>
      <ToastContainer />
    </>
  )
}

export default App
