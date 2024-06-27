import Biography from "../components/Biography";
import Departments from "../components/department/Departments";
import Hero from "../components/Hero";
import MessageForm from "../components/MessageForm";
const Home = () => {
  return (
    <>
      <Hero img={"/hero.png"} title="Welcome to MeroCare Service" />
      <Biography img={"/about.png"} />
      <Departments />
      <MessageForm />
    </>
  );
};

export default Home;
