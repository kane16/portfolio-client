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
} from "../../../../api/queries"
import { CircleLoader } from "react-spinners"
import { useQueryClient } from "@tanstack/react-query"

interface AddSkillDialogProps {
  userSkills: Skill[]
  isOpened: () => boolean
  setOpened: (opened: boolean) => void
}

export default function AddSkillDialog({
  isOpened,
  setOpened,
  userSkills,
}: AddSkillDialogProps): JSX.Element {
  const queryClient = useQueryClient()
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
  const { data: resumeSkillsOpt, isPending: isResumeSkillsPending } =
    useResumeSkills(authData.user!.jwtDesc, resumeId)
  const [isValidNewSkill, setValidNewSkill] = useState(false)
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
    queryClient.invalidateQueries({ queryKey: ["resumeSkills", resumeId] })
    queryClient.invalidateQueries({ queryKey: ["validateResume", resumeId] })
    setOpened(false)
  }

  async function handleAddExistingSkill() {
    await addSkillToResume.mutateAsync({
      token: authData.user!.jwtDesc,
      resumeId,
      skillName: selectedSkill!,
    })
    queryClient.invalidateQueries({ queryKey: ["resumeSkills", resumeId] })
    queryClient.invalidateQueries({ queryKey: ["validateResume", resumeId] })
    setOpened(false)
  }

  useEffect(() => {
    clearForms()
  }, [selectedOperation])

  function clearForms() {
    setNewSkill({ name: "", level: 0, domains: [] })
    setSelectedSkill(null)
  }

  if (isResumeSkillsPending) {
    return <CircleLoader size={100} color="var(--foreground)" />
  }
  const resumeSkills = resumeSkillsOpt || []

  function getUserSkillsMissingFromResume(): string[] {
    const resumeSkillNames = resumeSkills.map((s) => s.name)
    const userSkillNames = userSkills.map((s) => s.name)
    return userSkillNames.filter((skill) => !resumeSkillNames.includes(skill))
  }

  function isValidExistingSkill(): boolean {
    return selectedSkill !== null && selectedSkill.length > 0
  }

  function isValidForm(): boolean {
    return selectedOperation === addNewSkillOperationText
      ? isValidNewSkill
      : isValidExistingSkill()
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
          isValid={isValidForm}
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
          <AddNewSkillForm
            setSkill={setNewSkill}
            skills={userSkills}
            setValid={setValidNewSkill}
          />
        )}
      </div>
    </ThemedDialog>
  )
}
