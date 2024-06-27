const Hero = ({ img, title }) => {
  return (
    <div className="hero container">
      <div className="banner">
        <h1>{title}</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea
          consequuntur minus quasi. Distinctio molestiae doloremque eum sit
          accusantium veritatis laudantium a. Quia cumque voluptas blanditiis
          eaque soluta assumenda ducimus maxime necessitatibus exercitationem
          doloribus quod facilis, esse qui obcaecati aliquid consequatur in
          numquam fuga provident illum excepturi. In libero rem voluptatem!
        </p>
      </div>

      <div className="banner">
        <img
          draggable="false"
          src={img}
          alt="hero"
          className="animated-image"
        />
        <span>
          <img src="/Vector.png" alt="" />
        </span>
      </div>
    </div>
  );
};

export default Hero;
