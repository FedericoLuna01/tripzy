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
      {user.imageUrl ? (
        <img src={user.imageUrl} alt="" />
      ) : (
        getInitials(user.name)
      )}
    </div>
  );
};

export default Avatar;
