"use client"
import ResumeDescription from "./ResumeDescription"
import ResumeFilter from "./ResumeFilter"
import ResumeInfoMatrix from "./ResumeInfoMatrix"

export default function Portfolio() {
  return (
    <div className="flex-col gap-2 rounded-md p-4 text-lg md:grid md:grid-cols-2 md:border-2 md:bg-gray-100 md:dark:bg-stone-800">
      <ResumeFilter />
      <ResumeDescription />
      <div className="md:col-span-2">
        <ResumeInfoMatrix />
      </div>
    </div>
  )
}
