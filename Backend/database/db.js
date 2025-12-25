import mongoose from "mongoose";

const connectDB = async () => {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    throw new Error('MONGO_URI is not defined');
}
  try {
    await mongoose.connect(process.env.MONGO_URI);
   
    console.log(`Successfully connected to MongoDB`);
  } catch (error) {
    console.log('MongoDB URI:', process.env.MONGO_URI);
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;