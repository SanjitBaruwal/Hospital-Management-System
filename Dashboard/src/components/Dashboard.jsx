import { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { FaRegCheckCircle } from "react-icons/fa";
import { ImRadioUnchecked } from "react-icons/im";
import { FaHandSparkles } from "react-icons/fa6";

const Dashboard = () => {
  const { isAuthenticated, admin } = useContext(Context);
  console.log("authentication status of dashboard:", isAuthenticated);

  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      await axios
        .get(
          `${
            import.meta.env.VITE_SERVER_API
          }/api/v1/appointment/getAllAppointment`,
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          setAppointments(res.data.appointments);
        })
        .catch((err) => {
          console.log("Error Occured while Fetching Appoints.", err);
          // setAppointments({});
        });
    };

    const fetchDoctors = async () => {
      await axios
        .get(`${import.meta.env.VITE_SERVER_API}/api/v1/user/doctors`, {
          withCredentials: true,
        })
        .then((res) => {
          setDoctors(res.data.doctors);
        })
        .catch((err) => {
          console.log("Error Occured while Fetching Doctors.", err);
        });
    };
    fetchAppointments();
    fetchDoctors();
  }, []);

  const handleUpdateStatus = async (appointmentId, status) => {
    try {
      const { data } = await axios.put(
        `${
          import.meta.env.VITE_SERVER_API
        }/api/v1/appointment/update/${appointmentId}`,
        { status },
        { withCredentials: true }
      );
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment._id === appointmentId
            ? { ...appointment, status }
            : appointment
        )
      );
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <section className="dashboard page">
      <div className="banner">
        <div className="firstBox">
          <img src="/admin.png" alt="" />
          <div className="content">
            <div>
              <p>Hello,</p>
              <h5>
                {admin.lastName} <FaHandSparkles style={{ color: "yellow" }} />
              </h5>
            </div>
            <p>
              Welcome to the <strong>MeroCare Health</strong> Admin Dashboard.
              Manage doctors, patients, appointments, and more to ensure
              efficient healthcare services. Have a productive day!
            </p>
          </div>
        </div>
        <div className="secondBox">
          <p>Total Appointments</p>
          <h3>{appointments.length}</h3>
        </div>
        <div className="thirdBox">
          <p>Registered Doctors</p>
          <h3>{doctors.length}</h3>
        </div>
      </div>
      <div className="banner">
        <h5>Appointments</h5>
        <table>
          <thead>
            <tr>
              <th>Patient</th>
              <th>Date</th>
              <th>Doctor</th>
              <th>Department</th>
              <th>Status</th>
              <th>Visited</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment._id}>
                <td>
                  {appointment.firstName} {appointment.lastName}
                </td>
                <td>{appointment.appointment_date}</td>
                <td>
                  {appointment.doctor.firstName} {appointment.doctor.lastName}
                </td>
                <td>{appointment.department}</td>
                <td>
                  <select
                    value={appointment.status}
                    className={
                      appointment.status === "Pending"
                        ? "value-pending"
                        : appointment.status === "Accepted"
                        ? "value-accepted"
                        : "value-rejected"
                    }
                    onChange={(e) => {
                      handleUpdateStatus(appointment._id, e.target.value);
                    }}
                  >
                    <option value="Pending" className="value-pending">
                      Pending
                    </option>
                    <option value="Accepted" className="value-accepted">
                      Accepted
                    </option>
                    <option value="Rejected" className="value-rejected">
                      Rejected
                    </option>
                  </select>
                </td>
                <td>
                  {appointment.hasVisited === true ? (
                    <FaRegCheckCircle color="green" />
                  ) : (
                    <ImRadioUnchecked color="red" />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Dashboard;
