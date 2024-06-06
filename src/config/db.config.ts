import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const connection = await mongoose
      .connect(`${process.env.MONGODB_URI}`)
      .then(() => {
        console.log(`DB Connected Succesfully`);
      })
      .catch((error) => console.log(error));
  } catch (error) {
    console.log(error);
  }
};
