import mongoose from "mongoose";

const eduParentSchema = new mongoose.Schema(
    {
        parentName: {
            type: String,
            required: true,
            trim: true,
        },
        phoneNumber: {
            type: String,
            required: true,
        },
        email:{
            type:String,
            required:true,
        },
        password:{
            type:String,
            required:true,
        },
        totalDonated:{
            type:Number,
            default:0,
        },
        pastRecords:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "donations",
            },
        ]
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("eduParent", eduParentSchema);
