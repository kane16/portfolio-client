import { useAppSelector } from "../../../app/hooks"

export default function ResumeDescription() {
  const resumeDescription = useAppSelector(
    (state) => state.portfolio.resume?.shortDescription,
  )

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-3xl font-bold">Developer Description</div>
      <div className="text-xl">{resumeDescription}</div>
    </div>
  )
}
