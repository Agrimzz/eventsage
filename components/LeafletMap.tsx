"use client"
import React, { useEffect, useState } from "react"
import "leaflet/dist/leaflet.css"
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet"
import { OpenStreetMapProvider, GeoSearchControl } from "leaflet-geosearch"
import "leaflet-geosearch/dist/geosearch.css"

import L from "leaflet"
L.Icon.Default.mergeOptions({
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
})

const LeafletMap = () => {
  const [position, setPosition] = useState<L.LatLng | null>(null)

  return (
    <div className="section_container">
      <p className="text-3xl font-semibold mb-7">
        {position ? "Events near you" : "Events near Kathmandu"}
      </p>
      <MapContainer
        center={[27.7103, 85.3222]}
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
        <LocationMarker position={position} setPosition={setPosition} />
      </MapContainer>
    </div>
  )
}

export default LeafletMap

function LocationMarker({
  position,
  setPosition,
}: {
  position: L.LatLng | null
  setPosition: React.Dispatch<React.SetStateAction<L.LatLng | null>>
}) {
  const map = useMapEvents({
    click() {
      map.locate()
    },
    locationfound(e) {
      setPosition(e.latlng)
      map.flyTo(e.latlng, map.getZoom())
    },
  })

  useEffect(() => {
    const provider = new OpenStreetMapProvider()
    //@ts-expect-error it working
    const searchControl = new GeoSearchControl({
      provider,
      style: "bar",
      showMarker: true,
      showPopup: true,
      marker: {
        icon: new L.Icon.Default(),
        draggable: false,
      },
      retainZoomLevel: false,
      animateZoom: true,
      keepResult: true,
    })

    map.addControl(searchControl)

    return () => {
      map.removeControl(searchControl)
    }
  }, [map])

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  )
}
