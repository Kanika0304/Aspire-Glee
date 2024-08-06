// Models/OTP.js
import mongoose from "mongoose";
import { mailSender } from "../utils/mailSender.js";

const OTPSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    otp: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Corrected pre-save middleware
OTPSchema.pre('save', async function (next) {
    try {
        // Only send email if it's a new OTP
        if (this.isNew) {
            await mailSender(this.email, "OTP FOR VERIFICATION", `Your OTP is: ${this.otp}`);
            console.log(`Mail sent to ${this.email} successfully`);
        }
    } catch (error) {
        console.error(`Error while sending the mail for OTP to ${this.email}:`, error.message);
    }
    next();
});

export default mongoose.model("OTP", OTPSchema);
