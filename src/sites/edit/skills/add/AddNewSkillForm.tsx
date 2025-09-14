import { useEffect, useState, type JSX } from "react"
import ValidatedTextInput from "../../../../shared/ValidatedTextInput"
import StarLevelPicker from "../../../../shared/StarLevelPicker"
import MultiSelect from "../../../../shared/MultiSelect"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useAuth } from "../../../login/use-auth"
import { useSkillDomains } from "../../../../api/queries"
import { useTranslation } from "react-i18next"
import { faAdd } from "@fortawesome/free-solid-svg-icons"
import AddDomainDialog from "../AddDomainDialog"
import type { Skill } from "../../../../api/model"


interface SkillDomain {
  name: string
}

interface AddNewSkillFormProps {
  setSkill: (skill: Skill) => void
}

export default function AddNewSkillForm(
  {
    setSkill
  }: AddNewSkillFormProps
): JSX.Element {
  const [name, setName] = useState<string>("")
  const [starLevel, setStarLevel] = useState<number>(0)
  const [nameValid, setNameValid] = useState<boolean>(false)
  const { authData } = useAuth()
  const { data: domains } = useSkillDomains(authData.user!.jwtDesc)
  const [selectedDomains, setSelectedDomains] = useState<SkillDomain[]>([])
  const [addDomainOpened, setAddDomainOpened] = useState(false)
  const { t } = useTranslation()

  useEffect(() => {
    setSkill({ name, level: starLevel, domains: selectedDomains.map(d => d.name) })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, starLevel, selectedDomains]);

  return (
    <>
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
      <StarLevelPicker
        starLevel={() => starLevel}
        setStarLevel={setStarLevel}
        isDisabled={() => false}
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
          className="mt-3 cursor-pointer rounded bg-green-500 p-1.5 text-sm text-white transition duration-300 hover:bg-green-700"
          onClick={() => setAddDomainOpened(true)}
        />
      </div>
      {addDomainOpened && (
        <AddDomainDialog
          isOpened={() => addDomainOpened}
          onClose={() => setAddDomainOpened(false)}
        />
      )}
    </>
  )
}
