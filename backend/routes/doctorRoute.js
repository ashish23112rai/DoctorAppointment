import express from 'express'
import { getDoctorProfile, loginDoctor, myAppointments, registerDoctor, updateAppointment, updateDoctorProfile } from '../controllers/doctorController.js'
import authDoctor from '../middlewares/authDoctor.js'
import upload from '../middlewares/multer.js'

const doctorRouter = express.Router()

doctorRouter.post('/register-doctor',registerDoctor)
doctorRouter.post('/login-doctor',loginDoctor)

doctorRouter.get('/get-profile-doctor',authDoctor,getDoctorProfile)

doctorRouter.post('/update-profile',upload.single('image'),authDoctor,updateDoctorProfile)

doctorRouter.get('/my-appointments',authDoctor,myAppointments)

doctorRouter.post('/update-appointment',authDoctor,updateAppointment)

export default doctorRouter;