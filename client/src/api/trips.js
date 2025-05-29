import toast from "react-hot-toast";

const URL = "http://localhost:3000";
const HEADERS = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
};

export const deleteTrip = async (tripId) => {
  try {
    const response = await fetch(`${URL}/trips/${tripId}`, {
      method: "DELETE",
      headers: HEADERS,
    });

    return await response.json();
  } catch (error) {
    console.error("Failed to delete trip:", error);
    toast.error("Error al eliminar el viaje");
    throw error;
  }
};
