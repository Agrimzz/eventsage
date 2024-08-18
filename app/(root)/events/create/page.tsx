"use client"
import { getAllCategories } from "@/libs/actions/categories.actions"
import { createEvent } from "@/libs/actions/events.actions"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function CreateEvent() {
  const [userId, setUserId] = useState("")
  const [categories, setCategories] = useState([])
  const router = useRouter()

  const getCategories = async () => {
    const categoryList: any = await getAllCategories()

    categoryList && setCategories(categoryList)
  }
  useEffect(() => {
    getCategories()
    const storedId = localStorage.getItem("id")
    if (storedId) setUserId(storedId)
  }, [])

  const { mutate: create } = useMutation({
    mutationFn: (formData: FormData) => {
      formData.append("uid", userId)
      return createEvent(formData)
    },
    onSuccess: () => {
      router.push("/")
    },
    onError: (err) => {
      console.log(err)
    },
  })

  return (
    <div className="max-w-xl h-auto bg-grey py-12 px-12 m-auto mt-40 rounded-lg flex flex-col gap-12 z-50">
      <h2 className="h2-bold text-center">Create Event</h2>
      <form className="space-y-6" action={create}>
        <div>
          <label className="block font-semibold mb-2">Event Name:</label>
          <input
            className="w-full px-4 py-2 bg-black border border-gray-300 rounded-md focus:outline-none"
            type="text"
            placeholder="Event Name"
            required
            name="event_name"
          />
        </div>
        <div>
          <label className="block font-semibold mb-2">Description:</label>
          <textarea
            className="w-full px-4 py-2 bg-black border border-gray-300 rounded-md focus:outline-none"
            placeholder="Event Description"
            name="description"
            required
          />
        </div>
        <div>
          <label className="block font-semibold mb-2">Ticket Price:</label>
          <input
            className="w-full px-4 py-2 bg-black border border-gray-300 rounded-md focus:outline-none"
            type="text"
            placeholder="Ticket Price"
            name="ticket_price"
            required
          />
        </div>
        <div>
          <label className="block font-semibold mb-2">Event Start Date:</label>
          <input
            className="w-full px-4 py-2 bg-black border border-gray-300 rounded-md focus:outline-none"
            type="date"
            name="event_start_date"
          />
        </div>
        <div>
          <label className="block font-semibold mb-2">Event End Date:</label>
          <input
            className="w-full px-4 py-2 bg-black border border-gray-300 rounded-md focus:outline-none"
            type="date"
            name="event_end_date"
          />
        </div>
        <div>
          <label className="block font-semibold mb-2">Event URL:</label>
          <input
            className="w-full px-4 py-2 bg-black border border-gray-300 rounded-md focus:outline-none"
            type="url"
            placeholder="Event URL"
            name="url"
          />
        </div>
        <div>
          <label className="block font-semibold mb-2">Google Map URL:</label>
          <input
            className="w-full px-4 py-2 bg-black border border-gray-300 rounded-md focus:outline-none"
            type="url"
            placeholder="Google Map URL"
            name="map"
          />
        </div>
        <div>
          <label className="block font-semibold mb-2">Category:</label>
          <select
            className="w-full px-4 py-2 bg-black border border-gray-300 rounded-md focus:outline-none capitalize"
            name="cid"
            required
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories?.map((category: any) => (
              <option
                key={category._id}
                value={category._id}
                className="capitalize"
              >
                {category.category_name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block font-semibold mb-2">Event Image:</label>
          <input
            className="w-full px-4 py-2 bg-black border border-gray-300 rounded-md focus:outline-none"
            type="file"
            accept="image/*"
            name="image"
          />
        </div>

        {/* {error && <p className="text-red-300 text-center">{error}</p>} */}
        <button
          type="submit"
          className="w-full bg-primary text-white weight-bold py-4 rounded-full text-lg font-bold"
        >
          Create Event
        </button>
      </form>
    </div>
  )
}
