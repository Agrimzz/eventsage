"use client"
import React, { useEffect } from "react"
import "leaflet/dist/leaflet.css"
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet"
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
  longitude,
  latitude,
  setLocation,
}: {
  setLatLong: (latLng: LatLng) => void
  longitude: number
  latitude: number
  setLocation: (location: string) => void
}) => {
  return (
    <div>
      <p className="text-lg font-bold">Locaiton</p>
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
        <LocationMarker setLatLong={setLatLong} setLocaiton={setLocation} />
      </MapContainer>
    </div>
  )
}

export default LocationInput

function LocationMarker({
  setLatLong,
  setLocaiton,
}: {
  setLatLong: (latLng: LatLng) => void
  setLocaiton: (location: string) => void
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
      style: "bar",
      showMarker: false, // Disable automatic marker placement
      showPopup: true,
      retainZoomLevel: true,
      animateZoom: true,
      keepResult: false,
    })

    map.addControl(searchControl)

    map.on("geosearch/showlocation", (event: any) => {
      const { x: lng, y: lat, label } = event.location
      if (lat && lng && label) {
        setLatLong(new L.LatLng(lng, lat))
        L.marker([lat, lng]).addTo(map)

        setLocaiton(label)
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
