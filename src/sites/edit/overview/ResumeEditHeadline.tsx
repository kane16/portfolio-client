import type { JSX } from "react"
import type { ResumeVersion } from "../../../api/model"
import Button from "../../../shared/Button"

export default function ResumeEditHeadline({
  resumeVersion,
}: {
  resumeVersion: ResumeVersion
}): JSX.Element {
  function getResumeVersionStylesForState(state: string): string {
    switch (state) {
      case "DRAFT":
        return "dark:border-yellow-500"
      case "PUBLISHED":
        return "dark:border-green-500"
      case "ARCHIVED":
        return "dark:border-gray-500"
      default:
        return ""
    }
  }

  return (
    <div className="group">
      <div
        className={`absolute -z-10 -mt-6 ml-12 rounded-md bg-gray-300 p-1 text-sm text-black opacity-0 transition duration-500 group-hover:opacity-100`}
      >
        {resumeVersion.title}
      </div>
      <Button
        text={`Resume ${resumeVersion.id}`}
        onClick={() => console.log(`Resume ${resumeVersion.id} clicked`)}
        disabled={false}
        overrideStyles={`${getResumeVersionStylesForState(resumeVersion.state)}`}
      />
    </div>
  )
}
