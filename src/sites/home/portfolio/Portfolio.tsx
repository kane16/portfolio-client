import ResumeDescription from "./description/ResumeDescription"
import type { Resume } from "../../../api/model"
import { CircleLoader } from "react-spinners"
import { useDefaultResume } from "../../../api/queries"

export default function Portfolio() {
  const { isPending, data } = useDefaultResume()

  if (isPending) return <CircleLoader color={"white"} size={60} />

  const resume = data as Resume

  return (
    <div className="flex flex-col gap-4 rounded-md bg-neutral-100 p-4 text-lg dark:border-gray-500 dark:bg-neutral-800 md:grid md:h-[80vh] md:max-w-4xl md:grid-cols-7 md:grid-rows-3 md:border-2">
      <div className="overflow-hidden overflow-y-auto scrollbar scrollbar-track-neutral-100 scrollbar-thumb-neutral-300 dark:scrollbar-track-neutral-600 dark:scrollbar-thumb-neutral-800 md:col-span-5 md:pt-4">
        <ResumeDescription resumeDescription={resume.summary} />
      </div>
    </div>
  )
}
