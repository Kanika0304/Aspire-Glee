import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    const dbConnection = await mongoose.connect(process.env.MONGODB_URL);
    console.log("DB Connected Successfully");
  } catch (error) {
    console.log("DB Error: " + error);
  }
};

export default dbConnect;
