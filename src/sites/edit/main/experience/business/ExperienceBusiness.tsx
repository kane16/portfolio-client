import { useState } from "react"
import ValidatedTextInput from "../../../../../shared/ValidatedTextInput"
import { useTranslation } from "react-i18next"
import Button from "../../../../../shared/Button"
import { useExperienceValidationState } from "../../../../../app/experience-validation-state-hook"
import { ValidationStatus } from "../../../../../api/model"
import { useValidateBusiness } from "../../../../../api/queries"
import { useAuth } from "../../../../login/use-auth"
import { useParams } from "react-router-dom"
import { TextInputType } from "../../../../../shared/TextInputType"
import { useConstraint } from "../../../../../app/constraint-state-hook"

export default function ExperienceBusiness() {
  const { id } = useParams()
  const resumeId = Number.parseInt(id || "0")
  const { t } = useTranslation()
  const { authData } = useAuth()
  const [isTextValid, setTextValid] = useState<boolean>(false)
  const [isDescriptionValid, setDescriptionValid] = useState<boolean>(false)
  const { validationState, mutateValidationState } =
    useExperienceValidationState()
  const [business, setBusiness] = useState<string>(
    validationState.experience.business,
  )
  const [description, setDescription] = useState<string>(
    validationState.experience.description,
  )
  const validateBusiness = useValidateBusiness(t, resumeId)
  const isValid = validationState.steps[0]!.status === ValidationStatus.VALID
  const { findConstraint } = useConstraint()
  const businessConstraints = findConstraint(
    "resume.experience.business.name",
  ).constraints
  const businessMin = businessConstraints.minLength ?? 3
  const businessMax = businessConstraints.maxLength ?? 30
  const descriptionConstraints = findConstraint(
    "resume.experience.description",
  ).constraints
  const descriptionMin = descriptionConstraints.minLength ?? 10
  const descriptionMax = descriptionConstraints.maxLength ?? 300

  async function validate() {
    const validationResponse = await validateBusiness.mutateAsync({
      token: authData.user!.jwtDesc,
      business: business,
    })
    const newSteps = validationState.steps.map((step) =>
      step.id === validationState.activeStep
        ? {
            ...step,
            experience: {
              ...validationState.experience,
              business: business,
              description: description,
            },
            status: validationResponse.isValid
              ? ValidationStatus.VALID
              : ValidationStatus.INVALID,
          }
        : step,
    )
    const newState = {
      ...validationState,
      steps: newSteps,
    }
    mutateValidationState(newState)
  }

  return (
    <div className="justify flex w-full flex-col items-center justify-between">
      <div className="flex w-full flex-col items-center justify-start gap-4">
        <ValidatedTextInput
          placeholder={t("resumeExperience.business")}
          value={business}
          setInputValue={setBusiness}
          isPassword={false}
          min={businessMin}
          max={businessMax}
          validationMessage={t("validation.length", {
            min: businessMin,
            max: businessMax,
          })}
          isValid={isTextValid}
          setValid={setTextValid}
          inputWidth={80}
        />
        <ValidatedTextInput
          placeholder={t("resumeExperience.businessDescription")}
          value={description}
          setInputValue={setDescription}
          isPassword={false}
          min={descriptionMin}
          max={descriptionMax}
          validationMessage={t("validation.length", {
            min: descriptionMin,
            max: descriptionMax,
          })}
          isValid={isDescriptionValid}
          setValid={setDescriptionValid}
          inputWidth={80}
          inputType={TextInputType.TEXTAREA}
        />
      </div>
      {!isValid && (
        <Button
          text={t("common.validate")}
          onClick={validate}
          disabled={() => !isTextValid || !isDescriptionValid}
        />
      )}
    </div>
  )
}
