import type { JSX } from "react"
import { Outlet } from "react-router-dom"
import { CircularProgressbar } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"

export default function EditResume(): JSX.Element {
  return (
    <div className="grid h-full w-full grid-cols-9 grid-rows-6 items-center justify-center gap-4 p-4">
      <div className="col-span-6 col-start-2 row-span-6 h-full w-full border-2">
        <Outlet />
      </div>
      <div className="col-span-2 col-start-8 row-start-1 flex h-full w-full items-center justify-center border-2">
        <CircularProgressbar value={75} text={"75%"} className="h-20 w-20" />
      </div>
      <div className="col-span-2 col-start-8 row-span-5 row-start-2 h-full w-full border-2">
        world
      </div>
    </div>
  )
}
