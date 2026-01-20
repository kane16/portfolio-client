import { useRef, useState, type JSX } from "react"
import type { ThemedDialogHandle } from "../../../../../shared/ThemedDialog"
import ThemedDialog from "../../../../../shared/ThemedDialog"
import DialogFooter from "../../../../../shared/DialogFooter"
import { useTranslation } from "react-i18next"
import ValidatedTextInput from "../../../../../shared/ValidatedTextInput"
import { useAddDomain } from "../../../../../api/skills"
import { useAuth } from "../../../../login/use-auth"
import { useConstraint } from "../../../../../app/constraint-state-hook"

interface DomainDialogProps {
  domains: string[]
  isOpened: () => boolean
  onClose: () => void
}

export default function DomainDialog({
  domains,
  isOpened,
  onClose,
}: DomainDialogProps): JSX.Element {
  const { token } = useAuth()
  const [name, setName] = useState("")
  const dialogRef = useRef<ThemedDialogHandle>(null)
  const { t } = useTranslation()
  const [nameValid, setNameValid] = useState(false)
  const addDomain = useAddDomain(t)
  const { findConstraint } = useConstraint()
  const domainConstraints = findConstraint(
    "resume.skill.domain.name",
  ).constraints
  const domainMin = domainConstraints.minLength ?? 3
  const domainMax = domainConstraints.maxLength ?? 30

  function handleAddDomain() {
    addDomain.mutate({ token: token!, domain: name })
    onClose()
  }

  function isDomainUnique(): boolean {
    return !domains.includes(name)
  }

  return (
    <ThemedDialog
      ref={dialogRef}
      open={isOpened}
      onClose={onClose}
      title={t("addDomain.addDomain")}
      footer={
        <DialogFooter onConfirm={handleAddDomain} isValid={() => nameValid} />
      }
    >
      <div className="flex min-h-64 flex-col items-center justify-center gap-6">
        <ValidatedTextInput
          min={domainMin}
          max={domainMax}
          setValid={setNameValid}
          isValid={nameValid}
          isCustomValidationPassing={isDomainUnique}
          validationMessage={t("addDomain.invalidDomainNameLength")}
          inputWidth={72}
          setInputValue={setName}
          value={name}
          isPassword={false}
          placeholder={t("addDomain.domainName")}
        />
      </div>
    </ThemedDialog>
  )
}
