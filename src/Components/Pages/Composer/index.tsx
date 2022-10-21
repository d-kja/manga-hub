import React, { useEffect } from "react"

// Components
import * as Tabs from "@radix-ui/react-tabs"
import ComposeManga from "./ComposeManga"
import UpdateManga from "./UpdateManga"

// Utils
import { useForm } from "react-hook-form"
import DropManga from "./DropManga"
import { getAuth } from "firebase/auth"
import { useNavigate } from "react-router-dom"

export default function Composer() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    watch,
  } = useForm()
  const {
    handleSubmit: handleSubmitUpdate,
    register: registerUpdate,
    formState: { errors: errorsUpdate },
    setValue: setValueUpdate,
    watch: watchUpdate,
  } = useForm()

  return (
    <div className="w-full px-8 py-6 max-w-screen-xl mx-auto">
      <h1 className="text-xl uppercase border-b border-b-primary/40">
        <div className="ml-4">Manga options</div>
      </h1>

      <Tabs.Root defaultValue="compose">
        <Tabs.List className="flex justify-center md:flex-row flex-col">
          <Tabs.Trigger
            value="compose"
            className="w-full group select-btn"
          >
            <div className="btn btn-ghost w-full md:rounded-r-none">
              Compose manga
            </div>
          </Tabs.Trigger>
          <Tabs.Trigger
            value="update"
            className="w-full group select-btn"
          >
            <div className="btn btn-ghost w-full md:rounded-none">
              Update manga
            </div>
          </Tabs.Trigger>
          <Tabs.Trigger
            value="delete"
            className="w-full group select-btn"
          >
            <div className="btn btn-ghost w-full md:rounded-l-none">
              Drop manga
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
            errors={errorsUpdate}
            handleSubmit={handleSubmitUpdate}
            handleChange={setValueUpdate}
            register={registerUpdate}
          />
        </Tabs.Content>
        <Tabs.Content value="delete">
          <DropManga
            errors={errorsUpdate}
            handleSubmit={handleSubmitUpdate}
            handleChange={setValueUpdate}
            register={registerUpdate}
          />
        </Tabs.Content>
      </Tabs.Root>
    </div>
  )
}
