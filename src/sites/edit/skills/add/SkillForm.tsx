import { useEffect, useState, type JSX } from "react"
import ValidatedTextInput from "../../../../shared/ValidatedTextInput"
import StarLevelPicker from "../../../../shared/StarLevelPicker"
import MultiSelect from "../../../../shared/MultiSelect"
import { useAuth } from "../../../login/use-auth"
import { useSkillDomains } from "../../../../api/queries"
import { useTranslation } from "react-i18next"
import type { Skill } from "../../../../api/model"
import { CircleLoader } from "react-spinners"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAdd } from "@fortawesome/free-solid-svg-icons"
import DomainDialog from "./DomainDialog"

interface SkillDomain {
  name: string
}

interface SkillFormProps {
  initialSkill: Skill | null
  setValid: (isValid: boolean) => void
  setSkill: (skill: Skill) => void
  skills: Skill[]
}

export default function SkillForm({
  initialSkill,
  setValid,
  setSkill,
  skills,
}: SkillFormProps): JSX.Element {
  const [name, setName] = useState<string>(initialSkill?.name || "")
  const [starLevel, setStarLevel] = useState<number>(initialSkill?.level || 0)
  const [nameValid, setNameValid] = useState<boolean>(false)
  const { authData } = useAuth()
  const { data: domainsOpt, isPending: isDomainsPending } = useSkillDomains(
    authData.user!.jwtDesc,
  )
  const [selectedDomains, setSelectedDomains] = useState<SkillDomain[]>(initialSkill?.domains.map((d) => ({ name: d })) || [])
  const [addDomainOpened, setAddDomainOpened] = useState(false)
  const { t } = useTranslation()

  useEffect(() => {
    setSkill({
      name,
      level: starLevel,
      domains: selectedDomains.map((d) => d.name),
    })
    setValid(nameValid && name.length > 0 && starLevel > 0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, starLevel, selectedDomains])

  if (isDomainsPending) {
    return <CircleLoader size={100} color="var(--foreground)" />
  }

  function isSkillUnique(): boolean {
    return !skills.some((skill) => skill.name === name)
  }

  function onMultiSelectChoice(selected: SkillDomain): void {
    if (selectedDomains.find((d) => d.name === selected.name)) {
      setSelectedDomains(
        selectedDomains.filter((d) => d.name !== selected.name),
      )
    } else {
      setSelectedDomains([...selectedDomains, selected])
    }
  }

  const domains = domainsOpt || []
  return (
    <>
      <ValidatedTextInput
        minLength={1}
        maxLength={30}
        setValid={setNameValid}
        isValid={() => nameValid}
        isCustomValidationPassing={isSkillUnique}
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
          selectItem={onMultiSelectChoice}
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
        <DomainDialog
          domains={domains}
          isOpened={() => addDomainOpened}
          onClose={() => setAddDomainOpened(false)}
        />
      )}
    </>
  )
}
