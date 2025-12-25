"use client";

import { useState, useRef, useEffect, useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import CitySearch from "../common/CitySearch";

// Custom marker icon
const customIcon = new L.Icon({
  iconUrl: "/images/Location Icon.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

function LocationMarker({ position, setPosition }) {
  useMapEvents({
    click(e) {
      setPosition({
        latitude: e.latlng.lat,
        longitude: e.latlng.lng,
      });
    },
  });

  return position ? (
    <Marker
      position={[position.latitude, position.longitude]}
      icon={customIcon}
    >
      <Popup>You clicked here!</Popup>
    </Marker>
  ) : null;
}

function MapUpdater({ position }) {
  const map = useMap();
  map.setView([position.latitude, position.longitude], map.getZoom());
  return null;
}

export default function MapComponent({ position, setPosition }) {
  const mapRef = useRef(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setPosition({ latitude, longitude });
          if (mapRef.current) {
            mapRef.current.flyTo([latitude, longitude], 13);
          }
        },
        (err) => {
          console.warn("Geolocation permission denied or error:", err);
        }
      );
    }
    if (mapRef.current) {
      L.control
        .zoom({
          position: "bottomleft",
        })
        .addTo(mapRef.current);
    }
  }, []);

  return (
    <div className="flex flex-col gap-4 w-full h-full relative bg-surface rounded-lg p-4">
      <div className="relative mx-auto w-full">
        <CitySearch
          onSelectCity={({ lat, lon }) => {
            setPosition({ latitude: lat, longitude: lon });
            if (mapRef.current) {
              mapRef.current.flyTo([lat, lon], 13);
            }
          }}
        />
      </div>

      <MapContainer
        center={[position.latitude, position.longitude]}
        zoom={13}
        scrollWheelZoom={false}
        zoomControl={false}
        style={{ height: "400px", width: "100%" }}
        className="rounded-xl z-10"
        whenCreated={(map) => {
          mapRef.current = map;
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapUpdater position={position} />
        <LocationMarker position={position} setPosition={setPosition} />
      </MapContainer>
    </div>
  );
}
