import { CalendarPlus, Minus } from "phosphor-react";

const TripDays = ({ activeDay, setActiveDay, days, setDays }) => {
  if (!activeDay) return null;

  const handleActiveDay = (day) => {
    setActiveDay(day);
  };

  const handleDeleteDay = (deleteDay) => {
    const updateDays = days.filter((day) => day.date !== deleteDay);
    setDays(updateDays);

    if (new Date(activeDay).getTime() === new Date(deleteDay).getTime()) {
      const lastDay = updateDays[updateDays.length - 1].date;
      setActiveDay(lastDay);
    }
  };

  const handleAddDay = () => {
    const lastDay = new Date(days[days.length - 1].date);
    const newDay = new Date(lastDay);
    newDay.setDate(lastDay.getDate() + 1);
    setDays((prev) => [...prev, { date: newDay }]);
    setActiveDay(newDay);
  };

  return (
    <div className="card days-container">
      <h2>Dias</h2>
      <div className="days-buttons-container">
        {days.map((day, index) => (
          <button
            className={`${
              new Date(activeDay).getTime() === new Date(day.date).getTime()
                ? "active"
                : ""
            }`}
            key={index}
            onClick={() => handleActiveDay(day.date)}
          >
            Dia {index + 1}:{" "}
            {new Date(day.date).toLocaleDateString("es-ES", {
              day: "numeric",
              month: "long",
            })}
            {days.length - 1 === index ? (
              <span onClick={() => handleDeleteDay(day.date)}>
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
