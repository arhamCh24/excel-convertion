import mongoose from "mongoose";

const connect = async () => {
  try {
    await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB);
    // await mongoose.connect('mongodb://127.0.0.1:27017/tabs');
  } catch (error) {
    throw new Error("Connection failed!");
  }
};

export default connect;
