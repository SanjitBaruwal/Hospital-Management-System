import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddlewares.js";
import { Appointment } from "../models/appointmentSchema.js";
import { User } from "../models/userSchema.js";
export const postAppointment = catchAsyncErrors(async (req, res, next) => {
  const {
    firstName,
    lastName,
    gender,
    address,
    phone,
    email,
    dob,
    hasVisited,
    appointment_date,
    department,
    doctor_firstName,
    doctor_lastName,
  } = req.body;
  if (
    !firstName ||
    !lastName ||
    !gender ||
    !address ||
    !phone ||
    !email ||
    !dob ||
    !appointment_date ||
    !department ||
    !doctor_firstName ||
    !doctor_lastName
  ) {
    return next(new ErrorHandler("Please enter all details.", 400));
  }

  const isDoctor = await User.find({
    firstName: doctor_firstName,
    lastName: doctor_lastName,
    role: "Doctor",
    doctorDepartment: department,
  });
  if (isDoctor.length === 0) {
    return next(new ErrorHandler("Doctor not found", 400));
  }
  if (isDoctor.length > 1) {
    return next(
      new ErrorHandler(
        "Doctor Conflict, Please Contact through email or phone.",
        404
      )
    );
  }

  const doctorId = isDoctor[0]._id;
  const patientId = req.user._id;

  const appointment = await Appointment.create({
    firstName,
    lastName,
    gender,
    address,
    phone,
    email,
    dob,
    hasVisited,
    appointment_date,
    department,
    doctor: {
      firstName: doctor_firstName,
      lastName: doctor_lastName,
    },
    doctorId,
    patientId,
  });

  res.status(200).json({
    status: true,
    message: "Appointment sent successfully.",
    appointment,
  });
});

//get all appointments
export const getAllAppointmets = catchAsyncErrors(async (req, res, next) => {
  const appointments = await Appointment.find();
  res.status(200).json({
    success: true,
    appointments,
  });
});

// update status
export const updateAppointmentStatus = catchAsyncErrors(
  async (req, res, next) => {
    //update status using id
    const _id = req.params.id;
    let appointment = await Appointment.findById({ _id });
    if (!appointment) {
      return next(new ErrorHandler("Appointment Not found", 400));
    }
    appointment = await Appointment.findByIdAndUpdate(_id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    res.status(200).json({
      success: true,
      message: "appointment status updated.",
      appointment,
    });
  }
);

//delete appointment
export const deleteAppointment = catchAsyncErrors(async (req, res, next) => {
  const _id = req.params.id;
  let appointment = await Appointment.findById({ _id });
  if (!appointment) {
    return next(new ErrorHandler("Appointment not found.", 404));
  }

  await Appointment.findByIdAndDelete({ _id });
  res.status(200).json({
    success: true,
    message: "Appointment deleted!!.",
  });
});
