import React, { useState, useEffect } from "react";
import styles from "../new-activity-form.module.css";
import {
  APIProvider,
  Map,
  useMap,
  useMapsLibrary,
  AdvancedMarker,
} from "@vis.gl/react-google-maps";
import useDebounce from "../../../hooks/useDebounce";
import LocationSuggestions from "./location-suggestions";

const LocationInput = ({
  activityLocation,
  setActivityLocation,
  errors,
  setErrors,
}) => {
  const [inputValue, setInputValue] = useState(activityLocation.address || "");
  const debouncedInput = useDebounce(inputValue, 500);
  const [suggestions, setSuggestions] = useState([]);
  const [markerPosition, setMarkerPosition] = useState(
    activityLocation.lat && activityLocation.lng
      ? { lat: activityLocation.lat, lng: activityLocation.lng }
      : null
  );
  const map = useMap();
  const placesLibrary = useMapsLibrary("places");

  // Sincronizar el inputValue con activityLocation cuando cambia desde el padre
  useEffect(() => {
    setInputValue(activityLocation.address || "");
    if (activityLocation.lat && activityLocation.lng) {
      const position = {
        lat: Number(activityLocation.lat),
        lng: Number(activityLocation.lng),
      };
      setMarkerPosition(position);
      if (map) {
        map.setCenter(position);
        map.setZoom(15);
      }
    } else {
      setMarkerPosition(null);
    }
  }, [activityLocation, map]);

  useEffect(() => {
    if (!debouncedInput || !placesLibrary) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      try {
        const request = { input: debouncedInput };
        const { suggestions } =
          await placesLibrary.AutocompleteSuggestion.fetchAutocompleteSuggestions(
            request
          );

        // Transformar las sugerencias al formato esperado
        const formattedSuggestions = suggestions.map((suggestion) => ({
          description: suggestion.placePrediction.text.text,
          place_id: suggestion.placePrediction.placeId,
          placePrediction: suggestion.placePrediction, // Mantener referencia para handleSuggestionClick
        }));

        setSuggestions(formattedSuggestions || []);
      } catch (error) {
        console.error("Error fetching autocomplete suggestions:", error);
        setSuggestions([]);
      }
    };

    fetchSuggestions();
  }, [debouncedInput, placesLibrary]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    if (event.target.value === "") {
      setActivityLocation({ address: "", lat: null, lng: null });
      setMarkerPosition(null);
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      activityLocation: false,
      activityLocationLength: false,
    }));
  };

  const handleSuggestionClick = async (suggestion) => {
    setInputValue(suggestion.description);
    setSuggestions([]);

    if (!placesLibrary || !suggestion.placePrediction) {
      return;
    }

    try {
      const place = suggestion.placePrediction.toPlace();
      await place.fetchFields({ fields: ["location"] });

      if (place.location) {
        const lat = place.location.lat();
        const lng = place.location.lng();
        setActivityLocation({
          address: suggestion.description,
          lat: lat,
          lng: lng,
        });
        setMarkerPosition({ lat, lng });
        if (map) {
          map.setCenter({ lat, lng });
          map.setZoom(15);
        }
      }
    } catch (error) {
      console.error("Error fetching place details:", error);
    }
  };

  return (
    <div className="input-group full">
      <label htmlFor="activity-location">Ubicación</label>
      <LocationSuggestions
        suggestions={suggestions}
        value={inputValue}
        onChange={handleInputChange}
        onSuggestionClick={handleSuggestionClick}
      />
      <p className="input-description">Ubicación de la actividad (opcional)</p>
      {errors.activityLocation && (
        <p className="error-message">Por favor, ingresa una ubicación válida</p>
      )}
      <div className={styles["map-container"]}>
        <Map
          style={{ width: "100%", height: "400px", borderRadius: "4em" }}
          defaultCenter={{ lat: 22.54992, lng: 0 }}
          defaultZoom={3}
          gestureHandling={"greedy"}
          disableDefaultUI={true}
          mapId="activity-location-map"
        >
          {markerPosition && <AdvancedMarker position={markerPosition} />}
        </Map>
      </div>
    </div>
  );
};

const LocationInputWrapper = (props) => (
  <APIProvider
    apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
    libraries={["places"]}
  >
    <LocationInput {...props} />
  </APIProvider>
);

export default LocationInputWrapper;
