import "./avatar.css";
// TODO: Agrear prop de imagen, y estilos en css
const Avatar = () => {
  return (
    <div
      style={{
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        backgroundColor: "var(--color-primary",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "20px",
        fontWeight: 600,
      }}
    >
      FL
    </div>
  );
};

export default Avatar;
