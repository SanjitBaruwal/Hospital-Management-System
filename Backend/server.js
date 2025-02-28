import app from "./app.js";

import { dbConncection } from "./database/databaseConnection.js";
dbConncection();

import { v2 as cloudinary } from "cloudinary";
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}.`);
});
