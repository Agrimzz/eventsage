"use client"
import React, { useEffect } from "react"
import "leaflet/dist/leaflet.css"
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet"
import { OpenStreetMapProvider, GeoSearchControl } from "leaflet-geosearch"
import "leaflet-geosearch/dist/geosearch.css"
import L, { LatLng } from "leaflet"

L.Icon.Default.mergeOptions({
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
})

const LocationInput = ({
  setLatLong,
  latitude,
  longitude,
  setLocation,
}: {
  setLatLong: (latLng: LatLng) => void
  latitude: number
  longitude: number
  setLocation: (location: string) => void
}) => {
  return (
    <div>
      <p className="text-lg font-bold">Location</p>
      <MapContainer
        center={[latitude || 27.7103, longitude || 85.3222]}
        zoom={13}
        scrollWheelZoom={false}
        style={{
          height: "60vh",
          width: "100%",
          position: "relative",
          borderRadius: "20px",
          zIndex: 0,
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker setLatLong={setLatLong} setLocation={setLocation} />
        {longitude && latitude && (
          <Marker position={[latitude, longitude]}></Marker>
        )}
      </MapContainer>
    </div>
  )
}

export default LocationInput

function LocationMarker({
  setLatLong,
  setLocation,
}: {
  setLatLong: (latLng: LatLng) => void
  setLocation: (location: string) => void
}) {
  const map = useMapEvents({
    click(e) {
      map.flyTo(e.latlng, map.getZoom())
    },
  })

  useEffect(() => {
    const provider = new OpenStreetMapProvider()
    //@ts-expect-error it working
    const searchControl = new GeoSearchControl({
      provider,
      style: "icon",
      showMarker: false, // Disable automatic marker placement
      showPopup: false,
      retainZoomLevel: true,
      animateZoom: true,
      keepResult: false,
    })

    map.addControl(searchControl)

    const markersLayerGroup = L.layerGroup().addTo(map)

    map.on("geosearch/showlocation", (event: any) => {
      const { x: lng, y: lat, label } = event.location
      if (lat && lng && label) {
        markersLayerGroup.clearLayers()

        const newMarker = L.marker([lat, lng]).addTo(markersLayerGroup)

        // Update map position and state variables
        setLatLong(new L.LatLng(lat, lng))
        setLocation(label)
      } else {
        console.error(
          "Search result did not return valid latitude and longitude"
        )
      }
    })

    return () => {
      map.removeControl(searchControl)
    }
  }, [map, setLatLong])

  return null
}
