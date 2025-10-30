import { CircleLoader } from "react-spinners"
import { useDefaultResume } from "../../../api/queries"
import ResumeCard from "./card/ResumeCard"

export default function Portfolio() {
  const { isPending, data: resume } = useDefaultResume()

  if (isPending) return <CircleLoader color={"var(--foreground)"} size={60} />

  return (
    <div className="flex w-full max-w-4xl flex-col gap-4 rounded-xl border border-[var(--border)] bg-[var(--background)] p-6 text-lg shadow-sm md:grid md:h-[80vh] md:grid-cols-7 md:grid-rows-3">
      <div className="md:col-span-7 md:row-span-3 md:pt-2">
        <div className="h-full overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)]">
          <div className="scrollbar-track-[var(--background)] scrollbar-thumb-[var(--surface-hover)] dark:scrollbar-thumb-[var(--foreground-muted)] h-full overflow-y-auto p-4 scrollbar">
            <ResumeCard
              id={resume.id}
              fullname={resume.fullname}
              imageSource={resume.imageSource}
              title={resume.title}
              summary={resume.summary}
              skills={resume.skills}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
