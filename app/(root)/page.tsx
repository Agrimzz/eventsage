import SearchInput from "@/components/SearchInput"
import React from "react"

export default function Home() {
  return (
    <>
      <section className="blue_container ">
        <h1 className="heading">BROWSE UPCOMING EVENTS, BUY TICKETS NOW</h1>
        <p className="sub-heading">
          Explore Events, Reserve Your Spot, and Join the Excitement with Just a
          Click.
        </p>
        <SearchInput />
      </section>
    </>
  )
}
