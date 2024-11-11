"use client"
import { IconX } from "@tabler/icons-react"
import Link from "next/link"
import React from "react"

const SearchFormReset = () => {
  const reset = () => {
    const form = document.querySelector(".search-form") as HTMLFormElement
    if (form) form.reset()
  }
  return (
    <button type="reset" onClick={reset}>
      <Link href="/search" className="search-btn text-white">
        <IconX className="size-5" />
      </Link>
    </button>
  )
}

export default SearchFormReset
