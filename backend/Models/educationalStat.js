import mongoose from "mongoose";

const EducationStatSchema = new mongoose.Schema(
    {
        studentId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref:"student"
        },
        grade: {
            type: Number,
            required: true,
        },
        percentage: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("educationalStat", EducationStatSchema);
