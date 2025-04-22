import "./avatar.css";

const Avatar = ({ user }) => {
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="avatar">
      {user.image ? <img src={user.image} alt="" /> : getInitials(user.name)}
    </div>
  );
};

export default Avatar;
