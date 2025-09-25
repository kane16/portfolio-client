import { useRef, useState, type JSX } from "react"
import type { ThemedDialogHandle } from "../../../../../shared/ThemedDialog"
import ThemedDialog from "../../../../../shared/ThemedDialog"
import DialogFooter from "../../../../../shared/DialogFooter"
import { useTranslation } from "react-i18next"
import ValidatedTextInput from "../../../../../shared/ValidatedTextInput"
import { useAddDomain } from "../../../../../api/queries"
import { useAuth } from "../../../../login/use-auth"

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
  const { authData } = useAuth()
  const [name, setName] = useState("")
  const dialogRef = useRef<ThemedDialogHandle>(null)
  const { t } = useTranslation()
  const [nameValid, setNameValid] = useState(false)
  const addDomain = useAddDomain(t)

  function handleAddDomain() {
    addDomain.mutate({ token: authData.user!.jwtDesc, domain: name })
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
          minLength={3}
          maxLength={30}
          setValid={setNameValid}
          isValid={() => nameValid}
          isCustomValidationPassing={isDomainUnique}
          validationMessage={t("addDomain.invalidDomainNameLength")}
          inputWidth={72}
          setInputValue={setName}
          getInputValue={() => name}
          isPassword={false}
          placeholder={t("addDomain.domainName")}
        />
      </div>
    </ThemedDialog>
  )
}
