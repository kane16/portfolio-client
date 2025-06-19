import { useAppSelector } from "../../../app/hooks"
import ResumeListView from "./ResumeList"

export default function ResumeInfoMatrix() {
  const skills = useAppSelector((state) => state.portfolio.resume?.skills)
  const experience = useAppSelector(
    (state) => state.portfolio.resume?.experience,
  )

  return (
    <div className="flex flex-col md:flex-row max-h-full w-full justify-between gap-4 md:flex">
      <ResumeListView name="Skills" data={skills?.values || []} />
      <ResumeListView name="Experience" data={experience?.values || []} />
    </div>
  )
}
