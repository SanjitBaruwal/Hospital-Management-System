import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { departments } from "./data";
const Departments = () => {
  const responsive = {
    extraLarge: {
      // the naming can be any, depends on you.
      breakpoint: { max: 3000, min: 1324 },
      items: 4,
    },
    large: {
      breakpoint: { max: 1324, min: 1005 },
      items: 3,
    },
    medium: {
      breakpoint: { max: 1005, min: 700 },
      items: 2,
    },
    small: {
      breakpoint: { max: 700, min: 0 },
      items: 1,
    },
  };
  return (
    <div className="container departments">
      <h2>Departments</h2>

      <Carousel
        responsive={responsive}
        removeArrowOnDeviceType={["medium", "small"]}
      >
        {departments.map((item) => (
          <div key={item.id} className="card">
            <div className="depart-name">{item.name}</div>
            <img src={item.image} alt={item.name} />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Departments;
