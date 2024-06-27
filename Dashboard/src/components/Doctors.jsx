import { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { MdCall } from "react-icons/md";
import { MdLocalHospital } from "react-icons/md";
// ===================================================
import Lottie from "lottie-react";
import Loading from "./loading.json";
// ===================================================
const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const { isAuthenticated } = useContext(Context);

  // ===================================================
  const [isLoading, setIsLoading] = useState(false);

  // ===================================================

  useEffect(() => {
    const fetchDoctors = async () => {
      setIsLoading(true); // Set loading state to true
      await axios
        .get(`${import.meta.env.VITE_SERVER_API}/api/v1/user/doctors`, {
          withCredentials: true,
        })
        .then((res) => {
          setDoctors(res.data.doctors);
        })
        .catch((err) => {
          console.log("Error Occured while Fetching Doctors.", err);
        })
        .finally(() => {
          setIsLoading(false); // Set loading state to false
        });
    };

    fetchDoctors();
  }, []);
  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div className="section">
      <div className="page Doctors">
        <h1 style={{ textAlign: "center" }}>Doctors</h1>
        {isLoading && (
          <div style={{ textAlign: "center" }}>
            <Lottie animationData={Loading} />
          </div>
        )}
        {!isLoading && (
          <div className="DOCTORS">
            {doctors && doctors.length > 0
              ? doctors.map((doctor) => {
                  return (
                    <div className="CARD" key={doctor._id}>
                      <div className="DETAIL">
                        <div className="AVATAR">
                          <img src={doctor.doctorAvatar.url} alt="Avatar" />
                        </div>
                        <div className="TEXT">
                          <h3>
                            {doctor.firstName} {doctor.lastName}
                          </h3>
                          <p>
                            <MdLocalHospital />
                            Department: <span>{doctor.doctorDepartment}</span>
                          </p>
                          <p>
                            <MdCall /> <span>{doctor.phone}</span>
                          </p>
                          <p>
                            <MdEmail /> <span>{doctor.email}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })
              : "No Doctors Registered."}
          </div>
        )}
      </div>
    </div>
  );
};

export default Doctors;
