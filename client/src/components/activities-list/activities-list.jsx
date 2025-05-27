import React, { useState } from "react";
import toast from "react-hot-toast";
import { isEqual } from "date-fns";
import NewActivityForm from "../../components/new-activity-form/new-activity-form";
import { Backpack, PencilSimple, Trash } from "phosphor-react";
import { formatDay } from "../../utils/utils";
import useModal from "../../hooks/useModal";
import { Modal, ModalDescription, ModalTitle } from "../modal/modal";
import "./activities-list.css";

const ActivitiesList = ({
  activeDay,
  days,
  activities = [],
  setActivities,
  canEdit,
}) => {
  const [editingActivity, setEditingActivity] = useState(null);
  const [deleteSelectActivity, setDeleteSelectActivity] = useState(null);
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
      >
        <ModalTitle>Eliminar actividad</ModalTitle>
        <ModalDescription>
          ¿Estás seguro de que quieres eliminar la actividad{" "}
          <strong>{deleteSelectActivity?.title}</strong>? Esta acción no se
          puede deshacer.
        </ModalDescription>
      </Modal>
      <h2>Actividades</h2>
      {activeDay && (
        <p className="day">
          Dia {days.findIndex((day) => isEqual(day.date, activeDay.date)) + 1}
          {": "}
          {formatDay(activeDay.date)}
        </p>
      )}
      <div className="activity-container">
        {(activities || []).length === 0 ? (
          <div className="empty-activities">
            <Backpack className="icon-svg" size={48} />
            <p>No hay actividades para este día</p>
          </div>
        ) : (
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
                {canEdit && (
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
                )}
              </div>
            ))
        )}

        {canEdit && (
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
