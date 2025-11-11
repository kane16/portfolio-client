import { useState } from "react"
import ValidatedTextInput from "../../../../../shared/ValidatedTextInput"
import { useTranslation } from "react-i18next"
import Button from "../../../../../shared/Button"
import { TextInputType } from "../../../../../shared/TextInputType"
import { useAuth } from "../../../../login/use-auth"
import { useParams } from "react-router-dom"
import { type Project } from "../../../../../api/model"
import { useValidateSideProjectBusiness } from "../../../../../api/queries"
import { useConstraint } from "../../../../../app/constraint-state-hook"

interface SideProjectBusinessProps {
  project: Project
  onBusinessChanged: (businessName: string, description: string) => void
}

export default function SideProjectBusiness({
  project,
  onBusinessChanged,
}: SideProjectBusinessProps) {
  const { id } = useParams()
  const resumeId = Number.parseInt(id || "0")
  const { t } = useTranslation()
  const { authData } = useAuth()
  const [isBusinessValid, setBusinessValid] = useState<boolean>(false)
  const [isDescriptionValid, setDescriptionValid] = useState<boolean>(false)
  const [business, setBusiness] = useState<string>(project.business)
  const [description, setDescription] = useState<string>(project.description)
  const validateBusiness = useValidateSideProjectBusiness(t, resumeId)
  const { findConstraint } = useConstraint()
  const businessConstraints = findConstraint(
    "resume.sideProject.business.name",
  ).constraints
  const businessMin = businessConstraints.minLength ?? 3
  const businessMax = businessConstraints.maxLength ?? 30
  const descriptionConstraints = findConstraint(
    "resume.sideProject.description",
  ).constraints
  const descriptionMin = descriptionConstraints.minLength ?? 10
  const descriptionMax = descriptionConstraints.maxLength ?? 300

  async function validateAndSave() {
    const validationResponse = await validateBusiness.mutateAsync({
      token: authData.user!.jwtDesc,
      business,
    })
    if (validationResponse.isValid) {
      onBusinessChanged(business, description)
    }
  }

  function isSaveVisible() {
    return (
      isBusinessValid &&
      isDescriptionValid &&
      (project.business !== business || project.description !== description)
    )
  }

  return (
    <div className="justify flex w-full flex-col items-center justify-between">
      <div className="flex w-full flex-col items-center justify-start gap-4">
        <ValidatedTextInput
          placeholder={t("resumeSideProject.business")}
          value={business}
          setInputValue={setBusiness}
          isPassword={false}
          min={businessMin}
          max={businessMax}
          validationMessage={t("validation.length", {
            min: businessMin,
            max: businessMax,
          })}
          isValid={isBusinessValid}
          setValid={setBusinessValid}
          inputWidth={80}
        />
        <ValidatedTextInput
          placeholder={t("resumeSideProject.businessDescription")}
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
      {isSaveVisible() && (
        <Button
          text={t("common.validateAndSave")}
          onClick={validateAndSave}
          disabled={() => !isBusinessValid || !isDescriptionValid}
        />
      )}
    </div>
  )
}
