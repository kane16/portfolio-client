import { useMemo, useState, useRef, useEffect, type JSX } from "react"
import ValidatedTextInput from "../../../../shared/ValidatedTextInput"
import { useTranslation } from "react-i18next"
import type { ContactInfo } from "../../../../api"
import type { ResumeShortcut } from "../../../../api/portfolio"
import { useAuth } from "../../../login/use-auth"
import type { ImageOption } from "../../../../shared/model/image-option"
import { TextInputType } from "../../../../shared/TextInputType"
import ImageInput from "../../../../shared/ImageInput"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faAddressCard,
  faArrowRight,
  faSave,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons"
import { CircleLoader } from "react-spinners"
import Button from "../../../../shared/Button"
import type { UseMutationResult } from "@tanstack/react-query"
import { useConstraint } from "../../../../app/constraint-state-hook"
import ContactInfoDialog from "./ContactInfoDialog"
import { isContactInfoValid, sanitizeContactInfo } from "./contact-info-utils"

export default function ShortcutForm({
  shortcut,
  images,
  saveShortcut,
}: {
  shortcut?: ResumeShortcut
  images: ImageOption[]
  saveShortcut: UseMutationResult<
    boolean,
    Error,
    {
      token: string
      portfolio: ResumeShortcut
    },
    unknown
  >
}): JSX.Element {
  const { t } = useTranslation()
  const { user, token } = useAuth()
  const { findConstraint } = useConstraint()
  const defaultContact: ContactInfo = {
    email: shortcut?.contact?.email ?? user?.email ?? "",
    phone: shortcut?.contact?.phone ?? "",
    location: shortcut?.contact?.location ?? "",
    linkedin: shortcut?.contact?.linkedin ?? "",
    github: shortcut?.contact?.github ?? "",
    timezone: shortcut?.contact?.timezone ?? "",
  }

  const shortcutImage: ImageOption | undefined = useMemo(() => {
    if (shortcut?.image) {
      return {
        name: shortcut.image.name,
        src: shortcut.image.src,
        description: "",
      }
    }
    return undefined
  }, [shortcut])

  const [name, setName] = useState(shortcut?.fullname || "")

  const [nameValid, setNameValid] = useState(true)
  const [title, setTitle] = useState(
    shortcut?.title ||
      (user?.firstname && user?.lastname
        ? `${user.firstname} ${user.lastname}`
        : "") ||
      "",
  )
  const [titleValid, setTitleValid] = useState(true)
  const [description, setDescription] = useState(shortcut?.summary || "")
  const [descriptionValid, setDescriptionValid] = useState(true)
  const [image, setImage] = useState<ImageOption | undefined>(shortcutImage)
  const [contactInfo, setContactInfo] = useState<ContactInfo>(defaultContact)
  const [contactDialogOpen, setContactDialogOpen] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement | null>(null)
  const [showScrollIndicator, setShowScrollIndicator] = useState(false)

  useEffect(() => {
    const element = scrollContainerRef.current
    if (!element) {
      return
    }

    const updateScrollIndicator = () => {
      const remainingScroll =
        element.scrollHeight - element.clientHeight - element.scrollTop
      setShowScrollIndicator(remainingScroll > 4)
    }

    updateScrollIndicator()

    element.addEventListener("scroll", updateScrollIndicator)
    window.addEventListener("resize", updateScrollIndicator)

    let resizeObserver: ResizeObserver | undefined
    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(updateScrollIndicator)
      resizeObserver.observe(element)
    }

    return () => {
      element.removeEventListener("scroll", updateScrollIndicator)
      window.removeEventListener("resize", updateScrollIndicator)
      resizeObserver?.disconnect()
    }
  }, [])

  const contactSummary = useMemo(() => {
    const sanitized = sanitizeContactInfo(contactInfo)
    const lines: string[] = []

    if (sanitized.email) {
      lines.push(
        `${t("shortcutForm.contact.labels.email")}: ${sanitized.email}`,
      )
    }
    if (sanitized.phone) {
      lines.push(
        `${t("shortcutForm.contact.labels.phone")}: ${sanitized.phone}`,
      )
    }
    if (sanitized.location) {
      lines.push(
        `${t("shortcutForm.contact.labels.location")}: ${sanitized.location}`,
      )
    }
    if (sanitized.linkedin) {
      lines.push(
        `${t("shortcutForm.contact.labels.linkedin")}: ${sanitized.linkedin}`,
      )
    }
    if (sanitized.github) {
      lines.push(
        `${t("shortcutForm.contact.labels.github")}: ${sanitized.github}`,
      )
    }
    if (sanitized.timezone) {
      lines.push(
        `${t("shortcutForm.contact.labels.timezone")}: ${sanitized.timezone}`,
      )
    }

    if (lines.length === 0) {
      return {
        text: t("shortcutForm.contact.empty"),
        hasData: false,
      }
    }

    return {
      text: lines.join("\n"),
      hasData: true,
    }
  }, [contactInfo, t])

  const contactInfoValid = useMemo(
    () => isContactInfoValid(contactInfo),
    [contactInfo],
  )

  function isFormValid(): boolean {
    return (
      nameValid &&
      titleValid &&
      descriptionValid &&
      image !== undefined &&
      contactInfoValid
    )
  }

  function submit() {
    if (!image || !contactInfoValid) {
      return
    }

    saveShortcut.mutate({
      token: token!,
      portfolio: {
        fullname: name,
        title,
        summary: description,
        image: {
          name: image!.name,
          src: image!.src,
        },
        contact: sanitizeContactInfo(contactInfo),
      },
    })
  }

  return (
    <div className="m-4 flex h-[80vh] w-full max-w-4xl flex-col rounded-xl border border-[var(--border)] bg-[var(--background)] p-4 shadow-sm">
      <div className="relative h-full overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)]">
        <div
          ref={scrollContainerRef}
          className="scrollbar-track-[var(--background)] scrollbar-thumb-[var(--surface-hover)] dark:scrollbar-thumb-[var(--foreground-muted)] h-full overflow-y-auto p-4 scrollbar"
        >
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-center">
              <h1 className="text-3xl font-bold">
                {t("editInit.initiateResume")}
              </h1>
            </div>
            <div className="grid grid-cols-1 gap-4 pb-8 md:grid-cols-2">
              <div className="flex justify-center">
                <ValidatedTextInput
                  placeholder={t("editInit.enterUserFullName")}
                  value={name}
                  setInputValue={setName}
                  isPassword={false}
                  min={5}
                  max={50}
                  isValid={nameValid}
                  setValid={setNameValid}
                  inputType={TextInputType.INPUT}
                  inputWidth={80}
                  validationMessage={t("editInit.nameValidation")}
                />
              </div>
              <div className="flex justify-center">
                <ValidatedTextInput
                  placeholder={t("editInit.enterResumeTitle")}
                  value={title}
                  setInputValue={setTitle}
                  isPassword={false}
                  min={
                    findConstraint("resume.shortcut.title").constraints
                      .minLength!
                  }
                  max={
                    findConstraint("resume.shortcut.title").constraints
                      .maxLength!
                  }
                  isValid={titleValid}
                  setValid={setTitleValid}
                  inputType={TextInputType.INPUT}
                  inputWidth={80}
                  validationMessage={t("editInit.titleValidation")}
                />
              </div>
              <div className="flex items-start justify-center">
                <ValidatedTextInput
                  placeholder={t("editInit.enterResumeDescription")}
                  value={description}
                  setInputValue={setDescription}
                  isPassword={false}
                  min={
                    findConstraint("resume.shortcut.summary").constraints
                      .minLength!
                  }
                  max={
                    findConstraint("resume.shortcut.summary").constraints
                      .maxLength!
                  }
                  isValid={descriptionValid}
                  setValid={setDescriptionValid}
                  inputType={TextInputType.TEXTAREA}
                  inputWidth={80}
                  validationMessage={t("editInit.descriptionValidation")}
                />
              </div>
              <div className="flex items-start justify-center">
                <ImageInput
                  getInputValue={() => image}
                  setInputValue={setImage}
                  images={images || []}
                  overrideStyles="w-80 h-48"
                />
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <ContactSummaryCard
                title={t("shortcutForm.contact.title")}
                summary={contactSummary.text}
                actionLabel={
                  contactSummary.hasData
                    ? t("shortcutForm.contact.editAction")
                    : t("shortcutForm.contact.addAction")
                }
                tooltipTitle={t("shortcutForm.contact.tooltipTitle")}
                onClick={() => setContactDialogOpen(true)}
                hasData={contactSummary.hasData}
                invalid={!contactInfoValid}
              />
              {!contactInfoValid && (
                <p className="text-sm text-red-500">
                  {t("shortcutForm.contact.validationSummary")}
                </p>
              )}
            </div>
            <div className="flex justify-center pb-4 pt-2">
              {saveShortcut.isPending ? (
                <CircleLoader size={40} color="white" />
              ) : (
                <Button
                  onClick={submit}
                  text={t("editInit.saveChanges")}
                  disabled={() => !isFormValid()}
                  overrideStyles="h-12"
                  icon={<FontAwesomeIcon icon={faSave} />}
                />
              )}
            </div>
          </div>
        </div>
        {showScrollIndicator && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center bg-gradient-to-t from-[var(--surface)] via-[var(--surface)] to-transparent pb-3 pt-8">
            <FontAwesomeIcon
              icon={faChevronDown}
              className="animate-bounce text-2xl text-[var(--foreground-muted)]"
            />
          </div>
        )}
      </div>
      {contactDialogOpen && (
        <ContactInfoDialog
          open={() => contactDialogOpen}
          onClose={() => setContactDialogOpen(false)}
          contact={contactInfo}
          onSave={setContactInfo}
        />
      )}
    </div>
  )
}

