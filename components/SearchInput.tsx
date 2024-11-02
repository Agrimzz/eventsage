import React from "react"
import Form from "next/form"
import { IconSearch, IconX } from "@tabler/icons-react"

const SearchInput = () => {
  return (
    <Form action="/" scroll={false} className="search-form">
      <input
        type="text"
        name="query"
        className="search-input"
        placeholder="Search Events"
      />

      <div className="flex justify-between items-center gap-2">
        <button className="search-btn text-white">
          <IconX />
        </button>
        <button className="search-btn text-white" type="submit">
          <IconSearch />
        </button>
      </div>
    </Form>
  )
}

export default SearchInput
