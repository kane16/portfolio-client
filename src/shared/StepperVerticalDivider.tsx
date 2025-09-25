import type { JSX } from "react"
import { StepperOrientation } from "./Stepper"

export default function StepperDivider({
  orientation,
}: {
  orientation: StepperOrientation
}): JSX.Element {
  return (
    <div
      className={`my-2 ${orientation === StepperOrientation.VERTICAL ? "h-8 w-px" : "h-px w-8"} bg-black dark:bg-white`}
    ></div>
  )
}
