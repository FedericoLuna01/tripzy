import React, { useState } from "react";
import toast from "react-hot-toast";
import { isEqual } from "date-fns";
import NewActivityForm from "../../components/new-activity-form/new-activity-form";
import { Backpack, PencilSimple, Trash } from "phosphor-react";
import { formatDay } from "../../utils/utils";
import useModal from "../../hooks/useModal";
import { Modal, ModalDescription, ModalTitle } from "../modal/modal";
import "./activities-list.css";

const EMOJIS = ["👍", "❤️", "😂", "😮", "🔥", "👏"];

const ActivitiesList = ({
  activeDay,
  days,
  activities,
  setActivities,
  canEdit,
}) => {
  const safeActivities = Array.isArray(activities) ? activities : [];

  const [editingActivity, setEditingActivity] = useState(null);
  const [deleteSelectActivity, setDeleteSelectActivity] = useState(null);
  const { handleOpen, handleClose, isOpen } = useModal();
  const [reactions, setReactions] = useState({});
  const [emojiPickerActivity, setEmojiPickerActivity] = useState(null);

  const handleDeleteActivity = (deleteActivity) => {
    fetch(
      `${import.meta.env.VITE_BASE_SERVER_URL}/activities/${deleteActivity.id}`,
      {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.message) return toast.error(data.message);

        setActivities((prev) =>
          prev.filter((activity) => activity.id !== deleteActivity.id)
        );
        toast.success("Actividad eliminada correctamente");
      })
      .catch(() => toast.error("Error al eliminar la actividad"));

    handleClose();
  };

  const handleAddReaction = (activityId, emoji) => {
    setReactions((prev) => {
      const current = prev[activityId] || {};
      const count = current[emoji] || 0;

      return {
        ...prev,
        [activityId]: { ...current, [emoji]: count + 1 },
      };
    });

    fetch(`${import.meta.env.VITE_BASE_SERVER_URL}/reactions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ activityId, emoji }),
    }).catch(() => {});
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
          Día {days.findIndex((day) => isEqual(day.date, activeDay.date)) + 1}:{" "}
          {formatDay(activeDay.date)}
        </p>
      )}

      <div className="activity-container">
        {safeActivities.length === 0 ? (
          <div className="empty-activities">
            <Backpack className="icon-svg" size={48} />
            <p>No hay actividades para este día</p>
          </div>
        ) : (
          safeActivities
            .sort((a, b) => a.time.localeCompare(b.time))
            .map((activity) => (
              <div key={activity.id} className="activity-card card no-shadow">
                <span>{activity.time}</span>

                <div className="activity-main">
                  <div className="title-row">
                    <h3>{activity.title}</h3>

                    <button
                      className="emoji-circle-btn"
                      onClick={() =>
                        setEmojiPickerActivity(
                          emojiPickerActivity === activity.id
                            ? null
                            : activity.id
                        )
                      }
                    >
                      😄
                    </button>

                    {emojiPickerActivity === activity.id && (
                      <div className="emoji-picker-popup">
                        {EMOJIS.map((emoji) => (
                          <button
                            key={emoji}
                            onClick={() =>
                              handleAddReaction(activity.id, emoji)
                            }
                            className="emoji-select-btn"
                          >
                            {emoji}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <p className="activity-card-description">
                    {activity.description}
                  </p>

                  <div className="reactions-display">
                    {Object.entries(reactions[activity.id] || {}).map(
                      ([emoji, count]) => (
                        <button
                          key={emoji}
                          className="reaction-count"
                          onClick={() => handleAddReaction(activity.id, emoji)}
                        >
                          {emoji} {count}
                        </button>
                      )
                    )}
                  </div>
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
