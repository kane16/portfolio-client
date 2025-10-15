import { useEffect, useState } from "react"
import ValidatedTextInput from "../../../../../shared/ValidatedTextInput"
import { useTranslation } from "react-i18next"
import Button from "../../../../../shared/Button"
import { useExperienceValidationState } from "../../../../../app/experience-validation-state-hook"
import { ValidationStatus } from "../../../../../api/model"
import { useValidateBusiness } from "../../../../../api/queries"
import { useAuth } from "../../../../login/use-auth"
import { useParams } from "react-router-dom"
import { TextInputType } from "../../../../../shared/TextInputType"

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

  async function validate() {
    const validationResponse = await validateBusiness.mutateAsync({
      token: authData.user!.jwtDesc,
      business: business,
    })
    const newSteps = validationState.steps.map((step) =>
      step.id === validationState.activeStep
        ? {
            ...step,
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

  useEffect(() => {
    mutateValidationState({
      ...validationState,
      experience: {
        ...validationState.experience,
        business: business,
        description: description,
      },
    })
  }, [business, description])

  return (
    <div className="justify flex w-full flex-col items-center justify-between">
      <div className="flex w-full flex-col items-center justify-start gap-4">
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
          inputWidth={80}
        />
        <ValidatedTextInput
          placeholder={t("resumeExperience.businessDescription")}
          getInputValue={() => description}
          setInputValue={setDescription}
          isPassword={false}
          minLength={10}
          maxLength={300}
          validationMessage={t("validation.length", { min: 10, max: 300 })}
          isValid={() => isDescriptionValid}
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
