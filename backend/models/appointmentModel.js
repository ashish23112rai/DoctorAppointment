import mongoose from "mongoose";
const appointmentSchema = new mongoose. Schema({
userId: { type: String, required: true },
slotDate: { type: Date, required: true },
slotTime: { type: String, required: true },
userData: { type: Object, required: true },
amount: { type: Number, required: true },
date: { type: Number, required: true },
doctor: { type: String, default:'Dr Preeti' },
notes: { type: String, default: '' },
cancelled: { type: Boolean, default: false },
payment: { type: Boolean, default: false },
isCompleted: { type: Boolean, default: false }
})
const appointmentModel = mongoose.models.appointment || mongoose.model('appointment', appointmentSchema)
export default appointmentModel