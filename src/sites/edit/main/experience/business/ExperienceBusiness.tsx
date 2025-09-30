import { useState } from "react"
import type { Project } from "../../../../../api/model"
import ValidatedTextInput from "../../../../../shared/ValidatedTextInput"
import { useTranslation } from "react-i18next"
import Button from "../../../../../shared/Button"

export interface ExperienceBusinessProps {
  setExperience: (experience: Project) => void
  experience: Project
  validate: () => void
  isValid: boolean
  nextStep: () => void
}

export default function ExperienceBusiness({
  experience,
  setExperience,
  validate,
  isValid,
  nextStep,
}: ExperienceBusinessProps) {
  const { t } = useTranslation()
  const [isTextValid, setTextValid] = useState<boolean>(false)
  const [business, setBusiness] = useState<string>(experience.business)

  function confirm() {
    setExperience({ ...experience, business: business })
    nextStep()
  }

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
      <div className="flex w-full justify-between">
        <div></div>
        {isValid && (
          <Button
            overrideStyles="bg-green-700 border-green-300 hover:bg-green-600 hover:border-green-400"
            text={t("common.next")}
            onClick={confirm}
          />
        )}
      </div>
    </div>
  )
}
