import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Doctors from './pages/Doctors'
import Contact from './pages/Contact'
import About from './pages/About'
import MyAppointments from './pages/MyAppointments'
import MyProfile from './pages/MyProfile'
import Appointment from './pages/Appointment'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { AppProvider } from './context/AppContext'
import DoctorDashboard from './pages/DoctorDashboard'
import DoctorProfile from './pages/DoctorProfile'

const App = () => {
  return (
    <AppProvider>
    <div>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/doctors/:speciality' element={<Doctors/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/my-appointments' element={<MyAppointments/>}/>
        <Route path='/my-profile' element={<MyProfile/>}/>
        <Route path='/appointment' element={<Appointment/>}/>
        <Route path='/doctor/dashboard' element={<DoctorDashboard/>}/>
        <Route path='/doctor/profile' element={<DoctorProfile/>}/>
      </Routes>
      <Footer/>
    </div>
    </AppProvider>
  )
}

export default App 
