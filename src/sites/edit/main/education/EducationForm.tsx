import { useEffect, useMemo, useState, type JSX } from "react"
import { useTranslation } from "react-i18next"
import type { Education, Institution, Timespan } from "../../../../api/model"
import ValidatedTextInput from "../../../../shared/ValidatedTextInput"
import Button from "../../../../shared/Button"
import { TextInputType } from "../../../../shared/TextInputType"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faArrowLeft,
  faArrowRight,
  faClock,
  faLink,
  faSave,
  faSchool,
} from "@fortawesome/free-solid-svg-icons"
import ThemedDialog from "../../../../shared/ThemedDialog"
import DialogFooter from "../../../../shared/DialogFooter"
import CalendarInput from "../../../../shared/CalendarInput"
import Checkbox from "../../../../shared/Checkbox"
import { compareDates } from "../../../../app/utils"

type EducationSummaryCardProps = {
  icon: JSX.Element
  title: string
  description: string
  actionLabel: string
  onClick: () => void
}

export interface EducationFormProps {
  setAdded: (added: boolean) => void
  education?: Education
}

export default function EducationForm({
  setAdded,
  education,
}: EducationFormProps): JSX.Element {
  const { t } = useTranslation()
  const [title, setTitle] = useState(education?.title ?? "")
  const [titleValid, setTitleValid] = useState<boolean>(!!education?.title)
  const [educationType, setEducationType] = useState(education?.type ?? "")
  const [educationTypeValid, setEducationTypeValid] = useState<boolean>(
    !!education?.type,
  )
  const [field, setField] = useState(education?.fieldOfStudy ?? "")
  const [fieldValid, setFieldValid] = useState<boolean>(
    !!education?.fieldOfStudy,
  )
  const [grade, setGrade] = useState(
    education?.grade !== undefined ? education.grade.toString() : "",
  )
  const [gradeValid, setGradeValid] = useState<boolean>(
    education?.grade !== undefined,
  )
  const [description, setDescription] = useState(education?.description ?? "")
  const [descriptionValid, setDescriptionValid] = useState<boolean>(
    !!education?.description,
  )
  const [institution, setInstitution] = useState<Institution>(
    education?.institution ?? {
      name: "",
      city: "",
      country: "",
    },
  )
  const [timeframe, setTimeframe] = useState<Timespan>(
    education?.timeframe ?? {
      start: "",
      end: undefined,
    },
  )
  const [externalLinks, setExternalLinks] = useState<string[]>(
    education?.externalLinks ?? [],
  )

  const [institutionDialogOpen, setInstitutionDialogOpen] = useState(false)
  const [timeframeDialogOpen, setTimeframeDialogOpen] = useState(false)
  const [linksDialogOpen, setLinksDialogOpen] = useState(false)

  const formattedInstitution = useMemo(() => {
    const details = [institution.name, institution.city, institution.country]
      .map((value) => value?.trim())
      .filter((value) => value && value.length > 0)
    return details.length > 0
      ? details.join(", ")
      : t("educationForm.institution.empty")
  }, [institution, t])

  const formattedTimeframe = useMemo(() => {
    if (!timeframe?.start) {
      return t("educationForm.timeframe.empty")
    }
    const startDate = timeframe.start
    const endDate = timeframe.end
    const label = endDate ? endDate : t("educationForm.timeframe.presentLabel")
    return `${startDate} — ${label}`
  }, [timeframe, t])

  const formattedLinks = useMemo(() => {
    if (!externalLinks.length) {
      return t("educationForm.links.empty")
    }
    return externalLinks.map((link) => `• ${link}`).join("\n")
  }, [externalLinks, t])

  function handleSubmit() {
    if (!isFormValid()) {
      return
    }
    setAdded(false)
  }

  function handleCancel() {
    setAdded(false)
  }

  function isFormValid(): boolean {
    const isInstitutionValid =
      institution.name.trim().length > 0 &&
      institution.city.trim().length > 0 &&
      institution.country.trim().length > 0
    const isTimeframeValid = timeframe.start.trim().length > 0
    return (
      titleValid &&
      educationTypeValid &&
      fieldValid &&
      descriptionValid &&
      gradeValid &&
      isInstitutionValid &&
      isTimeframeValid
    )
  }

  return (
    <div className="m-4 mx-auto flex h-[70vh] w-full max-w-4xl flex-col gap-6 overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--background)] p-6 shadow-sm">
      <div className="flex items-center justify-center">
        <h1 className="text-3xl font-semibold text-[var(--foreground)]">
          {t("educationForm.title")}
        </h1>
      </div>
      <div className="flex flex-1 flex-col gap-6 overflow-y-auto pb-2">
        <div className="flex justify-evenly">
          <ValidatedTextInput
            placeholder={t("educationForm.degreePlaceholder")}
            getInputValue={() => title}
            setInputValue={setTitle}
            isPassword={false}
            minLength={3}
            maxLength={60}
            validationMessage={t("educationForm.titleValidation")}
            isValid={() => titleValid}
            setValid={setTitleValid}
            inputWidth={64}
          />
          <ValidatedTextInput
            placeholder={t("educationForm.typePlaceholder")}
            getInputValue={() => educationType}
            setInputValue={setEducationType}
            isPassword={false}
            minLength={3}
            maxLength={30}
            validationMessage={t("educationForm.typeValidation")}
            isValid={() => educationTypeValid}
            setValid={setEducationTypeValid}
            inputWidth={64}
          />
        </div>
        <div className="flex justify-evenly">
          <ValidatedTextInput
            placeholder={t("educationForm.fieldPlaceholder")}
            getInputValue={() => field}
            setInputValue={setField}
            isPassword={false}
            minLength={3}
            maxLength={60}
            validationMessage={t("educationForm.fieldValidation")}
            isValid={() => fieldValid}
            setValid={setFieldValid}
            inputWidth={64}
          />
          <ValidatedTextInput
            placeholder={t("educationForm.gradePlaceholder")}
            getInputValue={() => grade}
            setInputValue={setGrade}
            isPassword={false}
            minLength={1}
            maxLength={5}
            validationMessage={t("educationForm.gradeValidation")}
            isValid={() => gradeValid}
            setValid={setGradeValid}
            isCustomValidationPassing={() => {
              const parsed = Number.parseFloat(grade)
              return (
                grade.trim().length > 0 &&
                !Number.isNaN(parsed) &&
                parsed >= 0 &&
                parsed <= 100
              )
            }}
            inputWidth={64}
          />
        </div>
        <div className="flex justify-center">
          <ValidatedTextInput
            placeholder={t("educationForm.descriptionPlaceholder")}
            getInputValue={() => description}
            setInputValue={setDescription}
            isPassword={false}
            minLength={20}
            maxLength={400}
            validationMessage={t("educationForm.descriptionValidation")}
            isValid={() => descriptionValid}
            setValid={setDescriptionValid}
            inputWidth={80}
            inputType={TextInputType.TEXTAREA}
          />
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <EducationSummaryCard
            icon={<FontAwesomeIcon icon={faSchool} />}
            title={t("educationForm.institution.title")}
            description={formattedInstitution}
            actionLabel={t("educationForm.institution.action")}
            onClick={() => setInstitutionDialogOpen(true)}
          />
          <EducationSummaryCard
            icon={<FontAwesomeIcon icon={faClock} />}
            title={t("educationForm.timeframe.title")}
            description={formattedTimeframe}
            actionLabel={t("educationForm.timeframe.action")}
            onClick={() => setTimeframeDialogOpen(true)}
          />
          <EducationSummaryCard
            icon={<FontAwesomeIcon icon={faLink} />}
            title={t("educationForm.links.title")}
            description={formattedLinks}
            actionLabel={t("educationForm.links.action")}
            onClick={() => setLinksDialogOpen(true)}
          />
        </div>
      </div>
      <div className="flex items-center justify-between gap-4">
        <Button
          onClick={handleCancel}
          text={t("educationForm.cancel")}
          icon={<FontAwesomeIcon icon={faArrowLeft} />}
        />
        <Button
          onClick={handleSubmit}
          text={t("educationForm.save")}
          icon={<FontAwesomeIcon icon={faSave} />}
          disabled={() => !isFormValid()}
          overrideStyles="px-4"
        />
      </div>

      <EducationInstitutionDialog
        open={() => institutionDialogOpen}
        onClose={() => setInstitutionDialogOpen(false)}
        institution={institution}
        onSave={setInstitution}
      />
      <EducationTimeframeDialog
        open={() => timeframeDialogOpen}
        onClose={() => setTimeframeDialogOpen(false)}
        timeframe={timeframe}
        onSave={setTimeframe}
      />
      <EducationExternalLinksDialog
        open={() => linksDialogOpen}
        onClose={() => setLinksDialogOpen(false)}
        links={externalLinks}
        onSave={setExternalLinks}
      />
    </div>
  )
}

