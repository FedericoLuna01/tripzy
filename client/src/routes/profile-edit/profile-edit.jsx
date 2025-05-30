import { ArrowLeft, PencilSimple } from "phosphor-react";
import { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import "./profile-edit.css";
import Input from "../../components/ui/input/input";
import { UserContext } from "../../contexts/user-context/user-context";

const ProfileEdit = () => {
  const { user, handleUserLogin } = useContext(UserContext);
  const [name, setName] = useState(user.name || "");
  const [imageUrl, setImageUrl] = useState(user.imageUrl || "");
  const [errors, setErrors] = useState({
    title: false,
    imageUrl: false,
  });
  const navigate = useNavigate();

  const inputNameRef = useRef(null);
  const inputImageUrlRef = useRef(null);

  const handleNameChange = (event) => {
    setName(event.target.value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      title: false,
    }));
  };

  const handleImageUrlChange = (event) => {
    const url = event.target.value;
    setImageUrl(url);
    setErrors((prevErrors) => ({
      ...prevErrors,
      imageUrl: !url.match(/^(https?:\/\/[^\s$.?#].[^\s]*)$/i),
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newErrors = {
      title: name.length < 3,
      imageUrl: errors.imageUrl,
    };
    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      if (newErrors.title) {
        inputNameRef.current.focus();
      } else if (newErrors.imageUrl) {
        inputImageUrlRef.current.focus();
      }
      return;
    }

    const token = localStorage.getItem("token");

    fetch(`${import.meta.env.VITE_BASE_SERVER_URL}/profile/${user?.id || ""}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        imageUrl,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          return;
        }
        setName(data.user.name || "");
        setImageUrl(data.user.imageUrl || "");
        localStorage.setItem("token", data.token);
        handleUserLogin(data.token);
        toast.success("Perfil actualizado correctamente");
        navigate("/profile");
      })
      .catch((error) => console.log(error));
  };

  return (
    <section className="background">
      <div className="container edit-profile-container">
        <div className="edit-profile-header">
          <h1 className="title">Editar perfil</h1>
          <p>Actualiza tu información personal</p>
        </div>
        <form className="card" onSubmit={handleSubmit}>
          <h1>Datos personales</h1>
          <div className="input-group">
            <label htmlFor="name">Nombre</label>
            <Input
              ref={inputNameRef}
              onChange={handleNameChange}
              value={name || ""} // Ensure controlled input
              id={"name"}
              className={`${errors.title ? "error" : ""}`}
              placeholder="John Doe"
            />
            <p className="input-description">
              Este es el nombre que se mostrará en tu perfil y en los
              itinerarios que crees.
            </p>
            {errors.title && (
              <p className="error-message">
                El nombre debe contener al menos 3 caracteres
              </p>
            )}
          </div>
          <div className="input-group">
            <label htmlFor="imageUrl">Imagen de perfil</label>
            <Input
              ref={inputImageUrlRef}
              onChange={handleImageUrlChange}
              value={imageUrl || ""} // Ensure controlled input
              id={"imageUrl"}
              className={`${errors.imageUrl ? "error" : ""}`}
              placeholder="https://i.pravatar.cc/150?img=3"
            />
            <p className="input-description">
              Url de la imagen que se usara como tu foto de perfil.
            </p>
            {errors.imageUrl && (
              <p className="error-message">
                La url de la imagen debe ser válida
              </p>
            )}
            {imageUrl && !errors.imageUrl && (
              <img
                className="profile-image-preview"
                src={imageUrl}
                alt="Imagen de perfil"
              />
            )}
          </div>
          <div className="edit-profile-buttons-container">
            <Link className="link-button " to={"/profile"}>
              <button className="button button-secondary">
                <ArrowLeft size={20} />
                Cancelar
              </button>
            </Link>
            <button className="button button-primary profile-edit-button">
              Guardar cambios <PencilSimple size={20} />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ProfileEdit;
