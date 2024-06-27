import Hero from "../components/Hero";
import AppointmentForm from "../components/AppointmentForm";

const Appointment = () => {
  return (
    <>
      <Hero
        img={"/appointment.svg"}
        title={"Schedule Your Appointment | MeroCare Hospital"}
      />
      <AppointmentForm />
    </>
  );
};

export default Appointment;
