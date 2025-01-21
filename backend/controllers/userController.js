//API for adding user
import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken'
import { v2 as cloudinary } from 'cloudinary'
import appointmentModel from '../models/appointmentModel.js';
export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "Please fill in all fields" });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Invalid email address" });
        }

        if (password.length < 8) {
            return res.status(400).json({ message: "Password should be at least 8 characters" })
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const userData = {
            name,
            email,
            password: hashedPassword
        }

        const newUser = new userModel(userData);
        const user = await newUser.save()

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

        res.json({ success: true, token })
    }
    catch (err) {
        console.log(err)
        res.json({ success: false, message: err.message })
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email })

        if (!user) {
            return res.status(400).json({ message: "User does not exist" })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Credentials" })
        }
        else {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
            res.json({ success: true, token })
        }
    }
    catch (err) {
        console.log(err)
        res.json({ success: false, message: err.message })
    }
}

export const getProfile = async (req, res) => {
    try {
        const { userId } = req.body
        const userData = await userModel.findById(userId).select('-password')

        res.json({ success: true, userData })
    }
    catch (err) {
        console.log(err)
        res.json({ success: false, message: err.message })

    }
}

export const updateProfile = async (req, res) => {
    try {
        const { userId, name, email, phone, address, dob, gender } = req.body
        const imageFile = req.file

        if (!name, !phone, !dob, !gender) {
            return res.status(400).json({ message: "Data Missing" })
        }

        await userModel.findByIdAndUpdate(userId, { name, email, phone, address: JSON.parse(address), dob, gender })
        if (imageFile) {
            const image = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' })
            const imageURL = image.secure_url

            await userModel.findByIdAndUpdate(userId, { image: imageURL })
        }
        res.json({ success: true, message: "Profile Updated Successfully" })
    }
    catch (err) {
        console.log(err)
        res.json({ success: false, message: err.message })
    }
}

export const bookAppointment = async (req, res) => {
    try {
        const { userId, slotDate, slotTime, amount } = req.body;

        // Check for required parameters
        if (!userId || !slotDate || !slotTime || !amount) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        // Get user data and remove password
        const userData = await userModel.findById(userId).select('-password');
        if (!userData) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Create a new appointment
        const today = new Date(Date.now());
        const appointment = new appointmentModel({
            userId,
            slotDate,
            slotTime,
            userData,
            amount,
            date: today,
            cancelled: false,
            payment: false,
            isCompleted: false,
        });

        // Save the appointment
        await appointment.save();

        // Send success response
        res.json({
            success: true,
            message: 'Appointment booked successfully',
            appointment,
        });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: 'Error booking appointment', error: error.message });
    }
};



export const getBookedSlotsForToday = async (req, res) => {
    try {
        // Ensure a date is provided in the query parameters
        const { date } = req.query;

        if (!date) {
            return res.status(400).json({ success: false, message: "Date is required in the query parameters." });
        }

        // Convert the provided date to a Date object (assuming the input is in ISO format like "2025-01-07")
        const userDate = new Date(date);

        // Start of the day (midnight UTC)
        const startOfDay = new Date(Date.UTC(userDate.getUTCFullYear(), userDate.getUTCMonth(), userDate.getUTCDate(), 0, 0, 0, 0));

        // End of the day (just before midnight UTC)
        const endOfDay = new Date(Date.UTC(userDate.getUTCFullYear(), userDate.getUTCMonth(), userDate.getUTCDate(), 23, 59, 59, 999));


        // Find appointments for the specified date range
        const appointments = await appointmentModel.find({
            slotDate: { $gte: startOfDay, $lte: endOfDay },
            cancelled: false,
        });


        // Extract the booked time slots
        const bookedSlots = appointments.map(appointment => appointment.slotTime);

        // Respond with the booked slots for that day
        res.json({ success: true, bookedSlots });
    } catch (err) {
        console.error(err); // Log any errors
        res.status(500).json({ success: false, message: "Server error: " + err.message });
    }
};

export const myAppointments = async (req, res) => {
    try {
        console.log(req.query);
        
        const { userId } = req.query;
        

        // Validate that the userId is provided
        if (!userId) {
            return res.status(400).json({ success: false, message: "User ID is required" });
        }

        // Fetch all appointments for the given userId
        const appointments = await appointmentModel.find({ userId });

        res.json({ success: true, appointments });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Failed to retrieve data" });
    }
};

export const cancelAppointment = async (req, res) => {
    try {
        const { userId, appointmentId } = req.body;
        const appointment = await appointmentModel.findById(appointmentId);
        if (!appointment) {
            return res.status(404).json({
                success: false, message: "Appointment not found"
            });
        }
        // Check if the appointment belongs to the user
        if (appointment.userId.toString() !== userId) {
            return res.status(403).json({ success: false, message: "You do not have the authorization to cancel appointment" })
        }
        // Update the appointment status to cancelled
        const updatedAppointment = await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })
        res.json({ success: true, message: "Appointment cancelled successfully" });

    }
    catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Failed to cancel appointment" });
    }
}

//API for Appointment Booking using Razorpay







