import { useOutletContext } from "react-router";
import React, { useEffect, useState } from "react";
import "../new-trip/new-trip.css";
import "./trip.css";
import TripDays from "../../components/trip-days/trip-days";
import ActivitiesList from "../../components/activities-list/activities-list";

const Trip = () => {
  const { trip, canEdit } = useOutletContext();
  const [activities, setActivities] = useState(null);
  const [activeDay, setActiveDay] = useState(trip.days[0]);
  const [days, setDays] = useState(trip.days);

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
        canEdit={canEdit}
      />
      <ActivitiesList
        activeDay={activeDay}
        days={days}
        activities={activities}
        setActivities={setActivities}
        canEdit={canEdit}
      />
    </div>
  );
};

export default Trip;
