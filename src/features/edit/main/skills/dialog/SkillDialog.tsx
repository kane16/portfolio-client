import { useRef, useState, type JSX } from "react"
import ThemedDialog, {
  type ThemedDialogHandle,
} from "../../../../../shared/ThemedDialog"
import DialogFooter from "../../../../../shared/DialogFooter"
import type { Skill } from "../../../../../api"
import SkillForm from "./SkillForm"
import { useTranslation } from "react-i18next"
import { useParams } from "react-router-dom"
import { useAuth } from "../../../../login/use-auth"
import {
  useAddSkillToResume,
  useEditSkillInResume,
  useResumeSkills,
} from "../../../../../api/skills"
import { CircleLoader } from "react-spinners"

interface SkillDialogProps {
  dialogTitle: string
  initialSkill: Skill
  userSkills: Skill[]
  isOpened: () => boolean
  setOpened: (opened: boolean) => void
}

export default function SkillDialog({
  isOpened,
  setOpened,
  userSkills,
  initialSkill,
  dialogTitle,
}: SkillDialogProps): JSX.Element {
  const { id } = useParams<{ id: string }>()
  const resumeId = Number.parseInt(id || "0")
  const { t } = useTranslation()
  const { token } = useAuth()
  const [initialName] = useState(initialSkill.name)
  const [skill, setSkill] = useState<Skill>(initialSkill)
  const dialogRef = useRef<ThemedDialogHandle>(null)
  const [isValidSkill, setValidSkill] = useState(false)
  const { data: resumeSkillsOpt, isPending } = useResumeSkills(token!, resumeId)
  const addSkillToResume = useAddSkillToResume(t, resumeId)
  const editSkillOnResume = useEditSkillInResume(t, resumeId)

  async function handleSkillOperationTriggered() {
    if (initialName.length > 0) {
      await editSkillOnResume.mutateAsync({
        token: token!,
        initialSkillName: initialName,
        skill: skill,
      })
    } else {
      await addSkillToResume.mutateAsync({
        token: token!,
        skill: skill,
      })
    }
    setOpened(false)
  }

  if (isPending) {
    return <CircleLoader size={100} color="var(--foreground)" />
  }
  const resumeSkills = resumeSkillsOpt || []

  return (
    <ThemedDialog
      ref={dialogRef}
      open={isOpened}
      onClose={() => setOpened(false)}
      title={dialogTitle}
      footer={
        <DialogFooter
          onConfirm={handleSkillOperationTriggered}
          isValid={() =>
            isValidSkill && !resumeSkills.some((s) => s.name === skill.name)
          }
        />
      }
    >
      <div className="flex min-h-72 flex-col items-center gap-6 pt-6">
        <SkillForm
          initialSkill={initialSkill}
          setSkill={setSkill}
          skills={userSkills}
          setValid={setValidSkill}
        />
      </div>
    </ThemedDialog>
  )
}
