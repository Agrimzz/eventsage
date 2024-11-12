"use client"
import { NumberInput, Select, Textarea, TextInput } from "@mantine/core"
import { useForm, zodResolver } from "@mantine/form"
import React, { useEffect, useState } from "react"
import ImageUpload from "./ImageUpload"
import { DateTimePicker } from "@mantine/dates"
import MDEditor from "@uiw/react-md-editor"
import { eventFormSchema } from "@/lib/validator"
import { createEvent, updateEvent } from "@/lib/actions/event.actions"
import { useRouter } from "next/navigation"
import { IEvent } from "@/lib/database/models/event.model"
import { categoryLabels } from "@/constants"
import LocationInput from "./LocationInput"
import { LatLng } from "leaflet"

type EventFormProps = {
  userId: string
  type: "create" | "update"
  eventId?: string
  event?: IEvent
}

export const formStyles = {
  label: {
    fontWeight: "bold",
    fontSize: "18px",
  },
  input: {
    border: "3px solid black",
    fontSize: "18px",
    borderRadius: "20px",
  },
}

const EventForm = ({ userId, type, event, eventId }: EventFormProps) => {
  // State to store the image preview URL
  const router = useRouter()
  const [image, setImage] = useState<File | null | string>(
    event?.imageUrl || null
  )

  const form = useForm({
    initialValues: {
      title: event?.title || "",
      category: event?.category || "",
      description: event?.description || "",
      info: event?.info || "",
      imageUrl: event?.imageUrl || null,
      startDateTime: event ? new Date(event.startDateTime) : new Date(),
      endDateTime: event ? new Date(event.endDateTime) : new Date(),
      location: event?.location || "",
      mapLink: event?.mapLink || "",
      url: event?.url || "",
      price: event?.price || 0,
      views: event?.views || 0,
      latitude: event?.latitude || 0,
      longitude: event?.longitude || 0,
      ticketDate: event ? new Date(event.ticketDate) : new Date(),
      ...(type === "update" && { prevImageUrl: event?.imageUrl || "" }),
    },
    validate: zodResolver(eventFormSchema),
  })

  useEffect(() => {
    if (image) {
      //@ts-expect-error i dont know how to type this
      form.setFieldValue("imageUrl", image)
    } else {
      form.setFieldValue("imageUrl", null)
    }
    console.log(image)
  }, [image])

  async function handleSubmit() {
    if (type === "create") {
      try {
        const newEvent = await createEvent({
          userId,
          event: {
            ...form.values,
            imageUrl: form.values.imageUrl ? form.values.imageUrl : "",
          },
          path: "/profile",
        })
        if (newEvent) {
          form.reset()
          router.push(`/events/${newEvent._id}`)
        }
      } catch (error) {
        console.log(error)
      }
    }
    if (type === "update") {
      if (!eventId) {
        router.back()
        return
      }
      try {
        const updatedEvent = await updateEvent({
          userId,
          //@ts-expect-error i dont know how to type this
          event: {
            ...form.values,
            imageUrl: form.values.imageUrl ? form.values.imageUrl : "",
            _id: eventId,
          },
          path: `/events/${eventId}`,
        })
        if (updatedEvent) {
          form.reset()
          router.push(`/events/${updatedEvent._id}`)
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <div className="max-w-5xl flex my-10 mx-auto max-sm:flex-col relative">
      <div className="sticky top-20 h-[400px] max-sm:relative ">
        <ImageUpload
          setImage={setImage}
          currentImageUrl={event?.imageUrl || null}
        />
        {form.errors.imageUrl && (
          <p className="text-red-500 text-center">{form.errors.imageUrl}</p>
        )}
      </div>
      <form className="event-form" onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          label="Title"
          placeholder="Event Title"
          size="lg"
          styles={formStyles}
          {...form.getInputProps("title")}
        />

        <Select
          label="Category"
          placeholder="Select category"
          data={categoryLabels}
          size="lg"
          styles={{ ...formStyles, dropdown: { border: "3px solid black" } }}
          {...form.getInputProps("category")}
        />
        <DateTimePicker
          minDate={new Date()}
          label="Start Date"
          placeholder="Start Date"
          styles={formStyles}
          size="lg"
          {...form.getInputProps("startDateTime")}
        />
        <DateTimePicker
          minDate={form.getInputProps("startDateTime").value as Date}
          label="End Date"
          placeholder="End Date"
          styles={formStyles}
          size="lg"
          {...form.getInputProps("endDateTime")}
        />

        <div>
          <LocationInput
            setLatLong={(latLng: LatLng) => {
              form.setFieldValue("latitude", latLng.lat)
              form.setFieldValue("longitude", latLng.lng)
            }}
            latitude={form.getInputProps("latitude").value}
            longitude={form.getInputProps("longitude").value}
            setLocation={(location: string) => {
              form.setFieldValue("location", location)
            }}
          />
          {form.errors.location && (
            <p className="text-red-500 ">{form.errors.location}</p>
          )}
        </div>
        <TextInput
          label="URL"
          placeholder="URL"
          size="lg"
          styles={formStyles}
          {...form.getInputProps("url")}
        />

        <TextInput
          label="Google Map Link"
          placeholder="Google Map Link"
          size="lg"
          styles={formStyles}
          {...form.getInputProps("mapLink")}
        />

        <NumberInput
          label="Ticket Price"
          size="lg"
          styles={formStyles}
          hideControls
          max={5000}
          {...form.getInputProps("price")}
        />
        <DateTimePicker
          maxDate={form.getInputProps("endDateTime").value as Date}
          label="Ticket Sales End"
          placeholder="Sales End Date"
          styles={formStyles}
          size="lg"
          {...form.getInputProps("ticketDate")}
        />

        <Textarea
          label="Description"
          placeholder="Description"
          size="lg"
          styles={formStyles}
          {...form.getInputProps("description")}
        />

        <div>
          <label htmlFor="fullInfo" className="text-lg font-bold">
            Detailed Info
          </label>
          <MDEditor
            value={form.values.info as string}
            id="info"
            preview="edit"
            height={300}
            style={{
              borderRadius: 20,
              overflow: "hidden",
            }}
            textareaProps={{
              placeholder: "Briefly describe your event.",
            }}
            previewOptions={{
              disallowedElements: ["style"],
            }}
            data-color-mode="light"
            {...form.getInputProps("info" as string)}
          />
        </div>
        <button type="submit" className="event-form_btn text-white capitalize">
          {type} Event
        </button>
      </form>
    </div>
  )
}

export default EventForm
