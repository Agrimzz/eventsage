import React from "react"
import Form from "next/form"
import { IconSearch } from "@tabler/icons-react"

const SearchInput = () => {
  return (
    <Form action="/" scroll={false} className="search-form">
      <input
        type="text"
        name="query"
        className="search-input"
        placeholder="Search Events"
      />

      <button className="search-btn text-white" type="submit">
        <IconSearch />
      </button>
    </Form>
  )
}

export default SearchInput
