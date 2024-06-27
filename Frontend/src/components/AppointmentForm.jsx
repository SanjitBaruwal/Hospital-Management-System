import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

//checkbox from mui===========================================================================
import Checkbox from "@mui/material/Checkbox";
import { toast } from "react-toastify";
const label = { inputProps: { "aria-label": "Checkbox demo" } };
// ===========================================================================================

const AppointmentForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [department, setDepartment] = useState("");
  const [doctorFirstName, setDoctorFirstName] = useState("");
  const [doctorLastName, setDoctorLastName] = useState("");
  const [appointment_Date, setAppointment_Date] = useState("");
  const [address, setAddress] = useState("");
  const [hasVisited, setHasVisited] = useState(false);
  const navigateTo = useNavigate();

  const departmentsArray = [
    "Pediatrics",
    "Orthopedic",
    "Cardiology",
    "Neurology",
    "Phisical Therapy",
    "Radiology",
    "Oncology",
    "Dermatology",
    "ENT",
  ];

  const [doctors, setDoctors] = useState([]);
  useEffect(() => {
    const fetchDoctors = async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/user/doctors`,
        { withCredentials: true }
      );
      setDoctors(data.doctors);
    };
    fetchDoctors();
  }, []);

  const handleAppointment = async (e) => {
    e.preventDefault();

    try {
      await axios
        .post(
          `${import.meta.env.VITE_SERVER_URL}/api/v1/appointment/post`,
          {
            firstName,
            lastName,
            email,
            department,
            phone,
            gender,
            dob,
            doctor_firstName: doctorFirstName,
            doctor_lastName: doctorLastName,
            appointment_date: appointment_Date,
            address,
            hasVisited,
          },
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          toast.success(res.data.message);
          setFirstName("");
          setLastName("");
          setEmail("");
          setDepartment("");
          setPhone("");
          setGender("");
          setDob("");
          setDoctorFirstName("");
          setDoctorLastName("");
          setAppointment_Date("");
          setAddress("");
          setHasVisited("");
          navigateTo("/");
        });
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <div className="container form-component appointment-form">
      <h2>Appointment Form</h2>
      <p>Please Fill up from To make appointment</p>

      <form onSubmit={handleAppointment}>
        <div>
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="number"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div>
          <input
            type="date"
            placeholder=" date of birth"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
          <input
            type="date"
            placeholder=" choose an appointment date"
            value={appointment_Date}
            onChange={(e) => setAppointment_Date(e.target.value)}
          />
          <select
            value={gender}
            onChange={(e) => {
              setGender(e.target.value);
            }}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div>
          <select
            value={department}
            onChange={(e) => {
              setDepartment(e.target.value);
            }}
          >
            <option value="">Select Department</option>
            {departmentsArray.map((department, index) => (
              <option value={department} key={index}>
                {department}
              </option>
            ))}
          </select>

          <select
            value={`${doctorFirstName} ${doctorLastName}`}
            onChange={(e) => {
              const [fName, lName] = e.target.value.split(" ");
              setDoctorFirstName(fName);
              setDoctorLastName(lName);
            }}
            disabled={!department}
          >
            <option value="">Select Doctor</option>
            {doctors
              .filter((doctor) => doctor.doctorDepartment === department)
              .map((doctor, index) => (
                <option
                  value={`${doctor.firstName} ${doctor.lastName}`}
                  key={index}
                >
                  {doctor.firstName} {doctor.lastName}
                </option>
              ))}
          </select>
        </div>

        <textarea
          placeholder="Address"
          style={{ resize: "none" }}
          rows={2}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <div className="have_you_visited">
          <span
            style={{
              width: "400px",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: "0px",
            }}
          >
            <p style={{ transform: "translateY(32%)" }}>
              Have you visited Before ?
            </p>

            <Checkbox
              {...label}
              checked={!!hasVisited}
              onChange={(e) => {
                setHasVisited(e.target.checked);
              }}
            />
          </span>
        </div>
        <div
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <button type="submit" style={{ cursor: "pointer" }}>
            Get Appointment
          </button>
        </div>
      </form>
    </div>
  );
};

export default AppointmentForm;
