import { useEffect, useState } from "react"
import ValidatedTextInput from "../../../../../shared/ValidatedTextInput"
import { useTranslation } from "react-i18next"
import Button from "../../../../../shared/Button"
import { useExperienceValidationState } from "../../../../../app/experience-validation-state-hook"
import { ValidationStatus } from "../../../../../api/model"

export interface ExperienceBusinessProps {
  nextStep: () => void
}

export default function ExperienceBusiness({
  nextStep,
}: ExperienceBusinessProps) {
  const { t } = useTranslation()
  const [isTextValid, setTextValid] = useState<boolean>(false)
  const { validationState, mutateValidationState } =
    useExperienceValidationState()
  const [business, setBusiness] = useState<string>(
    validationState.experience.business,
  )
  const isValid = validationState.steps[0]!.status === ValidationStatus.VALID

  function changeValidationStep(stepId: number, status: ValidationStatus) {
    const newSteps = validationState.steps.map((step) =>
      step.id === stepId ? { ...step, status: status } : step,
    )
    const newState = {
      ...validationState,
      steps: newSteps,
    }
    mutateValidationState(newState)
  }

  async function validate() {
    changeValidationStep(1, ValidationStatus.VALID)
  }

  function confirm() {
    nextStep()
  }

  useEffect(() => {
    mutateValidationState({
      ...validationState,
      experience: {
        ...validationState.experience,
        business: business,
      },
    })
  }, [business])

  return (
    <div className="flex w-full flex-col items-center justify-between gap-4">
      <ValidatedTextInput
        placeholder={t("resumeExperience.business")}
        getInputValue={() => business}
        setInputValue={setBusiness}
        isPassword={false}
        minLength={3}
        maxLength={30}
        validationMessage={t("validation.length", { min: 3, max: 30 })}
        isValid={() => isTextValid}
        setValid={setTextValid}
      />
      {!isValid && (
        <Button
          text={t("common.validate")}
          onClick={validate}
          disabled={() => !isTextValid}
        />
      )}
      {isValid && (
        <div className="flex w-full justify-between">
          <div></div>
          <Button
            overrideStyles="bg-green-700 border-green-300 hover:bg-green-600 hover:border-green-400"
            text={t("common.next")}
            onClick={confirm}
          />
        </div>
      )}
    </div>
  )
}
