
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import eduParent from "../Models/eduParent.js";
import OTP from "../Models/OTP.js";
import OtpGenerator from "otp-generator";

// Function to send OTP
export const sendOTP1 = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email not found",
            });
        }

        const eduParentExists = await eduParent.findOne({ email });
        if (eduParentExists) {
            return res.status(400).json({
                success: false,
                message: "Edu Parent already registered",
            });
        }

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

export const login1 = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(404).json({
                success: false,
                message: "Insufficient data",
            });
        }

        const eduParentDetails = await eduParent.findOne({ email });

        if (!eduParentDetails) {
            return res.status(404).json({
                success: false,
                message: "User needs to register first",
            });
        }

        if (await bcrypt.compare(password, eduParentDetails.password)) {
            const payload = {
                id: eduParentDetails._id,
            };

            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "24h",
            });
            eduParentDetails.token = token;
            eduParentDetails.password = undefined;

            const options = {
                httpOnly: true,
            };

            res.cookie("token", token, options).status(200).json({
                success: true,
                eduParentDetails,
                token,
                message: "Login was successful",
            });
        } else {
            return res.status(401).json({
                success: false,
                message: "Entered credentials are incorrect",
            });
        }
    } catch (error) {
        console.error("Login failed", error.message);
        return res.status(500).json({
            success: false,
            message: "Login failed",
        });
    }
};

export const signUp1 = async (req, res) => {
    try {
        const { email, password, otp, parentName, phoneNumber } = req.body;

        if (!email || !password || !otp || !phoneNumber || !parentName) {
            return res.status(400).json({
                success: false,
                message: "Insufficient data",
            });
        }

        const eduParentExists = await eduParent.findOne({ email });
        if (eduParentExists) {
            return res.status(400).json({
                success: false,
                message: "User already registered",
            });
        }

        const otpEntry = await OTP.findOne({ email }).sort({ createdAt: -1 }).exec();
        if (!otpEntry) {
            return res.status(400).json({
                success: false,
                message: "No OTP found",
            });
        }

        const duration = (Date.now() - otpEntry.createdAt.getTime()) / 1000;
        if (duration > 300) {
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

        const hashedPassword = await bcrypt.hash(password, 10);

        const newEduParent = new eduParent({
            parentName,
            phoneNumber,
            email,
            password: hashedPassword,
        });

        const eduParentDetails = await newEduParent.save();

        return res.status(201).json({
            success: true,
            message: "Sign up successful",
            data: eduParentDetails,
        });
    } catch (error) {
        console.error("Sign up failed:", error.message);
        return res.status(500).json({
            success: false,
            message: "Sign up failed",
        });
    }
};