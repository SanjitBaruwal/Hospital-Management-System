import mongoose from "mongoose";
import validator from "validator";

const messageSchema = new mongoose.Schema({
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
  message: {
    type: String,
    required: true,
    minLength: [10, "message number must contain atleast 10 letters"],
  },
  createdAt: {
    type: Date,
    default: Date.now, // Set default value to current date/time
  },
});

export const Message = new mongoose.model("Message", messageSchema);
