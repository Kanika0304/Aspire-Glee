import mongoose from "mongoose";

const donationsSchema = new mongoose.Schema(
    {
        studentId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref:"student"
        },
        tenure: {
            type: "String",
            required: true,
        },
        isExpired: {
            type:String,
            enum:["Yes","No"],
            default:"No"
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("donations", donationsSchema);
