import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import ValidatedTextInput from "../../../../../shared/ValidatedTextInput"
import { TextInputType } from "../../../../../shared/TextInputType"
import Button from "../../../../../shared/Button"
import { useSideProjectValidationState } from "../../../../../app/side-project-validation-state-hook"
import { useAuth } from "../../../../login/use-auth"
import { useParams } from "react-router-dom"
import { useValidateSideProject } from "../../../../../api/queries"
import { ValidationStatus } from "../../../../../api/model"

export default function SideProjectSummary() {
  const { id } = useParams()
  const resumeId = Number.parseInt(id || "0")
  const { t } = useTranslation()
  const { validationState, mutateValidationState } =
    useSideProjectValidationState()
  const [position, setPosition] = useState(validationState.project.position)
  const [summary, setSummary] = useState(validationState.project.summary)
  const [isPositionValid, setPositionValid] = useState(false)
  const [isSummaryValid, setSummaryValid] = useState(false)
  const isValid =
    validationState.steps.find((step) => step.id === validationState.activeStep)
      ?.status === ValidationStatus.VALID
  const { authData } = useAuth()
  const validateSideProject = useValidateSideProject(
    t,
    resumeId,
    authData.user!.jwtDesc,
  )

  async function validate() {
    const validationResponse = await validateSideProject.mutateAsync({
      sideProject: validationState.project,
    })
    mutateValidationState({
      ...validationState,
      steps: validationState.steps.map((step) =>
        step.id === validationState.activeStep
          ? {
              ...step,
              status: validationResponse.isValid
                ? ValidationStatus.VALID
                : ValidationStatus.INVALID,
            }
          : step,
      ),
    })
  }

  useEffect(() => {
    mutateValidationState({
      ...validationState,
      project: {
        ...validationState.project,
        summary,
        position,
      },
    })
  }, [summary, position, mutateValidationState, validationState])

  return (
    <div className="flex w-full flex-col items-center justify-between">
      <div className="flex flex-col gap-6">
        <ValidatedTextInput
          placeholder={t("sideProject.position.label")}
          getInputValue={() => position}
          setInputValue={setPosition}
          isPassword={false}
          inputWidth={80}
          minLength={6}
          maxLength={30}
          isValid={() => isPositionValid}
          validationMessage={t("validation.length", { min: 6, max: 30 })}
          setValid={setPositionValid}
        />
        <ValidatedTextInput
          placeholder={t("sideProject.summary.label")}
          getInputValue={() => summary}
          setInputValue={setSummary}
          inputWidth={80}
          inputType={TextInputType.TEXTAREA}
          isPassword={false}
          minLength={10}
          maxLength={100}
          validationMessage={t("validation.length", { min: 10, max: 100 })}
          isValid={() => isSummaryValid}
          setValid={setSummaryValid}
        />
      </div>
      {!isValid && (
        <Button
          text={t("common.validate")}
          onClick={validate}
          disabled={() => !(isPositionValid && isSummaryValid)}
        />
      )}
    </div>
  )
}
