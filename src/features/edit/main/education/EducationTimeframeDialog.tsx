import { useEffect, useMemo, useState, type JSX } from "react"
import { useTranslation } from "react-i18next"
import { type Timespan } from "../../../../api"
import { compareDates } from "../../../../app/utils"
import ThemedDialog from "../../../../shared/ThemedDialog"
import DialogFooter from "../../../../shared/DialogFooter"
import CalendarInput from "../../../../shared/CalendarInput"
import Checkbox from "../../../../shared/Checkbox"

export interface EducationTimeframeDialogProps {
  open: () => boolean
  onClose: () => void
  timeframe: Timespan
  onSave: (value: Timespan) => void
}

export default function EducationTimeframeDialog({
  open,
  onClose,
  timeframe,
  onSave,
}: EducationTimeframeDialogProps): JSX.Element {
  const { t } = useTranslation()
  const [fromDate, setFromDate] = useState<Date>(
    timeframe.start ? new Date(timeframe.start) : new Date(),
  )
  const [toDate, setToDate] = useState<Date | undefined>(
    timeframe.end ? new Date(timeframe.end) : undefined,
  )
  const [isCurrent, setCurrent] = useState<boolean>(!timeframe.end)

  useEffect(() => {
    setFromDate(timeframe.start ? new Date(timeframe.start) : new Date())
    setToDate(timeframe.end ? new Date(timeframe.end) : undefined)
    setCurrent(!timeframe.end)
  }, [timeframe])

  const isValid = useMemo(() => {
    const today = new Date()
    const fromValid = compareDates(fromDate, today) <= 0
    if (isCurrent) {
      return fromValid
    }
    if (!toDate) return false
    const toValid = compareDates(toDate, today) <= 0
    const orderValid = compareDates(fromDate, toDate) <= 0
    return fromValid && toValid && orderValid
  }, [fromDate, toDate, isCurrent])

  function handleSave() {
    if (!isValid) return
    onSave({
      start: fromDate.toISOString().split("T")[0]!,
      end: isCurrent ? undefined : toDate?.toISOString().split("T")[0],
    })
    onClose()
  }

  return (
    <ThemedDialog
      open={open}
      onClose={onClose}
      title={t("educationForm.timeframe.dialogTitle")}
      footer={<DialogFooter onConfirm={handleSave} isValid={() => isValid} />}
    >
      <div className="flex flex-col gap-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-[var(--foreground)]">
            {t("educationForm.timeframe.startLabel")}
          </label>
          <CalendarInput
            date={fromDate}
            setDate={(value) => setFromDate(value)}
            fullWidth={true}
          />
        </div>
        <Checkbox
          checked={isCurrent}
          onChecked={setCurrent}
          label={t("educationForm.timeframe.presentLabel")}
        />
        {!isCurrent && (
          <div>
            <label className="mb-2 block text-sm font-medium text-[var(--foreground)]">
              {t("educationForm.timeframe.endLabel")}
            </label>
            <CalendarInput
              date={toDate}
              setDate={(value) => setToDate(value)}
              fullWidth={true}
            />
          </div>
        )}
      </div>
    </ThemedDialog>
  )
}
