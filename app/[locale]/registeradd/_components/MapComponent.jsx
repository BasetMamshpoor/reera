"use client";

import { useState, useRef, useEffect } from "react";
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
import CitySearch from "./CitySearch";
import Arrowleft from "@/assets/icons/arrow-left.svg";
// Custom marker icon
const customIcon = new L.Icon({
  iconUrl: "/icons/mymarker.svg",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

// API function to submit location
const submitLocation = async (location) => {
  const response = await fetch("/api/locations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(location),
  });
  if (!response.ok) {
    throw new Error("Failed to submit location");
  }
  return response.json();
};

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

export default function MapComponent({
  position,
  setPosition,
  setPositionClicked,
}) {
  const mapRef = useRef(null);

  // Ask for location permission on mount
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

  const { mutate, isPending, isError, error, isSuccess } = useMutation({
    mutationFn: submitLocation,
    onSuccess: (data) => {
      console.log("Location saved successfully:", data);
    },
    onError: (error) => {
      console.error("Error saving location:", error);
    },
  });

  const handleLocationSubmit = () => {
    if (position) {
      mutate(position);
      console.log(position);
      setPositionClicked(true);
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full h-full relative bg-white  rounded-lg px-10 py-12">
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

      <div className="flex flex-col gap-2">
        <button
          onClick={handleLocationSubmit}
          disabled={isPending}
          className="bg-black text-white w-32 py-2 px-4 rounded-xl cursor-pointer self-end disabled:opacity-50"
        >
          {isPending ? "در حال ارسال..." : "تایید موقعیت"}
        </button>

        {isError && (
          <p className="text-red-500 text-sm">
            خطا در ارسال موقعیت: {error.message}
          </p>
        )}
        {isSuccess && (
          <p className="text-green-500 text-sm">موقعیت با موفقیت ثبت شد</p>
        )}
      </div>
      {/* buttons */}
      <div className="flex flex-row items-center w-full rtl:justify-end gap-6 mt-auto justify-end">
        <button
          type="button"
          className="py-2 lg:w-32 border-[2px] w-full cursor-pointer border-[#F59E0B] text-[#F59E0B] rounded-lg"
        >
          انصراف
        </button>
        <button
          type="submit"
          className="flex cursor-pointer w-full flex-row gap-4 items-center justify-center text-white bg-[#4299C1] py-2 lg:w-32  rounded-lg"
        >
          {/* <span>{mutation.isLoading ? "در حال ارسال..." : "بعدی"}</span> */}
          <span>بعدی</span>
          <Arrowleft className="fill-white ltr:rotate-180" />
        </button>
      </div>
    </div>
  );
}
