import { useEffect, useState } from "react"
import ValidatedTextInput from "../../../../../shared/ValidatedTextInput"
import { useTranslation } from "react-i18next"
import Button from "../../../../../shared/Button"
import { TextInputType } from "../../../../../shared/TextInputType"
import { useAuth } from "../../../../login/use-auth"
import { useParams } from "react-router-dom"
import { ValidationStatus } from "../../../../../api/model"
import { useSideProjectValidationState } from "../../../../../app/side-project-validation-state-hook"
import { useValidateSideProjectBusiness } from "../../../../../api/queries"

export default function SideProjectBusiness() {
  const { id } = useParams()
  const resumeId = Number.parseInt(id || "0")
  const { t } = useTranslation()
  const { authData } = useAuth()
  const [isBusinessValid, setBusinessValid] = useState<boolean>(false)
  const [isDescriptionValid, setDescriptionValid] = useState<boolean>(false)
  const { validationState, mutateValidationState } =
    useSideProjectValidationState()
  const [business, setBusiness] = useState<string>(
    validationState.project.business,
  )
  const [description, setDescription] = useState<string>(
    validationState.project.description,
  )
  const validateBusiness = useValidateSideProjectBusiness(t, resumeId)
  const isValid = validationState.steps[0]?.status === ValidationStatus.VALID

  async function validate() {
    const validationResponse = await validateBusiness.mutateAsync({
      token: authData.user!.jwtDesc,
      business,
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
    mutateValidationState({
      ...validationState,
      steps: newSteps,
    })
  }

  useEffect(() => {
    mutateValidationState({
      ...validationState,
      project: {
        ...validationState.project,
        business,
        description,
      },
    })
  }, [business, description, mutateValidationState, validationState])

  return (
    <div className="justify flex w-full flex-col items-center justify-between">
      <div className="flex w-full flex-col items-center justify-start gap-4">
        <ValidatedTextInput
          placeholder={t("resumeSideProject.business")}
          value={business}
          setInputValue={setBusiness}
          isPassword={false}
          min={3}
          max={30}
          validationMessage={t("validation.length", { min: 3, max: 30 })}
          isValid={isBusinessValid}
          setValid={setBusinessValid}
          inputWidth={80}
        />
        <ValidatedTextInput
          placeholder={t("resumeSideProject.businessDescription")}
          value={description}
          setInputValue={setDescription}
          isPassword={false}
          min={10}
          max={300}
          validationMessage={t("validation.length", { min: 10, max: 300 })}
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
          disabled={() => !isBusinessValid || !isDescriptionValid}
        />
      )}
    </div>
  )
}
