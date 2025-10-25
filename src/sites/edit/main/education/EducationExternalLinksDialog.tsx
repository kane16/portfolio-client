import { useEffect, useState, type JSX } from "react"
import { useTranslation } from "react-i18next"
import ThemedDialog from "../../../../shared/ThemedDialog"
import DialogFooter from "../../../../shared/DialogFooter"
import ValidatedTextInput from "../../../../shared/ValidatedTextInput"
import Button from "../../../../shared/Button"

export interface EducationExternalLinksDialogProps {
  open: () => boolean
  onClose: () => void
  links: string[]
  onSave: (value: string[]) => void
}

export default function EducationExternalLinksDialog({
  open,
  onClose,
  links,
  onSave,
}: EducationExternalLinksDialogProps): JSX.Element {
  const { t } = useTranslation()
  const [currentLinks, setCurrentLinks] = useState<string[]>(links)
  const [newLink, setNewLink] = useState("")
  const [newLinkValid, setNewLinkValid] = useState<boolean>(true)

  useEffect(() => {
    setCurrentLinks(links)
  }, [links])

  function addLink() {
    const trimmed = newLink.trim()
    if (!trimmed) return
    if (!isUrl(trimmed)) {
      setNewLinkValid(false)
      return
    }
    if (currentLinks.includes(trimmed)) {
      setNewLink("")
      return
    }
    setCurrentLinks((prev) => [...prev, trimmed])
    setNewLink("")
    setNewLinkValid(true)
  }

  function removeLink(index: number) {
    setCurrentLinks((prev) => prev.filter((_, idx) => idx !== index))
  }

  function handleSave() {
    onSave(currentLinks)
    onClose()
  }

  return (
    <ThemedDialog
      open={open}
      onClose={onClose}
      title={t("educationForm.links.dialogTitle")}
      footer={<DialogFooter onConfirm={handleSave} isValid={() => true} />}
    >
      <div className="flex flex-col gap-4">
        <div className="rounded-md border border-dashed border-[var(--border)] p-3 text-sm text-[var(--foreground-muted)]">
          {t("educationForm.links.helper")}
        </div>
        <div className="flex items-start gap-3">
          <ValidatedTextInput
            placeholder={t("educationForm.links.placeholder")}
            getInputValue={() => newLink}
            setInputValue={setNewLink}
            isPassword={false}
            min={5}
            max={200}
            validationMessage={t("educationForm.links.invalid")}
            isValid={() => newLinkValid || newLink.length === 0}
            setValid={(isValid) => setNewLinkValid(isValid)}
            isCustomValidationPassing={() =>
              newLink.trim().length === 0 || isUrl(newLink)
            }
            inputWidth={72}
          />
          <Button
            text={t("educationForm.links.add")}
            onClick={addLink}
            disabled={() =>
              newLink.trim().length === 0 || !isUrl(newLink.trim())
            }
          />
        </div>
        <ul className="flex flex-col gap-2 text-sm text-[var(--foreground)]">
          {currentLinks.length === 0 && (
            <li className="text-[var(--foreground-muted)]">
              {t("educationForm.links.empty")}
            </li>
          )}
          {currentLinks.map((link, index) => (
            <li
              key={`${link}-${index}`}
              className="flex items-center justify-between gap-2 rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-2"
            >
              <span className="truncate text-sm">{link}</span>
              <button
                type="button"
                className="text-xs text-red-500 hover:text-red-700"
                onClick={() => removeLink(index)}
              >
                {t("educationForm.links.remove")}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </ThemedDialog>
  )
}

function isUrl(value: string): boolean {
  try {
    new URL(value)
    return true
  } catch {
    return false
  }
}
