import React from "react"

import {
  FieldErrorsImpl,
  FieldValues,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form"

interface UpdateMangaProps {
  handleSubmit: UseFormHandleSubmit<FieldValues>
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
  return <div>UpdateManga</div>
}
