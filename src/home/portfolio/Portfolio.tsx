import ResumeDescription from "./ResumeDescription"
import ResumeFilter from "./filter/ResumeFilter"
import ResumeInfoMatrix from "./matrix/ResumeInfoMatrix"

export default function Portfolio() {
  return (
    <div
      className="flex-col gap-2 rounded-md bg-neutral-100 p-4 text-lg dark:border-gray-500 md:grid
      md:h-[80vh] md:w-2/3 md:grid-cols-2 md:border-2 md:dark:bg-stone-800"
    >
      <ResumeFilter />
      <ResumeDescription />
      <div className="md:col-span-2">
        <ResumeInfoMatrix />
      </div>
    </div>
  )
}