function EducationSummaryCard({
  icon,
  title,
  description,
  actionLabel,
  onClick,
}: EducationSummaryCardProps): JSX.Element {
  return (
    <div
      className="flex h-full cursor-pointer flex-col justify-between gap-3 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4 transition duration-200 hover:border-indigo-400 hover:shadow-lg"
      onClick={onClick}
    >
      <div className="flex items-center gap-3 text-lg font-semibold text-[var(--foreground)]">
        <div className="text-xl text-indigo-500">{icon}</div>
        <span>{title}</span>
      </div>
      <p className="flex-1 whitespace-pre-wrap text-sm text-[var(--foreground-muted)]">
        {description}
      </p>
      <div className="flex items-center gap-2 text-sm font-medium text-indigo-500">
        <span>{actionLabel}</span>
        <FontAwesomeIcon icon={faArrowRight} />
      </div>
    </div>
  )
}

function EducationInstitutionDialog({
  open,
  onClose,
  institution,
  onSave,
}: {
  open: () => boolean
  onClose: () => void
  institution: Institution
  onSave: (value: Institution) => void
}): JSX.Element {
  const { t } = useTranslation()
  const [name, setName] = useState(institution.name)
  const [nameValid, setNameValid] = useState<boolean>(
    institution.name.trim().length >= 3,
  )
  const [city, setCity] = useState(institution.city)
  const [cityValid, setCityValid] = useState<boolean>(
    institution.city.trim().length >= 2,
  )
  const [country, setCountry] = useState(institution.country)
  const [countryValid, setCountryValid] = useState<boolean>(
    institution.country.trim().length >= 2,
  )

  useEffect(() => {
    setName(institution.name)
    setCity(institution.city)
    setCountry(institution.country)
    setNameValid(institution.name.trim().length >= 3)
    setCityValid(institution.city.trim().length >= 2)
    setCountryValid(institution.country.trim().length >= 2)
  }, [institution])

  const isValid = nameValid && cityValid && countryValid

  function handleSave() {
    if (!isValid) return
    onSave({ name, city, country })
    onClose()
  }

  return (
    <ThemedDialog
      open={open}
      onClose={onClose}
      title={t("educationForm.institution.dialogTitle")}
      footer={<DialogFooter onConfirm={handleSave} isValid={() => isValid} />}
    >
      <div className="flex flex-col gap-4">
        <ValidatedTextInput
          placeholder={t("educationForm.institution.namePlaceholder")}
          getInputValue={() => name}
          setInputValue={setName}
          isPassword={false}
          minLength={3}
          maxLength={60}
          validationMessage={t("educationForm.institution.nameValidation")}
          isValid={() => nameValid}
          setValid={setNameValid}
          inputWidth={80}
        />
        <ValidatedTextInput
          placeholder={t("educationForm.institution.cityPlaceholder")}
          getInputValue={() => city}
          setInputValue={setCity}
          isPassword={false}
          minLength={2}
          maxLength={40}
          validationMessage={t("educationForm.institution.cityValidation")}
          isValid={() => cityValid}
          setValid={setCityValid}
          inputWidth={80}
        />
        <ValidatedTextInput
          placeholder={t("educationForm.institution.countryPlaceholder")}
          getInputValue={() => country}
          setInputValue={setCountry}
          isPassword={false}
          minLength={2}
          maxLength={40}
          validationMessage={t("educationForm.institution.countryValidation")}
          isValid={() => countryValid}
          setValid={setCountryValid}
          inputWidth={80}
        />
      </div>
    </ThemedDialog>
  )
}

function EducationTimeframeDialog({
  open,
  onClose,
  timeframe,
  onSave,
}: {
  open: () => boolean
  onClose: () => void
  timeframe: Timespan
  onSave: (value: Timespan) => void
}): JSX.Element {
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

function EducationExternalLinksDialog({
  open,
  onClose,
  links,
  onSave,
}: {
  open: () => boolean
  onClose: () => void
  links: string[]
  onSave: (value: string[]) => void
}): JSX.Element {
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
            minLength={5}
            maxLength={200}
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
