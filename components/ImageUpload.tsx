"use client"
import { FileButton } from "@mantine/core"
import React, { useState, Dispatch, SetStateAction } from "react"

type ImageUploadProps = {
  setImage: Dispatch<SetStateAction<File | null>>
}

const ImageUpload = ({ setImage }: ImageUploadProps) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const handleImageChange = (file: File | null) => {
    if (file) {
      setImagePreview(URL.createObjectURL(file)) // Generate preview URL
      setImage(file) // Set the image in the parent component
    } else {
      setImagePreview(null)
      setImage(null) // Clear image in the parent component
    }
  }

  return (
    <div className="w-[350px] mx-auto px-6 max-sm:mb-8">
      <p className="text-lg font-bold">Image</p>
      <div className="border-2 border-black rounded-md px-6 py-4">
        {imagePreview ? (
          <>
            <img
              src={imagePreview}
              alt="Uploaded Image Preview"
              className="w-full max-h-[200px] object-cover mb-2 rounded-md"
            />
            <div className="flex items-center justify-center">
              <FileButton
                onChange={handleImageChange}
                accept="image/png, image/jpeg"
              >
                {(props) => (
                  <div className="flex w-full items-center">
                    <button
                      {...props}
                      className="p-2 bg-primary text-white rounded-md"
                    >
                      Edit Image
                    </button>
                  </div>
                )}
              </FileButton>
              <button
                onClick={() => {
                  setImage(null)
                  setImagePreview(null)
                }}
                className="p-2 bg-red-500 text-white rounded-md"
              >
                Delete
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-col justify-center items-center gap-2">
            <img
              src="/image-placeholder.jpeg"
              alt="placeholder"
              className="rounded-md"
            />
            <FileButton
              onChange={handleImageChange}
              accept="image/png, image/jpeg"
            >
              {(props) => (
                <div className="flex w-full items-center">
                  <button
                    {...props}
                    className="text-center w-full bg-primary text-white p-3 font-semibold rounded-md"
                  >
                    Upload Image
                  </button>
                </div>
              )}
            </FileButton>
          </div>
        )}
      </div>
    </div>
  )
}

export default ImageUpload
