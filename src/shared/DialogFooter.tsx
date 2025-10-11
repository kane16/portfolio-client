import type { JSX } from "react"
import Button from "./Button"
import { useTranslation } from "react-i18next"

interface DialogFooterProps {
  onConfirm: () => void
  isValid: () => boolean
}

export default function DialogFooter({
  onConfirm,
  isValid,
}: DialogFooterProps): JSX.Element {
  const { t } = useTranslation()

  return (
    <div className="flex justify-end gap-2">
      <Button
        text={t("common.save")}
        disabled={() => !isValid()}
        onClick={onConfirm}
      />
    </div>
  )
}
