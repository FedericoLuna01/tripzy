import React, { useState } from "react";
import styles from "../new-activity-form.module.css";
import Input from "../../ui/input/input";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import useDebounce from "../../../hooks/useDebounce";
import LocationSuggestions from "./location-suggestions";

const LocationInput = ({
  activityLocation,
  setActivityLocation,
  errors,
  setErrors,
}) => {
  const [inputValue, setInputValue] = useState(activityLocation.address || "");
  const [suggestions, setSuggestions] = useState(["hola", "mundo"]);
  const debouncedInput = useDebounce(inputValue, 500);

  React.useEffect(() => {
    if (!debouncedInput) {
      setSuggestions([]);
      return;
    }
    // Llamada a la API de Places
    const fetchSuggestions = async () => {};
    fetchSuggestions();
  }, [debouncedInput]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    setActivityLocation((prev) => ({
      ...prev,
      address: event.target.value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      activityLocation: false,
      activityLocationLength: false,
    }));
  };

  const cities = [
    { description: "Madrid" },
    { description: "Barcelona" },
    { description: "Valencia" },
    { description: "Sevilla" },
    { description: "Bilbao" },
    { description: "Granada" },
    { description: "Málaga" },
    { description: "Zaragoza" },
    { description: "Salamanca" },
    { description: "Córdoba" },
  ];

  return (
    <div className="input-group full">
      <label htmlFor="activity-location">Ubicación</label>
      <LocationSuggestions
        suggestions={cities}
        value={inputValue}
        setValue={setInputValue}
        onChange={handleInputChange}
      />
      <p className="input-description">Ubicación de la actividad (opcional)</p>
      {errors.activityLocation && (
        <p className="error-message">Por favor, ingresa una ubicación válida</p>
      )}
      <div className={styles["map-container"]}>
        {/* <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
          <Map
            style={{ width: "100%", height: "400px", borderRadius: "4em" }}
            defaultCenter={{ lat: 22.54992, lng: 0 }}
            defaultZoom={3}
            gestureHandling={"greedy"}
            disableDefaultUI={true}
          />
        </APIProvider> */}
      </div>
    </div>
  );
};

export default LocationInput;
