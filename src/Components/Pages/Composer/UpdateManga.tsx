import React from "react"

import {
  FieldErrorsImpl,
  FieldValues,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form"

interface UpdateMangaProps {
  handleSubmit: UseFormHandleSubmit<FieldValues>
  handleChange: UseFormSetValue<FieldValues>
  register: UseFormRegister<FieldValues>
  errors: FieldErrorsImpl<{
    [x: string]: any
  }>
}

export default function UpdateManga({
  handleSubmit,
  register,
  errors,
}: UpdateMangaProps) {
  return (
    <div>
      {/* Select manga */}

      {/* Now update it's values */}
      {/* ---------------------- */}
      {/* Manga name */}
      {/* Manga synopsis */}
      {/* Manga tags */}
      {/* Manga status */}

      {/* Add a new chapter */}
      {/* ----------------- */}
      {/* Chapter title */}
      {/* Chapter strips */}
    </div>
  )
}
