"use client"
import React from "react"
import "leaflet/dist/leaflet.css"
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"
import "leaflet-geosearch/dist/geosearch.css"

import L from "leaflet"
L.Icon.Default.mergeOptions({
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
})

const LocationMap = ({
  longitude,
  latitude,
  location,
}: {
  longitude: number
  latitude: number
  location: string
}) => {
  return (
    <MapContainer
      center={[longitude || 27.7103, latitude || 85.3222]}
      zoom={13}
      scrollWheelZoom={false}
      style={{
        height: "60vh",
        width: "100%",
        position: "relative",
        borderRadius: "20px",
      }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[longitude || 27.7103, latitude || 85.3222]}>
        <Popup>{location}</Popup>
      </Marker>
    </MapContainer>
  )
}

export default LocationMap
