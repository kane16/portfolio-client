import { useEffect, useRef, useState, type JSX } from "react"
import ThemedDialog, {
  type ThemedDialogHandle,
} from "../../../../../shared/ThemedDialog"
import DialogFooter from "../../../../../shared/DialogFooter"
import ValidatedTextInput from "../../../../../shared/ValidatedTextInput"
import { LANGUAGE_LEVELS, type Language } from "../../../../../api/languages"
import { useTranslation } from "react-i18next"
import { useParams } from "react-router-dom"
import { useAuth } from "../../../../login/use-auth"
import {
  useAddLanguageToResume,
  useEditLanguageInResume,
} from "../../../../../api/languages"
import Select from "../../../../../shared/Select"
import { useConstraint } from "../../../../../app/constraint-state-hook"

interface LanguageDialogProps {
  dialogTitle: string
  initialLanguage: Language
  resumeLanguages: Language[]
  isOpened: () => boolean
  setOpened: (opened: boolean) => void
}

export default function LanguageDialog({
  isOpened,
  setOpened,
  resumeLanguages,
  initialLanguage,
  dialogTitle,
}: LanguageDialogProps): JSX.Element {
  const { id } = useParams<{ id: string }>()
  const resumeId = Number.parseInt(id || "0")
  const { t } = useTranslation()
  const { token } = useAuth()
  const [initialName] = useState(initialLanguage.name)
  const [language, setLanguage] = useState<Language>(initialLanguage)
  const dialogRef = useRef<ThemedDialogHandle>(null)
  const [isValidLanguage, setValidLanguage] = useState(false)
  const addLanguageToResume = useAddLanguageToResume(t, resumeId)
  const editLanguageOnResume = useEditLanguageInResume(t, resumeId)

  async function handleLanguageOperationTriggered() {
    if (initialName.length > 0) {
      await editLanguageOnResume.mutateAsync({
        token: token!,
        initialLanguageName: initialName,
        language,
        languageId: initialLanguage.id!,
      })
    } else {
      await addLanguageToResume.mutateAsync({
        token: token!,
        language,
      })
    }
    setOpened(false)
  }

  const isDuplicateName = resumeLanguages.some(
    (existingLanguage) =>
      existingLanguage.name === language.name &&
      existingLanguage.name !== initialName,
  )

  return (
    <ThemedDialog
      ref={dialogRef}
      open={isOpened}
      onClose={() => setOpened(false)}
      title={dialogTitle}
      footer={
        <DialogFooter
          onConfirm={handleLanguageOperationTriggered}
          isValid={() => isValidLanguage && !isDuplicateName}
        />
      }
    >
      <div className="flex min-h-60 flex-col items-center gap-6 pt-6">
        <LanguageForm
          initialLanguage={initialLanguage}
          resumeLanguages={resumeLanguages}
          setValidLanguage={setValidLanguage}
          isValidLanguage={isValidLanguage}
          setLanguage={setLanguage}
        />
        {isDuplicateName && (
          <span className="text-sm text-red-500">
            {t("addLanguage.duplicateLanguageName")}
          </span>
        )}
      </div>
    </ThemedDialog>
  )
}

interface LanguageFormProps {
  initialLanguage?: Language
  resumeLanguages: Language[]
  setValidLanguage: (valid: boolean) => void
  isValidLanguage: boolean
  setLanguage: (language: Language) => void
}

function LanguageForm({
  initialLanguage,
  resumeLanguages,
  setValidLanguage,
  isValidLanguage,
  setLanguage,
}: LanguageFormProps) {
  const { t } = useTranslation()
  const { findConstraint } = useConstraint()
  const languageConstraints = findConstraint("resume.language.name").constraints
  const languageMin = languageConstraints.minLength ?? 1
  const languageMax = languageConstraints.maxLength ?? 30
  const [name, setName] = useState(initialLanguage ? initialLanguage.name : "")
  const [level, setLevel] = useState(
    initialLanguage ? initialLanguage.level : LANGUAGE_LEVELS[0],
  )
  const isLanguageUnique = () =>
    !resumeLanguages.some((lang) => lang.name === name)

  useEffect(() => {
    setLanguage({ name, level })
  }, [name, level, setLanguage])

  return (
    <div className="flex flex-col items-center gap-6">
      <ValidatedTextInput
        min={languageMin}
        max={languageMax}
        setValid={setValidLanguage}
        isValid={isValidLanguage}
        isCustomValidationPassing={isLanguageUnique}
        validationMessage={t("addLanguage.invalidLanguageNameLength")}
        inputWidth={72}
        setInputValue={setName}
        value={name}
        isPassword={false}
        placeholder={t("addLanguage.languageName")}
      />
      <Select
        items={LANGUAGE_LEVELS.map((level) => level.toString())}
        placeholder={t("addLanguage.languageProficiencyLevel")}
        selectedItem={() => level}
        selectItem={(level) =>
          setLevel(
            LANGUAGE_LEVELS.find((l) => l === level) || LANGUAGE_LEVELS[0],
          )
        }
      />
    </div>
  )
}
