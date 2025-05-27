import { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import "./profile.css";
import Avatar from "../../components/avatar/avatar";
import {
  Calendar,
  DotsThreeVertical,
  MagnifyingGlass,
  Mountains,
  PencilSimple,
  Trash,
} from "phosphor-react";
import { UserContext } from "../../contexts/user-context/user-context";
import { formatFullDate } from "../../utils/utils";
import Input from "../../components/ui/input/input";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "../../components/ui/menu/menu";

const Profile = () => {
  const [trips, setTrips] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const getTrips = () => {
      fetch(`http://localhost:3000/trips/user/${user.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message) {
            return;
          }
          setTrips(data);
        });
    };
    getTrips();
  }, [user]);

  if (!user) {
    return (
      <div className="container profile">
        <h1>Cargando...</h1>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="container profile">
        <div className="card profile-header">
          <div className="trip-profile-info">
            <Avatar className={"trip-avatar-item"} user={user} />
            <div className="trip-profile-data">
              <h2>{user.name}</h2>
              <p>{user.email}</p>
              <Link className="edit-profile" to={"/profile/edit"}>
                Editar perfil
              </Link>
            </div>
          </div>
          <div className="trip-count">
            <p>Total de viajes</p>
            <h3>{trips.length}</h3>
          </div>
        </div>
        <div className="container-title-and-filters">
          <div className="container-title">
            <h1>Mis viajes</h1>
          </div>
          <div className="container-filters">
            <MagnifyingGlass className="search-icon-filter" size={12} />
            <Input
              className={"input-filter"}
              placeholder="Busca lo que quieras..."
            />
          </div>
        </div>

        <div className="separator"></div>

        {trips.length === 0 ? (
          <div className="container-info">
            <div className="container-no-trips">
              <Mountains className="mountain" size={84} />
              <h2>Tus vacaciones te esperan</h2>
              <p>Empezá a planificar el viaje de tus sueños</p>
              <NavLink to="/new-trip">
                <button className="button button-primary">Crear viaje</button>
              </NavLink>
            </div>
          </div>
        ) : (
          <div className="trips-container">
            {trips.map((trip, index) => (
              <Link
                key={index}
                to={`/trip/${trip.id}`}
                className="box-info shadow"
              >
                {/* <Menu>
                  <MenuButton
                    // onClick={(e) => {
                    //   e.stopPropagation();
                    // }}
                    className="menu-button-trip-card"
                  >
                    <button className="button button-secondary button-square">
                      <DotsThreeVertical size={20} />
                    </button>
                  </MenuButton>
                  <MenuItems anchor="bottom end" className="menu-items-logged">
                    <MenuItem>
                      <Link className="menu-item-link" to={`/profile`}>
                        <PencilSimple size={20} />
                        Editar
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <span
                        className="menu-item-link destructive"
                        // onClick={handleLogout}
                      >
                        <Trash size={20} /> Eliminar
                      </span>
                    </MenuItem>
                  </MenuItems>
                </Menu> */}
                <img src={trip.imageUrl} alt={`${trip.title} image`} />
                <div className="box-info-data">
                  <h3>{trip.title}</h3>
                  <p className="box-info-description">{trip.description}</p>
                  <div className="box-info-date-container">
                    <Calendar className="box-info-icon" size={22} />
                    <p className="box-info-date">
                      {formatFullDate(trip.startDate)}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
