import { PencilSimple, Trash } from "phosphor-react";
import { useOutletContext } from "react-router";
import React, { useEffect, useState } from "react";
import { isEqual } from "date-fns";
import "../new-trip/new-trip.css";
import "./trip.css";
import NewActivityForm from "../../components/new-activity-form/new-activity-form";
import TripDays from "../../components/trip-days/trip-days";
import { formatDay } from "../../utils/utils";

const IS_ADMIN = true; // Para simular admin

const Trip = () => {
  const { trip } = useOutletContext();
  const [activities, setActivities] = useState(null);
  const [activeDay, setActiveDay] = useState(trip.days[0]);
  const [days, setDays] = useState(trip.days);
  const [editingActivity, setEditingActivity] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/activities/day/${activeDay.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener las actividades");
        }
        return response.json();
      })
      .then((activities) => {
        setActivities(activities);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [activeDay]);

  return (
    <div className="info-container">
      <TripDays
        activeDay={activeDay}
        setActiveDay={setActiveDay}
        initialDays={trip.days}
        days={days}
        setDays={setDays}
      />
      <div className="card activities-container">
        <h2>Actividades</h2>
        {activeDay && (
          <p className="day">
            Dia {days.findIndex((day) => isEqual(day.date, activeDay.date)) + 1}
            {": "}
            {formatDay(activeDay.date)}
          </p>
        )}
        <div className="activity-container">
          {/* TODO: Capaz conviene ponerlo en otro componente */}
          {activities &&
            activities
              .sort((a, b) => a.time.localeCompare(b.time))
              .map((activity, index) => (
                <div key={index} className="activity-card card no-shadow">
                  <span>{activity.time}</span>
                  <div>
                    <h3>{activity.title}</h3>
                    <p className="activity-card-description">
                      {activity.description}
                    </p>
                  </div>
                  <div className="activity-card-buttons">
                    <button
                      className="button button-outline button-square"
                      onClick={() => setEditingActivity(activity)}
                    >
                      <PencilSimple size={20} />
                    </button>
                    <button
                      // TODO: Agregar la funcionalidad de eliminar (con modal y backend)
                      className="button button-destructive button-square"
                    >
                      <Trash size={20} />
                    </button>
                  </div>
                </div>
              ))}
          {/* TODO: Mostrarlo solo si es el dueño o editor del viaje */}
          {IS_ADMIN && (
            <NewActivityForm
              setActivities={setActivities}
              editingActivity={editingActivity}
              setEditingActivity={setEditingActivity}
              activeDay={activeDay}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Trip;
