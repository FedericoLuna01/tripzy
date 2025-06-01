import "./skeleton.css";

const Skeleton = ({ width, height }) => {
  return (
    <div
      style={{
        width: width || "100%",
        height: height || "20px",
      }}
      className="skeleton"
    ></div>
  );
};

export default Skeleton;
