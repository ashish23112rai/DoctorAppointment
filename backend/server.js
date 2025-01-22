import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import doctorRouter from './routes/doctorRoute.js'


//app config
const app = express()
const port = process.env.port || 4000
connectDB()
connectCloudinary()

//Middlewares
app.use(express.json())
app.use(cors({
    origin: 'https://doctorappointment-frontend.onrender.com', // Add your frontend's development URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    credentials: true, // Include credentials if required
  }));
  

//api endpoint
app.use('/api/user',userRouter)
app.use('/api/doctor',doctorRouter)


app.get('/', (req, res) => {
    res.send('Api Working')
})
app.listen(port,()=> console.log("Server Started",port))
