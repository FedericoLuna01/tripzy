import "./avatar.css";
const Avatar = ({ user }) => {
  const getInitials = () => {
    const [name, lastName] = user.name.split(" ");
    return `${name[0]}${lastName[0]} `;
  };

  return (
    <div className="avatar">
      {user.image ? <img src={user.image} alt="" /> : getInitials()}
    </div>
  );
};

export default Avatar;
