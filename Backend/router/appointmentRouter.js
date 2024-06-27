import express from "express";
import {
  deleteAppointment,
  getAllAppointmets,
  postAppointment,
  updateAppointmentStatus,
} from "../controller/appointmentController.js";
import {
  isAdminAuthenticated,
  isPatientAuthenticated,
} from "../middlewares/auth.js";

//create a router
const router = express.Router();

//define router and in app.js register it.
router.post("/post", isPatientAuthenticated, postAppointment);
router.get("/getAllAppointment", isAdminAuthenticated, getAllAppointmets);
router.put("/update/:id", isAdminAuthenticated, updateAppointmentStatus);
router.delete("/delete/:id", isAdminAuthenticated, deleteAppointment);
export default router;
