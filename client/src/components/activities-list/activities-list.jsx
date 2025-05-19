import React, { useState } from "react";
import { formatDay } from "../../utils/utils";
import { isEqual } from "date-fns";
import NewActivityForm from "../../components/new-activity-form/new-activity-form";
import { PencilSimple, Trash } from "phosphor-react";
import useModal from "../../hooks/useModal";
import Modal from "../modal/modal";
import toast from "react-hot-toast";

const ActivitiesList = ({ activeDay, days, activities, setActivities }) => {
  const [editingActivity, setEditingActivity] = useState(null);
  const [deleteSelectActivity, setDeleteSelectActivity] = useState(null);
  const IS_ADMIN = true;
  const { handleOpen, handleClose, isOpen } = useModal();
  const handleDeleteActivity = (deleteActivity) => {
    fetch(`http://localhost:3000/activities/${deleteActivity.id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          return toast.error(data.message);
        }
        setActivities((prevActivities) =>
          prevActivities.filter((activity) => activity.id !== deleteActivity.id)
        );
        toast.success("Actividad eliminada correctamente");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error al eliminar la actividad");
      });
    handleClose();
  };

  return (
    <div className="card activities-container">
      <Modal
        isOpen={isOpen}
        handleClose={() => {
          setDeleteSelectActivity(null);
          handleClose();
        }}
        onSubmit={() => handleDeleteActivity(deleteSelectActivity)}
        entity={`actividad ${deleteSelectActivity?.title}`}
      />
      <h2>Actividades</h2>
      {activeDay && (
        <p className="day">
          Dia {days.findIndex((day) => isEqual(day.date, activeDay.date)) + 1}
          {": "}
          {formatDay(activeDay.date)}
        </p>
      )}
      <div className="activity-container">
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
                    className="button button-destructive button-square"
                    onClick={() => {
                      handleOpen();
                      setDeleteSelectActivity(activity);
                    }}
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
  );
};

export default ActivitiesList;
