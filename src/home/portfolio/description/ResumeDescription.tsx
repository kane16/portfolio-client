import { useAppSelector } from "../../../app/hooks"

export default function ResumeDescription() {
  const resumeDescription = useAppSelector(
    (state) => state.portfolio.resume?.summary,
  )

  return (
    <div className="flex flex-col items-center gap-4">
      <div>{resumeDescription}</div>
    </div>
  )
}
