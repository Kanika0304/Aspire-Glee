import mongoose from "mongoose";

const beneficiarySchema = new mongoose.Schema(
    {
        beneficiaryName: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        gender: {
            type: String,
            required: true,
        },
        age: {
            type: String,
            required: true,
        },
        need: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("beneficiary", beneficiarySchema);
