import { CalendarPlus, Minus } from "phosphor-react";
import { addDays, isEqual } from "date-fns";
import { useParams } from "react-router";
import { toast } from "react-hot-toast";
import { formatDay } from "../../utils/utils";
import "./trip-days.css";
import { useState } from "react";
import useModal from "../../hooks/useModal";
import { Modal, ModalDescription, ModalTitle } from "../modal/modal";

const TripDays = ({
  activeDay,
  setActiveDay,
  days,
  setDays,
  canEdit,
  setTrip,
}) => {
  const [deleteDay, setDeleteDay] = useState(null);
  const params = useParams();
  const { handleClose, handleOpen, isOpen } = useModal();

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

    fetch(`${import.meta.env.VITE_BASE_SERVER_URL}/days/${deleteDay.id}`, {
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
        setTrip((prev) => ({
          ...prev,
          days: prev.days.filter((day) => day.id !== deleteDay.id),
        }));
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Error al eliminar el día");
      });

    handleClose();
  };

  const handleAddDay = () => {
    const lastDay = new Date(days[days.length - 1].date);
    const newDay = addDays(new Date(lastDay), 1);

    fetch(`${import.meta.env.VITE_BASE_SERVER_URL}/days`, {
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

        setTrip((prev) => ({
          ...prev,
          days: [...prev.days, data],
        }));
        toast.success("Día agregado correctamente");
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Error al agregar el día");
      });
  };

  return (
    <div className="card days-container">
      <Modal
        isOpen={isOpen}
        handleClose={() => {
          setDeleteDay(null);
          handleClose();
        }}
        onSubmit={() => handleDeleteDay(deleteDay)}
      >
        <ModalTitle>
          Eliminar día{" "}
          {deleteDay?.date ? formatDay(deleteDay.date) : "(fecha inválida)"}
        </ModalTitle>
        <ModalDescription>
          ¿Estás seguro de que quieres eliminar el día{" "}
          <strong>
            {deleteDay?.date ? formatDay(deleteDay.date) : "(fecha inválida)"}
          </strong>
          ? Esta acción no se puede deshacer.
        </ModalDescription>
      </Modal>
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
            {days.length > 1 && days.length - 1 === index && canEdit ? (
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  setDeleteDay(day);
                  handleOpen();
                }}
              >
                <Minus size={16} />
              </span>
            ) : null}
          </button>
        ))}
      </div>
      {canEdit ? (
        <button className="button button-secondary" onClick={handleAddDay}>
          Agregar dia
          <CalendarPlus size={20} />
        </button>
      ) : null}
    </div>
  );
};
export default TripDays;
