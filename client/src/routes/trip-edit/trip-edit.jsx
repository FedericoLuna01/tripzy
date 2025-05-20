import TripForm from "../../components/trip-form/trip-form";
import { Link, useParams } from "react-router";
import { useEffect } from "react";
import { useState } from "react";
import "./trip-edit.css";
import { ArrowLeft } from "phosphor-react";

const TripEdit = () => {
  const { id } = useParams();
  const [initialTrip, setInitialTrip] = useState({});

  useEffect(() => {
    fetch(`http://localhost:3000/trips/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setInitialTrip(data))
      .catch((error) => console.log(error));
  }, [id]);

  return (
    <section className="trip-layout">
      <div className="container trip-edit-container">
        <div className="trip-button-container">
          <Link to={`/trip/${id}`}>
            <button className="button button-outline">
              <ArrowLeft size={20} /> Volver
            </button>
          </Link>
        </div>
        <TripForm initialTrip={initialTrip} />
      </div>
    </section>
  );
};

export default TripEdit;
