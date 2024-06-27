import { useContext, useState } from "react";
import { Context } from "../main";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { MdCloudUpload } from "react-icons/md";

// ================================================================================
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
// ================================================================================

const AddDoctor = () => {
  const { isAuthenticated } = useContext(Context);
  const [doctorAvatar, setDoctorAvatar] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [doctorDepartment, setDoctorDepartment] = useState("");
  const [doctorAvatarPreview, setDoctorAvatarPreview] = useState("");

  const navigateTo = useNavigate();

  const handleAvatar = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setDoctorAvatarPreview(reader.result);
      setDoctorAvatar(file);
    };
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("dob", dob);
    formData.append("gender", gender);
    formData.append("password", password);
    formData.append("doctorDepartment", doctorDepartment);
    formData.append("doctorAvatar", doctorAvatar);
    formData.append("doctorAvatarPreview", doctorAvatarPreview);

    await axios
      .post(
        `${import.meta.env.VITE_SERVER_API}/api/v1/user/admin/add_doctor`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      )
      .then((res) => {
        toast.success(res.data.message);
        navigateTo("/");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <section className="page">
      <div className="container form-component add-doctor-form">
        <img
          src="/Designer.png"
          alt=""
          style={{ height: "150px", width: "150px" }}
        />
        <h1 className="form-title">ADD NEW Doctor</h1>

        <form onSubmit={handleRegister}>
          <div className="meroStyle">
            <div className="igm">
              <img
                src={
                  doctorAvatarPreview
                    ? `${doctorAvatarPreview}`
                    : "/maleavatar.png"
                }
                alt=""
              />
            </div>
            <label htmlFor="fileInput">
              <div className="ip">
                <MdCloudUpload style={{ fontSize: "40px", color: "#444" }} />
                <input id="fileInput" type="file" onChange={handleAvatar} />
              </div>
            </label>
          </div>
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
            <select
              value={doctorDepartment}
              onChange={(e) => {
                setDoctorDepartment(e.target.value);
              }}
            >
              <option value="">Select Department</option>
              {departmentsArray.map((department, index) => (
                <option value={department} key={index}>
                  {department}
                </option>
              ))}
            </select>
          </div>
          <div>
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
            <input
              type="password"
              placeholder="create your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <button type="submit" style={{ cursor: "pointer" }}>
              ADD NEW DOCTOR
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
export default AddDoctor;
