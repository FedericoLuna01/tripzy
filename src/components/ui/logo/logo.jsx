import "./logo.css";

const Logo = ({ size = "md" }) => {
  return (
    <a href="/">
      <img src="./logo.svg" className={size} />
    </a>
  );
};

export default Logo;
