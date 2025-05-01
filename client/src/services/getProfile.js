export const getProfile = async () => {
  try {
    const response = await fetch("http://localhost:3000/profile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

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
