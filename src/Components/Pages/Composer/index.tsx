import React from "react"

// Components
import * as Tabs from "@radix-ui/react-tabs"
import ComposeManga from "./ComposeManga"
import UpdateManga from "./UpdateManga"

// Utils
import { useForm } from "react-hook-form"

export default function Composer() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    watch,
  } = useForm()

  return (
    <div className="w-full px-8 py-6 max-w-screen-xl mx-auto">
      <h1 className="text-xl uppercase border-b border-b-primary/40">
        <div className="ml-4">Manga options</div>
      </h1>

      <Tabs.Root defaultValue="compose">
        <Tabs.List className="flex justify-center">
          <Tabs.Trigger
            value="compose"
            className="w-full group select-btn"
          >
            <div className="btn btn-ghost w-full rounded-r-none">
              Compose manga
            </div>
          </Tabs.Trigger>
          <Tabs.Trigger
            value="update"
            className="w-full group select-btn"
          >
            <div className="btn btn-ghost w-full rounded-l-none">
              Update manga
            </div>
          </Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="compose">
          <ComposeManga
            errors={errors}
            handleSubmit={handleSubmit}
            handleChange={setValue}
            register={register}
          />
        </Tabs.Content>
        <Tabs.Content value="update">
          <UpdateManga
            errors={errors}
            handleSubmit={handleSubmit}
            handleChange={setValue}
            register={register}
          />
        </Tabs.Content>
      </Tabs.Root>
    </div>
  )
}
