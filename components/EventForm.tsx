"use client"
import { NumberInput, Select, Textarea, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import React, { useEffect, useState } from "react"
import ImageUpload from "./ImageUpload"
import { DateTimePicker } from "@mantine/dates"
import MDEditor from "@uiw/react-md-editor"

type EventFormProps = {
  userId: string
  type: "create" | "update"
}

const formStyles = {
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

const EventForm = ({ userId, type }: EventFormProps) => {
  console.log(userId, type)

  // State to store the image preview URL
  const [image, setImage] = useState<File | null>(null)

  const form = useForm({
    initialValues: {
      title: "",
      category: "",
      description: "",
      info: "",
      image: null,
      startDate: "",
      endDate: "",
      location: "",
      mapLink: "",
      url: "",
      ticketPrice: 0,
      ticketDate: "",
    },
  })

  useEffect(() => {
    if (image) {
      form.setFieldValue("image", image)
    }
  }, [image])

  return (
    <div className="max-w-5xl flex my-10 mx-auto max-sm:flex-col relative">
      <div className="sticky top-20 h-[400px] max-sm:relative ">
        <ImageUpload setImage={setImage} />
      </div>
      <form
        className="event-form"
        onSubmit={form.onSubmit((values) => console.log(values))}
      >
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
          data={["Tech", "Food", "Music", "Sports", "Education", "Other"]}
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
          {...form.getInputProps("startDate")}
        />
        <DateTimePicker
          minDate={form.getInputProps("startDate").value as Date}
          label="End Date"
          placeholder="End Date"
          styles={formStyles}
          size="lg"
          {...form.getInputProps("endDate")}
        />

        <TextInput
          label="Location"
          placeholder="Location"
          size="lg"
          styles={formStyles}
          {...form.getInputProps("location")}
        />

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
          {...form.getInputProps("ticketPrice")}
        />
        <DateTimePicker
          maxDate={form.getInputProps("startDate").value as Date}
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
            // onChange={(value) => setInfo(value as string)}
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

        <button type="submit" className="event-form_btn text-white">
          Submit
        </button>
      </form>
    </div>
  )
}

export default EventForm
