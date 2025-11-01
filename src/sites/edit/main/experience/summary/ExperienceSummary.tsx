import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import ValidatedTextInput from "../../../../../shared/ValidatedTextInput"
import { TextInputType } from "../../../../../shared/TextInputType"
import Button from "../../../../../shared/Button"
import { useExperienceValidationState } from "../../../../../app/experience-validation-state-hook"
import { useAuth } from "../../../../login/use-auth"
import { useParams } from "react-router-dom"
import { useValidateExperience } from "../../../../../api/queries"
import { ValidationStatus } from "../../../../../api/model"

export default function ExperienceSummary() {
  const { id } = useParams()
  const resumeId = Number.parseInt(id || "0")
  const { t } = useTranslation()
  const { validationState, mutateValidationState } =
    useExperienceValidationState()
  const [position, setPosition] = useState(validationState.experience.position)
  const [summary, setSummary] = useState(validationState.experience.summary)
  const [isPositionValid, setPositionValid] = useState(false)
  const [isSummaryValid, setSummaryValid] = useState(false)
  const isValid =
    validationState.steps.find((s) => s.id === validationState.activeStep)
      ?.status === ValidationStatus.VALID
  const { authData } = useAuth()
  const validateExperience = useValidateExperience(
    t,
    resumeId,
    authData.user!.jwtDesc,
  )

  async function validate() {
    const validationResponse = await validateExperience.mutateAsync({
      experience: validationState.experience,
    })
    mutateValidationState({
      ...validationState,
      steps: validationState.steps.map((step) => {
        return step.id === validationState.activeStep
          ? {
              ...step,
              status: validationResponse.isValid
                ? ValidationStatus.VALID
                : ValidationStatus.INVALID,
            }
          : step
      }),
    })
  }

  useEffect(() => {
    mutateValidationState({
      ...validationState,
      experience: {
        ...validationState.experience,
        summary: summary,
        position: position,
      },
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [summary, position])

  return (
    <div className="flex w-full flex-col items-center justify-between">
      <div className="flex flex-col gap-6">
        <ValidatedTextInput
          placeholder={t("experience.position.label")}
          value={position}
          setInputValue={setPosition}
          isPassword={false}
          inputWidth={80}
          min={6}
          max={30}
          isValid={isPositionValid}
          validationMessage={t("validation.length", { min: 6, max: 30 })}
          setValid={setPositionValid}
        />
        <ValidatedTextInput
          placeholder={t("experience.summary.label")}
          value={summary}
          setInputValue={setSummary}
          inputWidth={80}
          inputType={TextInputType.TEXTAREA}
          isPassword={false}
          min={10}
          max={100}
          validationMessage={t("validation.length", { min: 10, max: 100 })}
          isValid={isSummaryValid}
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
