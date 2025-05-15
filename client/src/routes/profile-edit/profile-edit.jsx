import { useEffect, useRef, useState } from "react";
import "./profile-edit.css";
import Input from "../../components/ui/input/input";
import { ArrowLeft, PencilSimple } from "phosphor-react";
import { getProfile } from "../../services/getProfile";
import toast from "react-hot-toast";
import { Link } from "react-router";

const ProfileEdit = () => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [errors, setErrors] = useState({
    title: false,
    imageUrl: false,
  });

  const inputNameRef = useRef(null);
  const inputImageUrlRef = useRef(null);

  const getUser = async () => {
    const data = await getProfile();
    if (data) {
      setUser(data);
      setName(data.name);
      setImageUrl(data.imageUrl);
    } else {
      setName("");
      setImageUrl("");
    }
  };

  useEffect(() => {
    getUser();
  }, []);

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
      title: name.length < 5,
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

    const updatedUser = {
      name,
      imageUrl,
    };
    const token = localStorage.getItem("token");

    fetch(`http://localhost:3000/profile/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedUser),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          return;
        }
        setUser(data);
        setName(data.name);
        setImageUrl(data.imageUrl);
        toast.success("Perfil actualizado correctamente");
      });
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
          <div>
            <label htmlFor="name">Nombre</label>
            <Input
              ref={inputNameRef}
              onChange={handleNameChange}
              value={name}
              id={"name"}
              className={`${errors.title ? "error" : ""}`}
              placeholder="John Doe"
            />
            <p className="description">
              Este es el nombre que se mostrará en tu perfil y en los
              itinerarios que crees.
            </p>
            {errors.title && (
              <p className="error-message">
                El nombre debe contener al menos 5 caracteres
              </p>
            )}
          </div>
          <div>
            <label htmlFor="imageUrl">Imagen de perfil</label>
            <Input
              ref={inputImageUrlRef}
              onChange={handleImageUrlChange}
              value={imageUrl}
              id={"imageUrl"}
              className={`${errors.imageUrl ? "error" : ""}`}
              placeholder="https://i.pravatar.cc/150?img=3"
            />
            <p className="description">
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
