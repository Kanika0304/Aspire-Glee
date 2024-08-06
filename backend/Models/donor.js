import mongoose from "mongoose";

const donarSchema = new mongoose.Schema(
    {
        DonarName: {
            type: "String",
            required: true,
        },
        email: {
            type: "String",
            required: true,
        },
        phoneNumber: {
            type: String,
            required: true,
        },
        clothingType: {
            type: String,
            required: true,
        },
        quantity: {
            type: String,
            required: true,
        },
        condition: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("donars",donarSchema);