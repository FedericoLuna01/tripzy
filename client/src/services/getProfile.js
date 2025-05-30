export const getProfile = async () => {
  try {
    const response = await fetch(
      "import.meta.env.VITE_BASE_SERVER_URL/profile",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    const data = await response.json();

    if (data.message) {
      return null;
    }

    return data;
  } catch (error) {
    console.error("Error al obtener el perfil", error);
    return null;
  }
};
