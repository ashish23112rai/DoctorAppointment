import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v2 as cloudinary } from 'cloudinary';
import doctorModel from '../models/doctorModel.js';
import appointmentModel from '../models/appointmentModel.js';

// Register a new doctor
export const registerDoctor = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "Please fill in all fields" });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Invalid email address" });
        }

        if (password.length < 8) {
            return res.status(400).json({ message: "Password should be at least 8 characters" });
        }

        const existingDoctor = await doctorModel.findOne({ email });
        if (existingDoctor) {
            return res.status(400).json({ message: "Doctor with this email already exists" });
        }

        // Hashing password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const doctorData = {
            name,
            email,
            password: hashedPassword,
        };

        const newDoctor = new doctorModel(doctorData);
        const doctor = await newDoctor.save();

        const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET);

        res.json({ success: true, token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: err.message });
    }
};

// Login doctor
export const loginDoctor = async (req, res) => {
    try {
        const { email, password } = req.body;

        const doctor = await doctorModel.findOne({ email });

        if (!doctor) {
            return res.status(400).json({ message: "Doctor does not exist" });
        }

        const isMatch = await bcrypt.compare(password, doctor.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET);

        res.json({ success: true, token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: err.message });
    }
};

// Get doctor profile
export const getDoctorProfile = async (req, res) => {
    try {
        const { doctorId } = req.body;

        const doctorData = await doctorModel.findById(doctorId).select('-password');

        if (!doctorData) {
            return res.status(404).json({ message: "Doctor not found" });
        }

        res.json({ success: true, doctorData });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: err.message });
    }
};

// Update doctor profile
export const updateDoctorProfile = async (req, res) => {
    try {
      const {
        doctorId,
        name,
        email,
        phone,
        gender,
        dob,
        specialty,
        address,
        availability,
        qualifications,
        experienceYears,
      } = req.body;
  
      const imageFile = req.file;
  
      // Validate required fields
      if (!doctorId || !name || !email) {
        return res.status(400).json({ success: false, message: "Required fields missing" });
      }
  
      // Prepare the updated data
      const updateData = {
        name,
        email,
        phone: phone || '000000000',
        gender: gender || 'Not Selected',
        dob: dob || 'Not Selected',
        specialty: specialty || 'Not Selected',
        address: address ? JSON.parse(address) : { line1: '', line2: '' },
        availability: availability === 'true', // Ensure availability is boolean
        qualifications: qualifications ? JSON.parse(qualifications) : [],
        experienceYears: Number(experienceYears) || 0,
      };
  
      // If image is provided, upload it to Cloudinary
      if (imageFile) {
        const image = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' });
        updateData.image = image.secure_url;
      }
  
      // Update the doctor's profile
      const updatedDoctor = await doctorModel.findByIdAndUpdate(doctorId, updateData, { new: true });
  
      if (!updatedDoctor) {
        return res.status(404).json({ success: false, message: "Doctor not found" });
      }
  
      res.json({ success: true, message: "Profile updated successfully", doctor: updatedDoctor });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: err.message });
    }
  };

  export const myAppointments = async (req, res) => {
    try {
        // Fetch all appointments from the appointment model
        const appointments = await appointmentModel.find();

        res.json({ success: true, appointments });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Failed to retrieve data" });
    }
};

export const updateAppointment = async (req, res) => {
    try {
      const { id } = req.body;  // Appointment ID is sent in the request body
      const { isCompleted, notes } = req.body; // Extract isCompleted and notes from the request body
  
      // Validate appointment ID
      if (!id) {
        return res.status(400).json({ success: false, message: "Appointment ID is required" });
      }
  
      // Check if the appointment exists
      const appointment = await appointmentModel.findById(id);
      if (!appointment) {
        return res.status(404).json({ success: false, message: "Appointment not found" });
      }
  
      // Update the appointment's isCompleted and notes fields
      if (typeof isCompleted === 'boolean') {
        appointment.isCompleted = isCompleted;
      }
      if (notes !== undefined) {
        appointment.notes = notes;  // Update notes if provided
      }
  
      // Save the updated appointment
      await appointment.save();
  
      res.status(200).json({
        success: true,
        message: "Appointment updated successfully",
        updatedAppointment: appointment,
      });
    } catch (err) {
      console.error("Error updating appointment:", err);
      res.status(500).json({ success: false, message: "Failed to update appointment" });
    }
  };
  
  
  

  
