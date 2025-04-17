import { Link } from "react-router";
import "./logo.css";

const Logo = ({ size = "md" }) => {
  return (
    <Link to="/">
      <img src="/logo.svg" className={size} />
    </Link>
  );
};

export default Logo;
