import { useMemo, useState, type JSX } from "react"
import { useTranslation } from "react-i18next"
import {
  EducationType,
  EducationTypeContainer,
  type Education,
  type Institution,
  type Timespan,
} from "../../../../api/model"
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
import { capitalize } from "../../../../app/utils"
import { $enum } from "ts-enum-util"
import Dropdown from "../../../../shared/Dropdown"
import EducationInstitutionDialog from "./EducationInstitutionDialog"
import EducationTimeframeDialog from "./EducationTimeframeDialog"
import EducationExternalLinksDialog from "./EducationExternalLinksDialog"
import { useAddEducation, useEditEducation } from "../../../../api/queries"
import { useParams } from "react-router-dom"
import { useAuth } from "../../../login/use-auth"

type EducationSummaryCardProps = {
  icon: JSX.Element
  title: string
  description: string
  actionLabel: string
  onClick: () => void
}

export interface EducationFormProps {
  setFormInProgress: (inProgress: boolean) => void
  education?: Education
}

export default function EducationForm({
  setFormInProgress,
  education,
}: EducationFormProps): JSX.Element {
  const { t } = useTranslation()
  const { id } = useParams<{ id: string }>()
  const resumeId = Number.parseInt(id ?? "0")
  const { authData } = useAuth()
  const addEducation = useAddEducation(t, resumeId, authData?.user!.jwtDesc)
  const editEducation = useEditEducation(t, resumeId, authData?.user!.jwtDesc)
  const [title, setTitle] = useState(education?.title ?? "")
  const [titleValid, setTitleValid] = useState<boolean>(!!education?.title)
  const [educationType, setEducationType] = useState<EducationType | undefined>(
    education?.type,
  )
  const educationTypes: EducationTypeContainer[] = $enum(EducationType)
    .getValues()
    .map(
      (type) => new EducationTypeContainer(capitalize(type.toString()), type),
    )
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

  async function handleSubmit() {
    if (!isFormValid()) {
      return
    }
    if (education) {
      const editResult = await editEducation.mutateAsync({
        education: {
          ...education,
          type: educationType!,
          fieldOfStudy: field,
          grade: Number.parseFloat(grade),
          description,
          institution,
          timeframe,
          externalLinks,
        },
      })
      if (editResult) {
        setFormInProgress(false)
      }
    } else {
      const addResult = await addEducation.mutateAsync({
        education: {
          title,
          type: educationType!,
          fieldOfStudy: field,
          grade: Number.parseFloat(grade),
          description,
          institution,
          timeframe,
          externalLinks,
        },
      })
      if (addResult) {
        setFormInProgress(false)
      }
    }
  }

  function handleCancel() {
    setFormInProgress(false)
  }

  function onEducationTypeSelected(value?: EducationTypeContainer) {
    setEducationType(value ? value.educationType : undefined)
    setEducationTypeValid(!!value)
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
      <div className="flex flex-1 flex-col gap-6 overflow-y-auto pb-2 pt-4">
        <div className="flex justify-evenly">
          <ValidatedTextInput
            placeholder={t("educationForm.degreePlaceholder")}
            getInputValue={() => title}
            setInputValue={setTitle}
            isPassword={false}
            min={3}
            max={60}
            validationMessage={t("educationForm.titleValidation")}
            isValid={() => titleValid}
            setValid={setTitleValid}
            inputWidth={64}
          />
          <Dropdown
            name={t("educationForm.educationType.label")}
            options={educationTypes}
            disabled={false}
            onSelected={onEducationTypeSelected}
            currentValue={
              educationType
                ? new EducationTypeContainer(
                    capitalize(educationType.toString()),
                    educationType,
                  )
                : undefined
            }
            overrideStyles="w-64 h-12"
          />
        </div>
        <div className="flex justify-evenly">
          <ValidatedTextInput
            placeholder={t("educationForm.fieldPlaceholder")}
            getInputValue={() => field}
            setInputValue={setField}
            isPassword={false}
            min={3}
            max={60}
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
            min={1}
            max={5}
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
            inputType={TextInputType.NUMBER}
          />
        </div>
        <div className="flex justify-center">
          <ValidatedTextInput
            placeholder={t("educationForm.descriptionPlaceholder")}
            getInputValue={() => description}
            setInputValue={setDescription}
            isPassword={false}
            min={20}
            max={400}
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
            actionLabel={
              formattedInstitution === t("educationForm.institution.empty")
                ? t("educationForm.institution.addAction")
                : t("educationForm.institution.editAction")
            }
            onClick={() => setInstitutionDialogOpen(true)}
          />
          <EducationSummaryCard
            icon={<FontAwesomeIcon icon={faClock} />}
            title={t("educationForm.timeframe.title")}
            description={formattedTimeframe}
            actionLabel={
              formattedTimeframe === t("educationForm.timeframe.empty")
                ? t("educationForm.timeframe.addAction")
                : t("educationForm.timeframe.editAction")
            }
            onClick={() => setTimeframeDialogOpen(true)}
          />
          <EducationSummaryCard
            icon={<FontAwesomeIcon icon={faLink} />}
            title={t("educationForm.links.title")}
            description={formattedLinks}
            actionLabel={
              formattedLinks === t("educationForm.links.empty")
                ? t("educationForm.links.addAction")
                : t("educationForm.links.editAction")
            }
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

      {institutionDialogOpen && (
        <EducationInstitutionDialog
          open={() => institutionDialogOpen}
          onClose={() => setInstitutionDialogOpen(false)}
          institution={institution}
          onSave={setInstitution}
        />
      )}
      {timeframeDialogOpen && (
        <EducationTimeframeDialog
          open={() => timeframeDialogOpen}
          onClose={() => setTimeframeDialogOpen(false)}
          timeframe={timeframe}
          onSave={setTimeframe}
        />
      )}
      {linksDialogOpen && (
        <EducationExternalLinksDialog
          open={() => linksDialogOpen}
          onClose={() => setLinksDialogOpen(false)}
          links={externalLinks}
          onSave={setExternalLinks}
        />
      )}
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
