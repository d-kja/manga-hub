import React from "react"

// Components
import * as Dialog from "@radix-ui/react-dialog"
import { useNavigate } from "react-router-dom"
import { X } from "phosphor-react"

export default function DialogBody({
  title,
  children,
}: any) {
  const nav = useNavigate()

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/60 inset-0 fixed" />
      <Dialog.Content className="fixed bg-base-300 py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-lg shadow-black/40 min-w-[460px] max-h-[85%] overflow-auto">
        <Dialog.Title className="text-xl font-black text-base-content">
          {title}
        </Dialog.Title>
        {children}
        <Dialog.Close
          className="btn btn-block font-bold"
          onClick={() => nav("/search")}
        >
          Go to search page
        </Dialog.Close>
        <Dialog.Close className="btn btn-xs opacity-50 btn-square absolute top-5 right-5">
          <X weight="bold" />
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  )
}
