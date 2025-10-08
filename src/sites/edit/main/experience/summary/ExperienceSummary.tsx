import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import ValidatedTextInput from "../../../../../shared/ValidatedTextInput"
import { TextInputType } from "../../../../../shared/TextInputType"
import Button from "../../../../../shared/Button"
import { useExperienceValidationState } from "../../../../../app/experience-validation-state-hook"
import { useAuth } from "../../../../login/use-auth"
import { useParams } from "react-router-dom"
import { useValidateExperience } from "../../../../../api/queries"
import toast from "react-hot-toast"

interface ExperienceSummaryProps {
  nextStep: () => void
}

export default function ExperienceSummary({
  nextStep,
}: ExperienceSummaryProps) {
  const { id } = useParams()
  const resumeId = Number.parseInt(id || "0")
  const { t } = useTranslation()
  const [summary, setSummary] = useState("")
  const [position, setPosition] = useState("")
  const [isPositionValid, setPositionValid] = useState(false)
  const [isSummaryValid, setSummaryValid] = useState(false)
  const [isValid, setValid] = useState(false)
  const { authData } = useAuth()
  const validateExperience = useValidateExperience(
    t,
    resumeId,
    authData.user!.jwtDesc,
  )
  const { validationState, mutateValidationState } =
    useExperienceValidationState()

  async function validate() {
    const validationResponse = await validateExperience.mutateAsync({
      experience: validationState.experience,
    })
    setValid(validationResponse.isValid)
    if (validationResponse.isValid) {
      toast.success(t("experience.validationSuccess"))
    } else {
      toast.error(t("experience.validationError"))
    }
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
  }, [summary, position])

  return (
    <div className="flex w-full flex-col items-center justify-between">
      <div className="flex flex-col gap-6">
        <ValidatedTextInput
          placeholder={t("experience.position.label")}
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
          placeholder={t("experience.summary.label")}
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
      <div>
        {!isValid && (
          <Button
            text={t("common.validate")}
            onClick={validate}
            disabled={() => !(isPositionValid && isSummaryValid)}
          />
        )}
        {isValid && (
          <Button
            text={t("common.next")}
            overrideStyles="bg-green-700 border-green-300 hover:bg-green-600 hover:border-green-400"
            onClick={nextStep}
            disabled={() => !(isPositionValid && isSummaryValid)}
          />
        )}
      </div>
    </div>
  )
}
