import mongoose from "mongoose";

export const dbConncection = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "HOSPITAL_MANAGEMENT_SYSTEM",
    })
    .then(() => {
      console.log("Connected to database successfully.");
    })
    .catch((error) => {
      console.log(`Some error occured while connecting to database: ${error}.`);
    });
};
