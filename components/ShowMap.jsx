"use client";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// آیکون اختصاصی برای Marker
const customIcon = new L.Icon({
    iconUrl: "/icons/mymarker.svg", // آیکون دلخواه خودت
    iconSize: [32, 32],
    iconAnchor: [16, 32],
});

export default function SimpleMap({ latitude, longitude, zoom = 13, width = "100%", height = "300px" }) {
    if (!latitude || !longitude) return null;

    return (
        <div className="rounded-xl overflow-hidden shadow-md border border-gray-200"
             style={{ width, height }}>
            <MapContainer
                center={[latitude, longitude]}
                zoom={zoom}
                scrollWheelZoom={true}
                zoomControl={true}
                style={{ width: "100%", height: "100%" }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {/* Marker برای نشان دادن موقعیت */}
                <Marker position={[latitude, longitude]} icon={customIcon} />
            </MapContainer>
        </div>
    );
}
