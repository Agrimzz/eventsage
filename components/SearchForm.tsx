import Form from "next/form"

import { IconSearch } from "@tabler/icons-react"
import SearchFormReset from "./SearchFormReset"
import { Select } from "@mantine/core"
import { categoryLabels } from "@/constants"
const SearchForm = ({
  query,
  category,
  showCategory = false,
}: {
  query?: string
  category?: string
  showCategory?: boolean
}) => {
  return (
    <Form action="/search" scroll={false} className="search-form">
      <input
        type="text"
        defaultValue={query}
        name="query"
        className="search-input flex-1"
        placeholder="Search Events"
      />

      {showCategory && (
        <Select
          data={categoryLabels}
          placeholder="Category"
          defaultValue={category}
          name="category"
          size="lg"
          styles={{
            input: {
              maxWidth: "150px",
              border: "2px solid black",
              fontSize: "18px",
              borderRadius: "20px",
            },
          }}
        />
      )}
      <div className="flex gap-2">
        {query && <SearchFormReset />}

        <button className="search-btn text-white" type="submit">
          <IconSearch />
        </button>
      </div>
    </Form>
  )
}

export default SearchForm
