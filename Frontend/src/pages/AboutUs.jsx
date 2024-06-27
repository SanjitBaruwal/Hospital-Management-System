import Hero from "../components/Hero";
import Biography from "../components/Biography";
const AboutUs = () => {
  return (
    <>
      <Hero img={"/about.png"} title={"Learn more about us | MeroCare"} />
      <Biography img={"/whoweare.png"} />
    </>
  );
};

export default AboutUs;
