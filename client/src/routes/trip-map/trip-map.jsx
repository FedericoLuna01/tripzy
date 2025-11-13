import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  useMap,
} from "@vis.gl/react-google-maps";
import { useEffect, useState, useMemo } from "react";
import { isEqual } from "date-fns";
import { formatDay } from "../../utils/utils";
import "./trip-map.css";

const TripMapContent = ({ activeDay }) => {
  const [activities, setActivities] = useState([]);
  const map = useMap();

  useEffect(() => {
    if (!activeDay?.id) return;

    fetch(
      `${import.meta.env.VITE_BASE_SERVER_URL}/activities/day/${activeDay.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener las actividades");
        }
        return response.json();
      })
      .then((data) => {
        setActivities(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [activeDay]);

  const activitiesWithLocation = useMemo(() => {
    return activities.filter(
      (activity) => activity.latitude && activity.longitude
    );
  }, [activities]);

  useEffect(() => {
    if (!map || activitiesWithLocation.length === 0) return;

    if (activitiesWithLocation.length === 1) {
      map.setCenter({
        lat: parseFloat(activitiesWithLocation[0].latitude),
        lng: parseFloat(activitiesWithLocation[0].longitude),
      });
      map.setZoom(15);
    } else {
      const bounds = new window.google.maps.LatLngBounds();
      activitiesWithLocation.forEach((activity) => {
        bounds.extend({
          lat: parseFloat(activity.latitude),
          lng: parseFloat(activity.longitude),
        });
      });
      map.fitBounds(bounds);
    }
  }, [activitiesWithLocation, map]);

  return (
    <>
      {activitiesWithLocation.map((activity) => (
        <AdvancedMarker
          key={activity.id}
          position={{
            lat: parseFloat(activity.latitude),
            lng: parseFloat(activity.longitude),
          }}
        >
          <Pin
            background={"#FF6B6B"}
            borderColor={"#C92A2A"}
            glyphColor={"#FFF"}
          />
        </AdvancedMarker>
      ))}
    </>
  );
};

const TripMap = ({ trip }) => {
  const [activeDay, setActiveDay] = useState(trip.days[0]);

  const initialCenter = { lat: 22.54992, lng: 0 };
  const initialZoom = 3;

  const handleActiveDay = (day) => {
    setActiveDay(day);
  };

  return (
    <div className="trip-map-container">
      <div className="card map-days-container">
        <h2>Días</h2>
        <div className="map-days-buttons-container">
          {trip.days.map((day, index) => (
            <button
              className={`${
                isEqual(new Date(activeDay.date), new Date(day.date))
                  ? "active"
                  : ""
              }`}
              key={index}
              onClick={() => handleActiveDay(day)}
            >
              Día {index + 1}: {formatDay(day.date)}
            </button>
          ))}
        </div>
      </div>

      <div className="map-wrapper">
        <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
          <Map
            style={{ width: "100%", height: "600px" }}
            defaultCenter={initialCenter}
            defaultZoom={initialZoom}
            gestureHandling={"greedy"}
            disableDefaultUI={true}
            mapId="trip-map"
          >
            <TripMapContent activeDay={activeDay} />
          </Map>
        </APIProvider>
      </div>
    </div>
  );
};

export default TripMap;
