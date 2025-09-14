import { useEffect, useRef, useState, type JSX } from "react"
import ThemedDialog, {
  type ThemedDialogHandle,
} from "../../../../shared/ThemedDialog"
import DialogFooter from "../../../../shared/DialogFooter"
import Select from "../../../../shared/Select"
import type { Skill } from "../../../../api/model"
import AddNewSkillForm from "./AddNewSkillForm"
import { useTranslation } from "react-i18next"
import { useParams } from "react-router-dom"
import { useAuth } from "../../../login/use-auth"
import {
  useAddSkill,
  useAddSkillToResume,
  useResumeSkills,
  useUserSkills,
} from "../../../../api/queries"

interface AddSkillDialogProps {
  userSkills: Skill[]
  isOpened: () => boolean
  setOpened: (opened: boolean) => void
}

export default function AddSkillDialog({
  isOpened,
  setOpened,
}: AddSkillDialogProps): JSX.Element {
  const { id } = useParams<{ id: string }>()
  const resumeId = Number.parseInt(id || "0")
  const { t } = useTranslation()
  const addNewSkillOperationText = t("addSkill.addNewSkill")
  const selectedExistingSkillOperationText = t("addSkill.selectedExistingSkill")
  const [skillOperations] = useState<string[]>([
    selectedExistingSkillOperationText,
    addNewSkillOperationText,
  ])
  const [selectedOperation, setSelectedOperation] = useState<string>(
    skillOperations[0]!,
  )
  const { authData } = useAuth()
  const [newSkill, setNewSkill] = useState<Skill>({
    name: "",
    level: 0,
    domains: [],
  })
  const dialogRef = useRef<ThemedDialogHandle>(null)
  const { data: userSkills } = useUserSkills(authData.user!.jwtDesc)
  const { data: resumeSkills } = useResumeSkills(
    authData.user!.jwtDesc,
    resumeId,
  )
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null)
  const addSkill = useAddSkill(t)
  const addSkillToResume = useAddSkillToResume(t, resumeId)

  async function handleAddNewSkill() {
    await addSkill.mutateAsync({
      token: authData.user!.jwtDesc,
      skill: newSkill,
    })
    await addSkillToResume.mutateAsync({
      token: authData.user!.jwtDesc,
      resumeId,
      skillName: newSkill.name,
    })
    setOpened(false)
  }

  async function handleAddExistingSkill() {
    await addSkillToResume.mutateAsync({
      token: authData.user!.jwtDesc,
      resumeId,
      skillName: selectedSkill!,
    })
    setOpened(false)
  }

  function getUserSkillsMissingFromResume(): string[] {
    const resumeSkillNames = resumeSkills.map((s) => s.name)
    const userSkillNames = userSkills.map((s) => s.name)
    return userSkillNames.filter((skill) => !resumeSkillNames.includes(skill))
  }

  function isValidNewSkill(): boolean {
    return (
      newSkill.name.length > 0 &&
      newSkill.domains.length > 0 &&
      getUserSkillsMissingFromResume().find((s) => s === newSkill.name) ===
        undefined
    )
  }

  function isValidExistingSkill(): boolean {
    return selectedSkill !== null && selectedSkill.length > 0
  }

  useEffect(() => {
    clearForms()
  }, [selectedOperation])

  function clearForms() {
    setNewSkill({ name: "", level: 0, domains: [] })
    setSelectedSkill(null)
  }

  return (
    <ThemedDialog
      ref={dialogRef}
      open={isOpened}
      onClose={() => setOpened(false)}
      title={t("addSkill.addSkill")}
      footer={
        <DialogFooter
          onConfirm={
            selectedOperation === addNewSkillOperationText
              ? handleAddNewSkill
              : handleAddExistingSkill
          }
          isValid={
            selectedOperation === addNewSkillOperationText
              ? isValidNewSkill
              : isValidExistingSkill
          }
        />
      }
    >
      <div className="flex min-h-72 flex-col items-center gap-6 pt-6">
        <Select
          items={skillOperations}
          selectedItem={() => selectedOperation}
          selectItem={setSelectedOperation}
          placeholder={t("addSkill.selectOperation")}
        />
        {selectedOperation === selectedExistingSkillOperationText && (
          <Select
            items={getUserSkillsMissingFromResume()}
            selectedItem={() => selectedSkill}
            selectItem={setSelectedSkill}
            placeholder={t("addSkill.selectExistingSkill")}
          />
        )}
        {selectedOperation === addNewSkillOperationText && (
          <AddNewSkillForm setSkill={setNewSkill} />
        )}
      </div>
    </ThemedDialog>
  )
}
