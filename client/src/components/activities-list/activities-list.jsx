import React, { useState, useEffect, useMemo } from "react";
import toast from "react-hot-toast";
import { isEqual } from "date-fns";
import NewActivityForm from "../../components/new-activity-form/new-activity-form";
import { Backpack, MapPin, PencilSimple, Trash } from "phosphor-react";
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
  const safeActivities = useMemo(
    () => (Array.isArray(activities) ? activities : []),
    [activities]
  );

  const { handleOpen, handleClose, isOpen } = useModal();
  const [editingActivity, setEditingActivity] = useState(null);
  const [deleteSelectActivity, setDeleteSelectActivity] = useState(null);
  const [reactions, setReactions] = useState({});
  const [emojiPickerActivity, setEmojiPickerActivity] = useState(null);

  // Cargar reacciones para cada actividad
  useEffect(() => {
    const fetchReactions = async () => {
      for (const activity of safeActivities) {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_BASE_SERVER_URL}/reactions/activity/${
              activity.id
            }`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          const data = await response.json();

          if (data.reactions) {
            // Convertir el array de reacciones al formato del estado
            const reactionsMap = data.reactions.reduce((acc, reaction) => {
              acc[reaction.emoji] = {
                count: reaction.count,
                users: reaction.users,
              };
              return acc;
            }, {});

            setReactions((prev) => ({
              ...prev,
              [activity.id]: reactionsMap,
            }));
          }
        } catch (error) {
          console.error("Error al cargar reacciones:", error);
        }
      }
    };

    if (safeActivities.length > 0) {
      fetchReactions();
    }
  }, [safeActivities]);

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

  const handleAddReaction = async (activityId, emoji) => {
    try {
      await fetch(`${import.meta.env.VITE_BASE_SERVER_URL}/reactions/toggle`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ activityId, emoji }),
      });

      // Recargar las reacciones de esta actividad
      const reactionsResponse = await fetch(
        `${
          import.meta.env.VITE_BASE_SERVER_URL
        }/reactions/activity/${activityId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const reactionsData = await reactionsResponse.json();

      if (reactionsData.reactions) {
        const reactionsMap = reactionsData.reactions.reduce((acc, reaction) => {
          acc[reaction.emoji] = {
            count: reaction.count,
            users: reaction.users,
          };
          return acc;
        }, {});

        setReactions((prev) => ({
          ...prev,
          [activityId]: reactionsMap,
        }));
      }
    } catch (error) {
      console.error("Error al agregar reacción:", error);
    }
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

                    <div className="emoji-picker-wrapper">
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
                  </div>

                  <p className="activity-card-description">
                    {activity.description}
                  </p>

                  {activity.address && (
                    <div className="activity-card-location">
                      <MapPin size={16} /> {activity.address}
                    </div>
                  )}

                  <div className="reactions-display">
                    {Object.entries(reactions[activity.id] || {}).map(
                      ([emoji, reactionData]) => (
                        <button
                          key={emoji}
                          className="reaction-count"
                          onClick={() => handleAddReaction(activity.id, emoji)}
                          title={reactionData.users
                            ?.map((user) => user.name)
                            .join(", ")}
                        >
                          {emoji} {reactionData.count}
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
