"use client"
import { categories } from "@/constants"
import Link from "next/link"
import React from "react"

const Categories = () => {
  return (
    <div className="mt-7 grid md:grid-cols-6 sm:grid-cols-3 max-sm:grid-cols-2 gap-5">
      {categories.map((category) => (
        <Link
          href={`/search?query=&category=${encodeURIComponent(category.label)}`}
          key={category.label}
        >
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="p-10 rounded-full border-[1px] hover:bg-primary hover:text-white">
              <category.Icon size={32} />
            </div>
            <span className="text-lg font-semibold text-center">
              {category.label}
            </span>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default Categories
