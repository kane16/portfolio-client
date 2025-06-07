import ResumeListView from "./ResumeListView"

export default function ResumeInfoMatrix() {
  return (
    <div className="w-full justify-between md:flex">
      <ResumeListView name="Table 1" />
      <ResumeListView name="Table 2" />
    </div>
  )
}
