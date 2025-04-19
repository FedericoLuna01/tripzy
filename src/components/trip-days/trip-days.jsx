import { CalendarPlus, Minus } from "phosphor-react";
import React from "react";
import { useState } from "react";

const TripDays = () => {
  const [days, setDays] = useState([]);
  const [activeDay, setActiveDay] = useState("");

  const handleActiveDay = (day) => {
    setActiveDay(day);
  };
  const handleDeleteDay = (deleteDay) => {
    const updateDays = days.filter((day) => (day == deleteDay ? null : day));
    setDays(updateDays);
  };

  const handleAddDay = () => {
    const newDay =
      days.length > 0
        ? new Date(
            new Date(days[days.length - 1]).setDate(
              new Date(days[days.length - 1]).getDate() + 1
            )
          )
        : new Date();
    setDays((prev) => [...prev, newDay]);
    setActiveDay(newDay);
  };

  return (
    <div className="card days-container">
      <h2>Dias</h2>
      <div className="days-buttons-container">
        {days.map((day, index) => (
          <button
            className={`${activeDay === day ? "active" : ""}`}
            key={index}
            onClick={() => handleActiveDay(day)}
          >
            Dia {index + 1}:{" "}
            {new Date(day).toLocaleDateString("es-ES", {
              day: "numeric",
              month: "long",
            })}
            {days.length - 1 === index ? (
              <span onClick={() => handleDeleteDay(day)}>
                <Minus size={16} />
              </span>
            ) : null}
          </button>
        ))}
      </div>
      <button className="button button-secondary" onClick={handleAddDay}>
        Agregar dia
        <CalendarPlus size={20} />
      </button>
    </div>
  );
};
export default TripDays;
