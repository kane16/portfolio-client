import { useRef, useState, type JSX } from "react"
import ThemedDialog, {
  type ThemedDialogHandle,
} from "../../../../shared/ThemedDialog"
import DialogFooter from "../../../../shared/DialogFooter"
import { useTranslation } from "react-i18next"
import ValidatedTextInput from "../../../../shared/ValidatedTextInput"
import { useParams } from "react-router-dom"
import { useAuth } from "../../../login/use-auth"
import { useAddHobbyToResume } from "../../../../api/queries"
import { useConstraint } from "../../../../app/constraint-state-hook"

interface HobbyDialogProps {
  dialogTitle: string
  initialHobby: string
  existingHobbies: string[]
  isOpened: () => boolean
  setOpened: (opened: boolean) => void
}

export default function HobbyDialog({
  dialogTitle,
  initialHobby,
  existingHobbies,
  isOpened,
  setOpened,
}: HobbyDialogProps): JSX.Element {
  const dialogRef = useRef<ThemedDialogHandle>(null)
  const { t } = useTranslation()
  const { token } = useAuth()
  const { id } = useParams<{ id: string }>()
  const resumeId = Number.parseInt(id || "0")
  const [initialName] = useState(initialHobby)
  const [hobbyName, setHobbyName] = useState(initialHobby)
  const [isValidHobby, setValidHobby] = useState(false)
  const addHobbyToResume = useAddHobbyToResume(t, resumeId)
  const { findConstraint } = useConstraint()
  const hobbyConstraints = findConstraint("resume.hobby.name").constraints
  const hobbyMin = hobbyConstraints.minLength ?? 1
  const hobbyMax = hobbyConstraints.maxLength ?? 50

  async function handleConfirm() {
    const hobbyAdded = await addHobbyToResume.mutateAsync({
      token: token!,
      hobby: hobbyName,
    })
    if (hobbyAdded) {
      setOpened(false)
    }
  }

  function isHobbyUnique() {
    return !existingHobbies.some((existing) => {
      const normalizedExisting = existing.toLowerCase()
      const normalizedCurrent = hobbyName.toLowerCase()
      const normalizedInitial = initialName.toLowerCase()
      return (
        normalizedExisting === normalizedCurrent &&
        normalizedExisting !== normalizedInitial
      )
    })
  }

  return (
    <ThemedDialog
      ref={dialogRef}
      open={isOpened}
      onClose={() => setOpened(false)}
      title={dialogTitle}
      footer={
        <DialogFooter
          onConfirm={handleConfirm}
          isValid={() => isValidHobby && isHobbyUnique()}
        />
      }
    >
      <div className="flex min-h-48 flex-col items-center gap-6 pt-6">
        <ValidatedTextInput
          min={hobbyMin}
          max={hobbyMax}
          setValid={setValidHobby}
          isValid={isValidHobby && isHobbyUnique()}
          isCustomValidationPassing={isHobbyUnique}
          validationMessage={t("addHobby.invalidHobbyNameLength")}
          inputWidth={72}
          setInputValue={setHobbyName}
          value={hobbyName}
          isPassword={false}
          placeholder={t("addHobby.hobbyName")}
        />
      </div>
    </ThemedDialog>
  )
}
