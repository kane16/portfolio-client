import { useEffect, useState, type JSX } from "react"
import ValidatedTextInput from "../../../../../shared/ValidatedTextInput"
import StarLevelPicker from "../../../../../shared/StarLevelPicker"
import MultiSelect from "../../../../../shared/MultiSelect"
import { useAuth } from "../../../../login/use-auth"
import { useSkillDomains } from "../../../../../api/skills"
import { useTranslation } from "react-i18next"
import type { Skill } from "../../../../../api"
import { CircleLoader } from "react-spinners"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAdd } from "@fortawesome/free-solid-svg-icons"
import DomainDialog from "./DomainDialog"
import { useConstraint } from "../../../../../app/constraint-state-hook"

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
  const { token } = useAuth()
  const { data: domainsOpt, isPending: isDomainsPending } = useSkillDomains(
    token!,
  )
  const [selectedDomains, setSelectedDomains] = useState<SkillDomain[]>(
    initialSkill?.domains.map((d) => ({ name: d })) || [],
  )
  const [addDomainOpened, setAddDomainOpened] = useState(false)
  const { t } = useTranslation()
  const { findConstraint } = useConstraint()
  const skillNameConstraints = findConstraint("resume.skill.name").constraints
  const skillNameMin = skillNameConstraints.minLength ?? 1
  const skillNameMax = skillNameConstraints.maxLength ?? 30

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
        min={skillNameMin}
        max={skillNameMax}
        setValid={setNameValid}
        isValid={nameValid}
        isCustomValidationPassing={isSkillUnique}
        validationMessage={t("addSkill.invalidSkillNameLength")}
        inputWidth={72}
        setInputValue={setName}
        value={name}
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
