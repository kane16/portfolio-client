import { useRef, useState } from "react"
import type { Skill } from "../../../../../api"
import DialogFooter from "../../../../../shared/DialogFooter"
import ThemedDialog, {
  type ThemedDialogHandle,
} from "../../../../../shared/ThemedDialog"
import Dropdown from "../../../../../shared/Dropdown"
import { useTranslation } from "react-i18next"
import ValidatedTextInput from "../../../../../shared/ValidatedTextInput"

interface SideProjectSkillDialogProps {
  close: () => void
  isOpened: () => boolean
  title: string
  resumeSkills: Skill[]
  skillToEdit?: Skill
  handleSkillSubmitted: (skill: Skill) => void
}

export default function SideProjectSkillDialog({
  close,
  skillToEdit,
  isOpened,
  title,
  handleSkillSubmitted,
  resumeSkills,
}: SideProjectSkillDialogProps) {
  const { t } = useTranslation()
  const dialogRef = useRef<ThemedDialogHandle>(null)
  const [chosenSkill, setChosenSkill] = useState<Skill | undefined>(skillToEdit)
  const [detail, setDetail] = useState(skillToEdit?.detail || "")
  const [isDetailValid, setIsDetailValid] = useState(false)

  function handleSkillOperationTriggered() {
    handleSkillSubmitted({
      ...chosenSkill!,
      detail: detail.trim(),
    })
    close()
  }

  function isValid() {
    if (skillToEdit) {
      return (
        skillToEdit.name !== chosenSkill?.name ||
        skillToEdit.detail !== detail.trim()
      )
    }
    return chosenSkill !== undefined && isDetailValid
  }

  return (
    <ThemedDialog
      ref={dialogRef}
      open={isOpened}
      onClose={close}
      title={title}
      footer={
        <DialogFooter
          onConfirm={handleSkillOperationTriggered}
          isValid={isValid}
        />
      }
    >
      <div className="flex min-h-72 flex-col items-center gap-6 pt-6">
        <Dropdown
          name={t("sideProject.selectSkill")}
          options={resumeSkills.map((skill) => ({
            name: skill.name,
            label: skill.name,
          }))}
          currentValue={
            chosenSkill
              ? { name: chosenSkill.name, label: chosenSkill.name }
              : undefined
          }
          disabled={resumeSkills.length === 0}
          onSelected={(value) =>
            setChosenSkill(
              resumeSkills.find((skill) => skill.name === value?.name),
            )
          }
        />
        <ValidatedTextInput
          placeholder={t("sideProject.skillDetail")}
          value={detail}
          setInputValue={setDetail}
          isPassword={false}
          min={10}
          max={200}
          isValid={isDetailValid}
          setValid={setIsDetailValid}
        />
      </div>
    </ThemedDialog>
  )
}
