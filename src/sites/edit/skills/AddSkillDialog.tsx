import { useRef, useState, type JSX } from "react"
import ThemedDialog, {
  type ThemedDialogHandle,
} from "../../../shared/ThemedDialog"
import MultiSelect from "../../../shared/MultiSelect"
import { useTranslation } from "react-i18next"
import { useAuth } from "../../login/use-auth"
import { useAddSkill, useAddSkillToResume, useSkillDomains } from "../../../api/queries"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAdd } from "@fortawesome/free-solid-svg-icons"
import DialogFooter from "../../../shared/DialogFooter"
import AddDomainDialog from "./AddDomainDialog"
import ValidatedTextInput from "../../../shared/ValidatedTextInput"
import StarLevelPicker from "../../../shared/StarLevelPicker"
import { useParams } from "react-router"

interface AddSkillDialogProps {
  isOpened: () => boolean
  setOpened: (opened: boolean) => void
}

interface SkillDomain {
  name: string
}

export default function AddSkillDialog({
  isOpened,
  setOpened,
}: AddSkillDialogProps): JSX.Element {
  const { id } = useParams<{ id: string }>()
  const resumeId = Number.parseInt(id || "0")
  const [name, setName] = useState<string>("")
  const [starLevel, setStarLevel] = useState<number>(0)
  const [nameValid, setNameValid] = useState<boolean>(false)
  const dialogRef = useRef<ThemedDialogHandle>(null)
  const { t } = useTranslation()
  const { authData } = useAuth()
  const { data: domains } = useSkillDomains(authData.user!.jwtDesc)
  const [selectedDomains, setSelectedDomains] = useState<SkillDomain[]>(
    domains.map((domain) => ({ name: domain })),
  )
  const [addDomainOpened, setAddDomainOpened] = useState(false)
  const addSkill = useAddSkill(t)
  const addSkillToResume = useAddSkillToResume(t, resumeId)

  function isValid(): boolean {
    return nameValid && selectedDomains.length > 0
  }

  async function handleAddSkill() {
    await addSkill.mutateAsync({
      token: authData.user!.jwtDesc,
      skill: {
        name,
        level: starLevel,
        domains: selectedDomains.map((domain) => domain.name),
      },
    })
    await addSkillToResume.mutateAsync({
      token: authData.user!.jwtDesc,
      resumeId,
      skillName: name,
    })
    setOpened(false)
  }

  return (
    <ThemedDialog
      ref={dialogRef}
      open={isOpened}
      onClose={() => setOpened(false)}
      title={t("addSkill.addSkill")}
      footer={
        <DialogFooter onConfirm={handleAddSkill} isValid={isValid} />
      }
    >
      <div className="flex min-h-64 flex-col items-center justify-center gap-6">
        <ValidatedTextInput
          minLength={1}
          maxLength={30}
          setValid={setNameValid}
          isValid={() => nameValid}
          validationMessage={t("addSkill.invalidSkillNameLength")}
          inputWidth={72}
          setInputValue={setName}
          getInputValue={() => name}
          isPassword={false}
          placeholder={t("addSkill.skillName")}
        />
        <StarLevelPicker starLevel={() => starLevel} setStarLevel={setStarLevel} isDisabled={() => false} />
        <div className="flex gap-4">
          <MultiSelect
            items={domains.map((domain) => ({ name: domain }))}
            selectedItems={() => selectedDomains}
            selectItem={(item) => setSelectedDomains((prev) => [...prev, item])}
            clearItems={() => setSelectedDomains([])}
            placeholder={t("addSkill.selectDomains")}
          />
          <FontAwesomeIcon
            icon={faAdd}
            className="mt-3 cursor-pointer rounded bg-green-500 p-1.5 text-sm text-white transition duration-300 hover:bg-green-700"
            onClick={() => setAddDomainOpened(true)}
          />
        </div>
      </div>
      {addDomainOpened && (
        <AddDomainDialog
          isOpened={() => addDomainOpened}
          onClose={() => setAddDomainOpened(false)}
        />
      )}
    </ThemedDialog>
  )
}
