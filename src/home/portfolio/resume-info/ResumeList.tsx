import type { ResumeEntryInfo } from "../../../features/portfolio/model"
import ResumeEntry from "./ResumeEntry"

export default function ResumeListView({
  name,
  data,
}: {
  name: string
  data: ResumeEntryInfo[]
}) {
  return (
    <div className="scrollbar scrollbar-thumb-neutral-300 scrollbar-track-neutral-100 dark:scrollbar-thumb-neutral-800 dark:scrollbar-track-neutral-600  w-full overflow-y-auto border-2 border-gray-500 p-2 dark:border-white">
      <div className="flex flex-col gap-2">
        <div className="text-lg font-bold">{name}</div>
        <div className="flex flex-col gap-2">
          {data.map((entry) => (
            <ResumeEntry key={entry.name} entry={entry} />
          ))}
        </div>
      </div>
    </div>
  )
}
