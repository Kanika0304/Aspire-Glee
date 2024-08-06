import mongoose from "mongoose";

const schoolSchema = new mongoose.Schema(
    {
        schoolName: {
            type: String,
            required: true,
            trim: true,
        },
        phoneNumber: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        schoolRef: {
            type: String,
            required: true,
            trim: true,
        },
        student: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "student", // Reference to the student model
            },
        ],
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("school", schoolSchema);
