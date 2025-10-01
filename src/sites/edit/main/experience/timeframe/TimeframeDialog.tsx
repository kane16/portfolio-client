import { useEffect, useRef, useState } from "react"
import type { Timespan } from "../../../../../api/model"
import ThemedDialog, {
  type ThemedDialogHandle,
} from "../../../../../shared/ThemedDialog"
import DialogFooter from "../../../../../shared/DialogFooter"
import CalendarInput from "../../../../../shared/CalendarInput"
import { useTranslation } from "react-i18next"
import Checkbox from "../../../../../shared/Checkbox"
import { compareDates } from "../../../../../app/utils"

interface TimeframeDialogProps {
  dialogTitle: string
  initialTimeframe: Timespan,
  setTimeframe: (timeframe: Timespan) => void
  isOpened: () => boolean
  setOpened: (opened: boolean) => void
}

export default function TimeframeDialog({
  isOpened,
  setOpened,
  initialTimeframe,
  dialogTitle,
  setTimeframe,
}: TimeframeDialogProps) {
  const { t } = useTranslation()
  const dialogRef = useRef<ThemedDialogHandle>(null)
  const [isValidTimeframe, setValidTimeframe] = useState(false)
  const [fromDate, setFromDate] = useState<Date>(initialTimeframe.start)
  const [toDate, setToDate] = useState<Date | undefined>(initialTimeframe.end)
  const [isToPresent, setToPresent] = useState<boolean>(!initialTimeframe.end)

  function handleTimeframeOperationTriggered() {
    setTimeframe({ start: fromDate, end: isToPresent ? undefined : toDate })
    setOpened(false)
  }

  useEffect(() => {
    setValidTimeframe(isValid())
  }, [fromDate, toDate, isToPresent])

  function isValid(): boolean {
    const today = new Date()
    const fromDateCorrect = compareDates(fromDate, today) < 0
    const toDateCorrect =
      isToPresent || (toDate !== undefined && compareDates(toDate, today) <= 0)
    const datesCorrect =
      isToPresent ||
      (toDate !== undefined && compareDates(fromDate, toDate) <= 0)
    return fromDateCorrect && toDateCorrect && datesCorrect
  }

  return (
    <ThemedDialog
      ref={dialogRef}
      open={isOpened}
      onClose={() => setOpened(false)}
      title={dialogTitle}
      footer={
        <DialogFooter
          onConfirm={handleTimeframeOperationTriggered}
          isValid={() => isValidTimeframe}
        />
      }
    >
      <div className="flex min-h-72 flex-col items-center gap-6 pt-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            {t("resumeExperience.timeframe.startDate")}
          </label>
          <CalendarInput date={fromDate} setDate={setFromDate} />
        </div>
        <div>
          <Checkbox
            label={t("resumeExperience.timeframe.tillPresent")}
            checked={isToPresent}
            onChecked={setToPresent}
          />
        </div>
        {!isToPresent && (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {t("resumeExperience.timeframe.endDate")}
            </label>
            <CalendarInput date={toDate} setDate={setToDate} />
          </div>
        )}
      </div>
    </ThemedDialog>
  )
}
