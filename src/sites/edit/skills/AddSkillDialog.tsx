import { useRef, useState, type JSX } from "react"
import ThemedDialog, {
  type ThemedDialogHandle,
} from "../../../shared/ThemedDialog"
import TextInput from "../../../shared/TextInput"
import MultiSelect from "../../../shared/MultiSelect"
import { useTranslation } from "react-i18next"
import { useAuth } from "../../login/use-auth"
import { useSkillDomains } from "../../../api/queries"
import Button from "../../../shared/Button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAdd } from "@fortawesome/free-solid-svg-icons"

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
  const [name, setName] = useState<string>("")
  const dialogRef = useRef<ThemedDialogHandle>(null)
  const { t } = useTranslation()
  const { authData } = useAuth()
  const { data: domains } = useSkillDomains(authData.user!.jwtDesc)
  const [selectedDomains, setSelectedDomains] = useState<SkillDomain[]>(
    domains.map((domain) => ({ name: domain })),
  )

  return (
    <ThemedDialog
      ref={dialogRef}
      open={isOpened}
      onClose={() => setOpened(false)}
      title="Add Skill"
      footer={
        <div className="flex justify-end gap-2">
          <Button text={t("addSkill.save")} onClick={() => setOpened(false)} />
        </div>
      }
    >
      <div className="flex min-h-64 flex-col items-center justify-center gap-6">
        <TextInput
          inputWidth={72}
          setInputValue={setName}
          getInputValue={() => name}
          isPassword={false}
          placeholder={t("addSkill.skillName")}
        />
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
            className="mt-1 cursor-pointer rounded bg-green-500 p-1.5 text-sm text-white transition duration-300 hover:bg-green-700"
            onClick={() => console.log("Add Skill Domain")}
          />
        </div>
      </div>
    </ThemedDialog>
  )
}
