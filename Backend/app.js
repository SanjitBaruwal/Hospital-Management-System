import express from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import messageRouter from "./router/messageRouter.js";
import userRouter from "./router/userRouter.js";
import appointmentRouter from "./router/appointmentRouter.js";
import { errorMiddleware } from "./middlewares/errorMiddlewares.js";

const app = express();
config({ path: "./cofig/config.env" });

//middleware to connect frontend and backend
app.use(
  cors({
    origin: [process.env.FRONTEND_URL, process.env.DASHBOARD_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// middleware
app.use(cookieParser());

// middleware to store data in json format
app.use(express.json());
app.get("/", (req, res) => {
  res.send("server is running");
});

// middleware to recognize different types of data types
app.use(express.urlencoded({ extended: true }));

// middleware to upload file
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);

//register router for send messsage
app.use("/api/v1/message", messageRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/appointment", appointmentRouter);
app.use(errorMiddleware);
export default app;
