import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema(
    {
        studentName: {
            type: String,
            required: true,
            trim: true,
        },
        educationalStat: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "educationalStat",
            },
        ],
        studentId:{
            type:"String"
        },
        familyIncome: {
            type: Number,
            required: true,
        },
        studentImage: {
            type: String,
        },

        isDisabled: {
            type: String,
            enum: ["Yes", "No"],
        },
        approved:{
            type:String,
            enum:["Yes","No"]
        },
        scholarShip:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"eduParent",
            default:null,
        }
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("student", StudentSchema);
