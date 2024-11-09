import React from "react"
import Ping from "./Ping"
import { incrementEventViews } from "@/lib/actions/event.actions"

const View = async ({ id, views }: { id: string; views: number }) => {
  const incrementedViews = await incrementEventViews(id)
  return (
    <div className="view-container">
      <div className="absolute -top-2 -right-2">
        <Ping />
      </div>
      <p className="view-text">
        <span className="font-black">Veiws: {views}</span>
      </p>
    </div>
  )
}

export default View
