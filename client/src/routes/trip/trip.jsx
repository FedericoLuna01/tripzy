import React, { useState } from "react";
import { useParams } from "react-router";
import "./trip.css";
import "../new-trip/new-trip.css";
import { DATA } from "../../data/data";
import TripDays from "../../components/trip-days/trip-days";
import NewActivityForm from "../../components/new-activity-form/new-activity-form";
import { formatDay } from "../../utils/utils";

const IS_ADMIN = true; // Para simular admin

const Trip = () => {
  const params = useParams();
  const TRIP = DATA.find((trip) => trip.id === parseInt(params.id));
  const [activities, setActivities] = useState(TRIP.days[0].activities);
  const [activeDay, setActiveDay] = useState(TRIP.startDate);
  const [days, setDays] = useState(TRIP.days);

  return (
    <div className="info-container">
      <TripDays
        activeDay={activeDay}
        setActiveDay={setActiveDay}
        initialDays={TRIP.days}
        days={days}
        setDays={setDays}
      />
      <div className="card activities-container">
        <h2>Actividades</h2>
        <p className="day">
          Dia {TRIP.days.findIndex((day) => day.date === activeDay) + 1}
          {": "}
          {formatDay(activeDay)}
        </p>
        <div className="activity-container">
          {activities
            .sort((a, b) => a.time.localeCompare(b.time))
            .map((activity, index) => (
              <div key={index} className="activity-card card no-shadow">
                <span>{activity.time}</span>
                <div>
                  <h3>{activity.title}</h3>
                  <p>{activity.description}</p>
                </div>
              </div>
            ))}
          {IS_ADMIN && <NewActivityForm setActivities={setActivities} />}
        </div>
      </div>
    </div>
  );
};

export default Trip;
