import React, { useState } from "react";
import {
  GoogleMap,
  LoadScript,
  MarkerF,
  useLoadScript,
} from "@react-google-maps/api";

function Map({ lat, lng, setPlaceCordinates, width, height }) {
    console.log(lat);
  const containerStyle = {
    width,
    height,
  };
  const [markerPosition, setMarkerPosition] = useState({ lat, lng });
  const onMarkerDragEnd = (e) => {
    setPlaceCordinates({ lat: e.latLng.lat(), lng: e.latLng.lng() });
    setMarkerPosition({ lat: e.latLng.lat(), lng: e.latLng.lng() });
  };

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDz9QjCNiIHxRGhbb0NaEDOV0vm30Nc-A4", // Add your API key
  });

  return (
    <>
      {/* <LoadScript googleMapsApiKey="AIzaSyDz9QjCNiIHxRGhbb0NaEDOV0vm30Nc-A4"> */}
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={markerPosition}
          zoom={15}
          
        >
          <MarkerF
            key="AIzaSyDz9QjCNiIHxRGhbb0NaEDOV0vm30Nc-A4"
            position={markerPosition}
            draggable={true}
            onDragEnd={onMarkerDragEnd}
            
          />
        </GoogleMap>
      )}
      {/* </LoadScript> */}
    </>
  );
}

export default Map;