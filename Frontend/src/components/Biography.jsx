const Biography = ({ img }) => {
  return (
    <div className="container biography">
      <div className="banner">
        <img src={img} alt="anoutImg" />
      </div>
      <div className="banner">
        <h3>Who We Are</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt quis
          voluptatum alias, voluptatibus commodi provident officiis esse, eum
          doloremque est error quasi, odio facere? Possimus aliquid illo
          perspiciatis maiores delectus et, nobis quam rem ea, voluptas,
          consequuntur vitae recusandae quae! Enim ipsum nam sequi a, labore
          iusto alias accusantium tenetur?
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. In, quasi.
        </p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Natus
          impedit hic tempore ut doloribus ipsa inventore reiciendis rerum eius
          error?
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro libero
          officiis veniam?
        </p>
      </div>
    </div>
  );
};

export default Biography;
