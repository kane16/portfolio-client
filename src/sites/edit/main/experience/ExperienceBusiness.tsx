import { useEffect, useState } from "react"
import type { Project } from "../../../../api/model"
import ValidatedTextInput from "../../../../shared/ValidatedTextInput"
import { useTranslation } from "react-i18next"
import Button from "../../../../shared/Button"

export interface ExperienceBusinessProps {
  setExperience: (experience: Project) => void
  experience: Project
  validate: () => void
}

export default function ExperienceBusiness({
  experience,
  setExperience,
  validate,
}: ExperienceBusinessProps) {
  const { t } = useTranslation()
  const [isValid, setIsValid] = useState<boolean>(false)
  const [business, setBusiness] = useState<string>(experience.business)

  useEffect(() => {
    setExperience({ ...experience, business: business })
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
        isValid={() => isValid}
        setValid={setIsValid}
      />
      <Button
        text={t("common.validate")}
        onClick={validate}
        disabled={() => !isValid}
      />
    </div>
  )
}
