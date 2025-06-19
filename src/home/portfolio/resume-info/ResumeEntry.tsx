import type { ResumeEntryInfo } from "../../../features/portfolio/model"

export default function ResumeEntry({ entry }: { entry: ResumeEntryInfo }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="font-bold">{entry.name}</div>
      <div className="text-sm text-gray-700 dark:text-gray-300">
        {entry.description}
      </div>
    </div>
  )
}
