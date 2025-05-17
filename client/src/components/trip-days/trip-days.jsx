import { CalendarPlus, Minus } from "phosphor-react";
import { addDays, isEqual } from "date-fns";
import { useParams } from "react-router";
import { toast } from "react-hot-toast";
import { formatDay } from "../../utils/utils";
import "./trip-days.css";

const TripDays = ({ activeDay, setActiveDay, days, setDays }) => {
  const params = useParams();

  const handleActiveDay = (day) => {
    setActiveDay(day);
  };

  const handleDeleteDay = (deleteDay) => {
    if (days.length === 1) {
      return toast.error("No puedes eliminar el último día");
    }

    if (isEqual(new Date(activeDay.date), new Date(deleteDay.date))) {
      const lastDay = days[days.length - 2];
      setActiveDay(lastDay);
    }

    fetch(`http://localhost:3000/days/${deleteDay.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then(() => {
        toast.success("Día eliminado correctamente");
        setDays((prev) => prev.filter((day) => day.id !== deleteDay.id));
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Error al eliminar el día");
      });
  };

  const handleAddDay = () => {
    const lastDay = new Date(days[days.length - 1].date);
    const newDay = addDays(new Date(lastDay), 1);

    fetch(`http://localhost:3000/days`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        date: newDay,
        tripId: params.id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          return toast.error(data.message);
        }
        setActiveDay(data);
        setDays((prev) => [...prev, data]);
        toast.success("Día agregado correctamente");
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Error al agregar el día");
      });
  };

  return (
    <div className="card days-container">
      <h2>Dias</h2>
      <div className="days-buttons-container">
        {days.map((day, index) => (
          <button
            className={`${
              isEqual(new Date(activeDay.date), new Date(day.date))
                ? "active"
                : ""
            }`}
            key={index}
            onClick={() => handleActiveDay(day)}
          >
            Dia {index + 1}: {formatDay(day.date)}
            {days.length - 1 === index ? (
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  // TODO: Agregar modal de confirmación
                  handleDeleteDay(day);
                }}
              >
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
