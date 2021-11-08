import React from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import styleMappa from "./styleMappa";
import Logo from "../../immagini/logo.png";

const libraries = ["places"];
const mapContainerStyle = {
  height: "80vh",
  width: "100vw",
};
const options = {
  styles: styleMappa,
  disableDefaultUI: true,
  zoomControl: true,
};
const center = {
  lat: 38.115688,
  lng: 13.361267,
};

export default function Mappa() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyCTbH-HgcbQUWQXz24mm9gmkQCmJk98L7c",
    libraries,
  });
  const [markers, setMarkers] = React.useState([]);
  const [selected, setSelected] = React.useState(null);

  const onMapClick = React.useCallback((e) => {
    setMarkers((current) => [
      ...current,
      {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
        time: new Date(),
      },
    ]);
  }, []);

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={13}
        center={center}
        options={options}
      >
        <Marker
          position={{ lat: 38.10369, lng: 13.34858 }}
          icon={{
            url: "/logo.png",
            scaledSize: new window.google.maps.Size(40, 40),
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(20, 20),
          }}
        />
        <Marker
          position={{ lat: 38.11554, lng: 13.36154 }}
          icon={{
            url: "/logo.png",
            scaledSize: new window.google.maps.Size(40, 40),
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(20, 20),
          }}
        />
        <Marker
          position={{ lat: 38.118439, lng: 13.36267 }}
          icon={{
            url: "/logo.png",
            scaledSize: new window.google.maps.Size(40, 40),
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(20, 20),
          }}
        />
        {selected ? (
          <InfoWindow
            position={{ lat: selected.lat, lng: selected.lng }}
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            <div>
              <h2 style={{ color: "#010101", fontWeight: "bold" }}>
                PARCHEGGIO
              </h2>
              <p style={{ textAlign: "center", fontWeight: "600" }}>
                PARCHEGGIO KARM
              </p>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </div>
  );
}

function Locate({ panTo }) {
  return (
    <button
      className="locate"
      onClick={() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            panTo({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          () => null
        );
      }}
    >
      <img src="/compass.svg" alt="compass" />
    </button>
  );
}
