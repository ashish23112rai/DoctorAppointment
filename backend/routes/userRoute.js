import express from 'express'
import { bookAppointment,cancelAppointment,getBookedSlotsForToday,getProfile, loginUser, myAppointments, registerUser, updateProfile } from '../controllers/userController.js';
import authUser from '../middlewares/authUser.js';
import upload from '../middlewares/multer.js';

const userRouter = express.Router()

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)

userRouter.get('/get-profile',authUser,getProfile)

userRouter.post('/update-profile',upload.single('image'),authUser,updateProfile)

userRouter.post('/book-appointment',authUser,bookAppointment)

userRouter.get('/bookedslots',getBookedSlotsForToday)

userRouter.get('/my-appointments',authUser,myAppointments)

userRouter.post('/cancel-appointment',authUser,cancelAppointment)


export default userRouter;