import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddlewares.js";
import { User } from "../models/userSchema.js";
import { generateToken } from "../utils/jwtToken.js";
import cloudinary from "cloudinary";

//register user and admin based on their role=====================================================================================

export const patientRegister = catchAsyncErrors(async (req, res, next) => {
  const { firstName, lastName, email, phone, password, gender, dob, role } =
    req.body;
  if (
    (!firstName || !lastName || !email || !phone,
    !password || !gender || !dob || !role)
  ) {
    return next(new ErrorHandler("Please fill all fields.", 400));
  }

  let user = await User.findOne({ email });
  if (user) {
    return next(new ErrorHandler("User Already Exists with this Email.", 400));
  }

  user = await User.create({
    firstName,
    lastName,
    email,
    phone,
    password,
    gender,
    dob,
    role,
  });
  generateToken(user, "User Registered Successfully !!😍", 200, res);
  // the follwing commented code is replaced via above function call
  // res.status(200).json({
  //   success: true,
  //   message: "User Registered Successfully !!😍",
  // });
});

export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password, confirmPassword, role } = req.body;
  if (
    role === "Patient" &&
    (!email || !password || !confirmPassword || !role)
  ) {
    return next(new ErrorHandler("Enter your All Credential.", 400));
  }

  if (role === "Patient" && password !== confirmPassword) {
    return next(
      new ErrorHandler("password and confirm password do not match.", 400)
    );
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid Password or Email.", 400));
  }

  const isPasswordMatch = await user.comparePassword(password);
  if (!isPasswordMatch) {
    return next(new ErrorHandler("Invalid Password or Email.", 400));
  }
  if (role !== user.role) {
    return next(new ErrorHandler("User with this role not exist.", 400));
  }

  generateToken(user, `${user.role} Logged in Successfully !!😍`, 200, res);
  // res.status(200).json({
  //   success: true,
  //   message: "User Logged in Successfully !!😍",
  // });
});

// add  new admin ===============================================================================================

export const addNewAdmin = catchAsyncErrors(async (req, res, next) => {
  const { firstName, lastName, email, phone, password, gender, dob } = req.body;
  if (
    (!firstName || !lastName || !email || !phone, !password || !gender || !dob)
  ) {
    return next(new ErrorHandler("Please fill all fields.", 400));
  }

  var isRegistered = await User.findOne({ email });
  if (isRegistered) {
    return next(
      new ErrorHandler(
        `${isRegistered.role} with this email already exist. Please try with another email.`
      )
    );
  }

  const new_admin = await User.create({
    firstName,
    lastName,
    email,
    phone,
    password,
    gender,
    dob,
    role: "Admin",
  });

  res.status(200).json({
    success: true,
    message: "new admin is added successfully.",
    new_admin,
  });
});

//get all doctors=========================================================================================================

export const getAllDoctors = catchAsyncErrors(async (req, res, next) => {
  const doctors = await User.find({ role: "Doctor" });
  res.status(200).json({
    success: true,
    doctors,
  });
});

//get all user====================================================================================================================

export const getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
});

//logout admin ===============================================================================================================

export const logoutAdmin = catchAsyncErrors(async (req, res, next) => {
  res
    .status(200)
    .cookie("adminToken", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
      secure: true,
      sameSite: "None",
    })
    .json({
      success: true,
      message: "Admin logout successfully",
    });
});

//logout patient ==============================================================================================

export const logoutPatient = catchAsyncErrors(async (req, res, next) => {
  res
    .status(200)
    .cookie("patientToken", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
      secure: true,
      sameSite: "None",
    })
    .json({
      success: true,
      message: "Patient Logout Successfully.",
    });
});

//register a doctor==================================================================================================

export const addNewDoctor = catchAsyncErrors(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Doctor Avatar is Required.!!", 400));
  }

  const { doctorAvatar } = req.files;
  // console.log(doctorAvatar);
  const allowedFormats = ["image/png", "image/jpeg", "image/webp"];

  if (!allowedFormats.includes(doctorAvatar.mimetype)) {
    return next(new ErrorHandler("File format not supported", 400));
  }

  const {
    firstName,
    lastName,
    email,
    phone,
    password,
    gender,
    dob,
    doctorDepartment,
  } = req.body;
  if (
    (!firstName || !lastName || !email || !phone,
    !password || !gender || !dob || !doctorDepartment)
  ) {
    return next(new ErrorHandler("Please fill all field.", 400));
  }

  var isRegistered = await User.findOne({ email });
  if (isRegistered) {
    return next(
      new ErrorHandler(
        `${isRegistered.role} with this email already exist. Please try with another email.`
      )
    );
  }

  // Upload an image
  const cloudinaryResponse = await cloudinary.uploader.upload(
    doctorAvatar.tempFilePath
  );
  // console.log(cloudinaryResponse);
  if (!cloudinaryResponse) {
    console.error(
      "Cloudinary Error:",
      cloudinaryResponse.error || "unknown error occured."
    );
  }

  const doctor = await User.create({
    firstName,
    lastName,
    email,
    phone,
    password,
    gender,
    dob,
    doctorDepartment,
    role: "Doctor",
    doctorAvatar: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
  });

  res.status(200).json({
    success: true,
    message: "new doctor registered successfully!",
    doctor,
  });
});