interface ContactSummaryCardProps {
  title: string
  summary: string
  actionLabel: string
  tooltipTitle: string
  onClick: () => void
  hasData: boolean
  invalid: boolean
}

function ContactSummaryCard({
  title,
  summary,
  actionLabel,
  tooltipTitle,
  onClick,
  hasData,
  invalid,
}: ContactSummaryCardProps): JSX.Element {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative flex w-full max-w-xl flex-col justify-between gap-3 rounded-lg border ${invalid ? "border-red-400" : "border-[var(--border)]"} bg-[var(--surface)] p-4 text-left transition duration-200 hover:border-indigo-400 hover:shadow-lg`}
    >
      <div className="flex items-center gap-3 text-lg font-semibold text-[var(--foreground)]">
        <FontAwesomeIcon
          icon={faAddressCard}
          className="text-xl text-indigo-500"
        />
        <span>{title}</span>
      </div>
      <p className="flex-1 whitespace-pre-wrap text-sm text-[var(--foreground-muted)]">
        {summary}
      </p>
      <div className="flex items-center gap-2 text-sm font-medium text-indigo-500">
        <span>{actionLabel}</span>
        <FontAwesomeIcon icon={faArrowRight} />
      </div>
      {hasData && (
        <div className="pointer-events-none absolute left-1/2 top-0 z-10 hidden w-72 -translate-x-1/2 -translate-y-full rounded-md border border-[var(--border)] bg-[var(--surface-hover)] p-3 text-xs text-[var(--foreground)] shadow-lg group-hover:block">
          <div className="mb-1 font-semibold">{tooltipTitle}</div>
          <pre className="whitespace-pre-wrap text-left text-[var(--foreground-muted)]">
            {summary}
          </pre>
        </div>
      )}
    </button>
  )
}
