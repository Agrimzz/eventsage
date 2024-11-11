"use client"
import { categories } from "@/constants"
import { Select } from "@mantine/core"
import { useForm } from "@mantine/form"
import Form from "next/form"
import React from "react"

const CategoryFilter = ({ category }: { category?: string }) => {
  const form = useForm({ initialValues: { category: category } })
  return (
    <Form action="/search">
      <Select
        {...form.getInputProps("category")}
        data={categories}
        placeholder="Category"
      />
    </Form>
  )
}

export default CategoryFilter
