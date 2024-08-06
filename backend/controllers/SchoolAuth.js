import OTP from "../Models/OTP.js";
import OtpGenerator from "otp-generator";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import school from "../Models/school.js";

// Function to send OTP
export const sendOTP = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email not found",
            });
        }

        // Check if user exists
        const schoolExists = await school.findOne({ email });
        if (schoolExists) {
            return res.status(400).json({
                success: false,
                message: "School  already registered",
            });
        }

        // Generate OTP
        let otp;
        let existingOTP;
        do {
            otp = OtpGenerator.generate(6, {
                digits: true,
                lowerCaseAlphabets: false,
                upperCaseAlphabets: false,
                specialChars: false,
            });
            existingOTP = await OTP.findOne({ otp });
        } while (existingOTP);

        // Create OTP entry
        const otpPayload = { email, otp };
        await OTP.create(otpPayload);

        return res.status(200).json({
            success: true,
            message: "OTP sent successfully",
        });
    } catch (error) {
        console.error("Error occurred while sending the OTP:", error);
        return res.status(500).json({
            success: false,
            message: "OTP sending failed",
        });
    }
};


export const login=async(req,res)=>{
    try{
        const {email,password}=req.body;

        if(!email || !password){
            return res.status(404).json({
                success: false,
                message: "Insufficient data"
            });
        }

        const schoolDetails=await school.findOne({email});

        if(!schoolDetails){
            return res.status(500).json({
                success: false,
                message: "User needs to register first "
            });
        }
        if(await bcrypt.compare(password,schoolDetails.password)){
            const payload={
                id:schoolDetails._id,
            }

            const token=jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn:"24h"
            });
            schoolDetails.token=token;
            schoolDetails.password=undefined;

            const options={
                httpOnly:true,
            }
            //setting up cookie with token = token 
            res.cookie("token",token,options).status(200).json({
                success:true,
                schoolDetails,
                token,
                message:"Login was successfull",
            })
        }
        else{
            return res.status(500).json({
                success: false,
                message: "Entered credentials are incorrect"
            });
        }


    }
    catch(error){
        console.log("Login failed",error.message);
        
    }
}


export const signUp = async (req, res) => {
    try {
        const { email, password, otp, schoolName, phoneNumber, schoolRef } = req.body;
        if (!email || !password || !otp || !schoolName || !phoneNumber || !schoolRef) {
            return res.status(400).json({
                success: false,
                message: "Insufficient data",
            });
        }

        const schoolExists = await school.findOne({ email });
        if (schoolExists) {
            return res.status(400).json({
                success: false,
                message: "User already registered",
            });
        }

        // Check if OTP is valid and not expired
        const otpEntry = await OTP.findOne({ email }).sort({ createdAt: -1 }).exec();
        if (!otpEntry) {
            return res.status(400).json({
                success: false,
                message: "No OTP found",
            });
        }

        const duration = (Date.now() - otpEntry.createdAt.getTime()) / 1000; // Duration in seconds
        if (duration > 300) { // OTP expiry duration (e.g., 5 minutes)
            return res.status(400).json({
                success: false,
                message: "OTP expired",
            });
        }

        if (otpEntry.otp !== Number(otp)) {
            return res.status(400).json({
                success: false,
                message: "Incorrect OTP",
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        const profilePayload = {
            schoolName,
            phoneNumber,
            email,
            password: hashedPassword,
            schoolRef,
        };
        const schoolDetails = await school.create(profilePayload);

        return res.status(201).json({
            success: true,
            message: "Sign up successful",
            data: schoolDetails,
        });
    } catch (error) {
        console.error("Sign up failed:", error.message);
        return res.status(500).json({
            success: false,
            message: "Sign up failed",
        });
    }
};

