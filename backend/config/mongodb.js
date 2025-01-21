import mongoose from "mongoose";

const connectDB = async() => {
    mongoose.connection.on('connected',() =>console.log("Database Connected"))

    await mongoose.connect(`${process.env.mongodb_URL}/DrPreeti`)
}

export default connectDB