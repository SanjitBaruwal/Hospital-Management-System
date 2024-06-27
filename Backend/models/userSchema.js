import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: [3, "First Name must contain at least three letter"],
  },

  lastName: {
    type: String,
    // required: true,
    minLength: [3, "Last Name must contain at least three letter"],
  },

  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, "Please Provide a Valid Email."],
  },

  phone: {
    type: String,
    required: true,
    minLength: [10, "Phone number must contain exact 10 digits"],
    maxLength: [10, "Phone number must contain exact 10 digits"],
  },

  dob: {
    type: Date,
    required: [true, "DOB is required."],
  },

  gender: {
    type: String,
    required: true,
    enum: ["Male", "Female"],
  },

  password: {
    type: String,
    minLength: [8, "Password Must Contain At Least 8 Characters.!!"],
    required: true,
    select: false,
  },

  role: {
    type: String,
    required: true,
    enum: ["Admin", "Patient", "Doctor"],
  },

  doctorDepartment: {
    type: String,
  },

  doctorAvatar: {
    public_id: String,
    url: String,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generateJsonWebToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

export const User = new mongoose.model("User", userSchema);
