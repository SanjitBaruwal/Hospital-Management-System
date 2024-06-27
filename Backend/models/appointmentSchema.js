import mongoose from "mongoose";
import validator from "validator";

const appointmentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: [3, "First Name must contain at least three letter"],
  },

  lastName: {
    type: String,
    required: true,
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

  appointment_date: {
    type: String,
    required: true,
  },

  department: {
    type: String,
    required: true,
  },

  doctor: {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
  },

  hasVisited: {
    type: Boolean,
    default: false,
  },

  doctorId: {
    type: mongoose.Schema.ObjectId,
    required: true,
  },

  address: {
    type: String,
    required: true,
  },

  status: {
    type: String,
    enum: ["Pending", "Accepted", "Rejected"],
    default: "Pending",
  },
});

export const Appointment = new mongoose.model("Appointment", appointmentSchema);
