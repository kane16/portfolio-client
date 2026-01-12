import { useState } from "react"
import { useTranslation } from "react-i18next"
import ValidatedTextInput from "../../../../../shared/ValidatedTextInput"
import { TextInputType } from "../../../../../shared/TextInputType"
import Button from "../../../../../shared/Button"
import { useAuth } from "../../../../login/use-auth"
import { useParams } from "react-router-dom"
import { useValidateSideProject } from "../../../../../api/queries"
import { type Project } from "../../../../../api/model"
import { useConstraint } from "../../../../../app/constraint-state-hook"

interface SideProjectSummaryProps {
  project: Project
  onSummaryChanged: (position: string, summary: string) => void
}

export default function SideProjectSummary({
  project,
  onSummaryChanged,
}: SideProjectSummaryProps) {
  const { id } = useParams()
  const resumeId = Number.parseInt(id || "0")
  const { t } = useTranslation()
  const [position, setPosition] = useState(project.position)
  const [summary, setSummary] = useState(project.summary)
  const [isPositionValid, setPositionValid] = useState(false)
  const [isSummaryValid, setSummaryValid] = useState(false)
  const { token } = useAuth()
  const validateSideProject = useValidateSideProject(t, resumeId, token!)
  const { findConstraint } = useConstraint()
  const positionConstraints = findConstraint(
    "resume.sideProject.position",
  ).constraints
  const summaryConstraints = findConstraint(
    "resume.sideProject.summary",
  ).constraints
  const positionMin = positionConstraints.minLength ?? 6
  const positionMax = positionConstraints.maxLength ?? 30
  const summaryMin = summaryConstraints.minLength ?? 10
  const summaryMax = summaryConstraints.maxLength ?? 100

  async function validateAndSave() {
    const validationResponse = await validateSideProject.mutateAsync({
      sideProject: {
        ...project,
        position,
        summary,
      },
    })
    if (validationResponse.isValid) {
      onSummaryChanged(position, summary)
    }
  }

  function isSaveVisible() {
    return (
      isPositionValid &&
      isSummaryValid &&
      (project.position !== position || project.summary !== summary)
    )
  }

  return (
    <div className="flex w-full flex-col items-center justify-between">
      <div className="flex flex-col gap-6">
        <ValidatedTextInput
          placeholder={t("sideProject.position.label")}
          value={position}
          setInputValue={setPosition}
          isPassword={false}
          inputWidth={80}
          min={positionMin}
          max={positionMax}
          isValid={isPositionValid}
          validationMessage={t("validation.length", {
            min: positionMin,
            max: positionMax,
          })}
          setValid={setPositionValid}
        />
        <ValidatedTextInput
          placeholder={t("sideProject.summary.label")}
          value={summary}
          setInputValue={setSummary}
          inputWidth={80}
          inputType={TextInputType.TEXTAREA}
          isPassword={false}
          min={summaryMin}
          max={summaryMax}
          validationMessage={t("validation.length", {
            min: summaryMin,
            max: summaryMax,
          })}
          isValid={isSummaryValid}
          setValid={setSummaryValid}
        />
      </div>
      {isSaveVisible() && (
        <Button
          text={t("common.validateAndSave")}
          onClick={validateAndSave}
          disabled={() => !(isPositionValid && isSummaryValid)}
        />
      )}
    </div>
  )
}
