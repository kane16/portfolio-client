
export default function ResumeDescription({ resumeDescription }: { resumeDescription: string }) {

  return (
    <div className="flex flex-col items-center gap-4">
      <div>{resumeDescription}</div>
    </div>
  )
}
