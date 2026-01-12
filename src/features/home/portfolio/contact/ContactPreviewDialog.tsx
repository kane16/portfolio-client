import type { JSX } from "react"
import { useMemo } from "react"
import { useTranslation } from "react-i18next"
import type { ContactInfo } from "../../../../api/model"
import ThemedDialog from "../../../../shared/ThemedDialog"

type ContactPreviewDialogProps = {
  isOpen: boolean
  onClose: () => void
  contact?: ContactInfo | null
}

type ContactEntryType = "email" | "phone" | "url" | "text"

type ContactEntry = {
  id: keyof ContactInfo
  label: string
  value: string
  type: ContactEntryType
}

function sanitize(value?: string | null): string {
  if (!value) return ""
  return value.trim()
}

function resolveHref(entry: ContactEntry): string | undefined {
  if (!entry.value) return undefined
  if (entry.type === "email") {
    return `mailto:${entry.value}`
  }
  if (entry.type === "phone") {
    return `tel:${entry.value}`
  }
  if (entry.type === "url") {
    return entry.value
  }
  return undefined
}

export default function ContactPreviewDialog({
  isOpen,
  onClose,
  contact,
}: ContactPreviewDialogProps): JSX.Element {
  const { t } = useTranslation()
  const dialogTitle = t("portfolio.resumeCard.contactDialog.title")
  const closeLabel = t("common.close")
  const emptyLabel = t("portfolio.resumeCard.contactDialog.empty")

  const entries = useMemo(() => {
    if (!contact) return []
    const labels = {
      email: t("portfolio.resumeCard.contactDialog.email"),
      phone: t("portfolio.resumeCard.contactDialog.phone"),
      location: t("portfolio.resumeCard.contactDialog.location"),
      linkedin: t("portfolio.resumeCard.contactDialog.linkedin"),
      github: t("portfolio.resumeCard.contactDialog.github"),
      timezone: t("portfolio.resumeCard.contactDialog.timezone"),
    }

    const rawEntries: Array<ContactEntry> = [
      {
        id: "email",
        label: labels.email,
        value: sanitize(contact.email),
        type: "email",
      },
      {
        id: "phone",
        label: labels.phone,
        value: sanitize(contact.phone),
        type: "phone",
      },
      {
        id: "location",
        label: labels.location,
        value: sanitize(contact.location),
        type: "text",
      },
      {
        id: "linkedin",
        label: labels.linkedin,
        value: sanitize(contact.linkedin),
        type: "url",
      },
      {
        id: "github",
        label: labels.github,
        value: sanitize(contact.github),
        type: "url",
      },
      {
        id: "timezone",
        label: labels.timezone,
        value: sanitize(contact.timezone),
        type: "text",
      },
    ]

    return rawEntries.filter((entry) => entry.value.length > 0)
  }, [contact, t])

  return (
    <ThemedDialog
      open={() => isOpen}
      onClose={onClose}
      title={dialogTitle}
      footer={
        <div className="flex justify-end">
          <button
            type="button"
            className="rounded-md border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm text-[var(--foreground)] transition hover:bg-[var(--surface-hover)] focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
            onClick={onClose}
          >
            {closeLabel}
          </button>
        </div>
      }
    >
      {entries.length === 0 ? (
        <p className="text-sm text-[var(--foreground-muted)]">{emptyLabel}</p>
      ) : (
        <ul className="flex flex-col gap-3">
          {entries.map((entry) => {
            const href = resolveHref(entry)

            return (
              <li
                key={entry.id}
                className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-3 shadow-sm md:p-4"
              >
                <div className="flex flex-col gap-1">
                  <span className="text-xs uppercase tracking-wide text-[var(--foreground-muted)]">
                    {entry.label}
                  </span>
                  {href ? (
                    <a
                      href={href}
                      target={entry.type === "url" ? "_blank" : undefined}
                      rel={entry.type === "url" ? "noreferrer" : undefined}
                      className="break-words text-sm text-indigo-500 transition hover:text-indigo-400"
                    >
                      {entry.value}
                    </a>
                  ) : (
                    <span className="break-words text-sm text-[var(--foreground)]">
                      {entry.value}
                    </span>
                  )}
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </ThemedDialog>
  )
}
