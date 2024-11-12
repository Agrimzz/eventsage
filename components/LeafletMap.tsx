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
import EventPopup from "./EventPopup"
import { IconHomeFilled } from "@tabler/icons-react"
import ReactDOMServer from "react-dom/server"
import NearEvents from "./NearEvents"
import { findClosestEvents } from "@/lib/utlis"
import { EventDetails } from "@/types"

L.Icon.Default.mergeOptions({
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
})

const LeafletMap = ({
  events,
  userId,
}: {
  events: EventDetails[]
  userId: string
}) => {
  const [selectedEvent, setSelectedEvent] = useState<EventDetails | null>(null)
  const [position, setPosition] = useState<L.LatLng | null>(null)
  const closeEvents =
    findClosestEvents(position?.lat, position?.lng, events, 50) || []

  return (
    <div className="section_container ">
      <p className="text-3xl font-semibold mb-7">
        Find the best events near you
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
          zIndex: 0,
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker position={position} setPosition={setPosition} />
        {events.map((event: EventDetails, i: number) => (
          <Marker
            key={i}
            position={[event.latitude, event.longitude]}
            eventHandlers={{
              click: () => setSelectedEvent(event),
            }}
          >
            <Popup>
              {selectedEvent && <EventPopup event={selectedEvent} />}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      {position?.lat && position.lat ? (
        <>
          <p className="text-3xl font-semibold mt-20">
            Events happening near you
          </p>
          <NearEvents events={closeEvents} userId={userId} />
        </>
      ) : (
        <></>
      )}
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

  const userLocationIcon = new L.DivIcon({
    html: ReactDOMServer.renderToString(
      <IconHomeFilled color="#2B64EE" size={32} />
    ),
    className: "",
    iconSize: [50, 50],
  })
  useEffect(() => {
    const provider = new OpenStreetMapProvider()
    //@ts-expect-error it working
    const searchControl = new GeoSearchControl({
      provider,
      style: "icon",
      showMarker: false,
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
    <Marker position={position} icon={userLocationIcon}>
      <Popup>You are here</Popup>
    </Marker>
  )
}
