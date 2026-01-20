import { useEffect, useState, type JSX } from "react"
import { useTranslation } from "react-i18next"
import type { ContactInfo } from "../../../../api"
import ThemedDialog from "../../../../shared/ThemedDialog"
import DialogFooter from "../../../../shared/DialogFooter"
import ValidatedTextInput from "../../../../shared/ValidatedTextInput"
import {
  contactEmailRegex,
  contactPhoneRegex,
  isContactInfoValid,
  isContactUrlValid,
  sanitizeContactInfo,
} from "./contact-info-utils"

export interface ContactInfoDialogProps {
  open: () => boolean
  onClose: () => void
  contact: ContactInfo
  onSave: (value: ContactInfo) => void
}

export default function ContactInfoDialog({
  open,
  onClose,
  contact,
  onSave,
}: ContactInfoDialogProps): JSX.Element {
  const { t } = useTranslation()
  const [email, setEmail] = useState<string>(contact.email ?? "")
  const [emailValid, setEmailValid] = useState<boolean>(
    !!contact.email && contactEmailRegex.test(contact.email),
  )
  const [phone, setPhone] = useState<string>(contact.phone ?? "")
  const [phoneValid, setPhoneValid] = useState<boolean>(
    (contact.phone ?? "").trim().length >= 5 &&
      contactPhoneRegex.test((contact.phone ?? "").trim()),
  )
  const [location, setLocation] = useState<string>(contact.location ?? "")
  const [locationValid, setLocationValid] = useState<boolean>(
    (contact.location ?? "").trim().length >= 2,
  )
  const [linkedin, setLinkedin] = useState<string>(contact.linkedin ?? "")
  const [linkedinValid, setLinkedinValid] = useState<boolean>(
    isContactUrlValid(contact.linkedin ?? ""),
  )
  const [github, setGithub] = useState<string>(contact.github ?? "")
  const [githubValid, setGithubValid] = useState<boolean>(
    isContactUrlValid(contact.github ?? ""),
  )
  const [timezone, setTimezone] = useState<string>(contact.timezone ?? "")
  const [timezoneValid, setTimezoneValid] = useState<boolean>(
    (contact.timezone ?? "").trim().length >= 2,
  )

  useEffect(() => {
    setEmail(contact.email ?? "")
    setEmailValid(!!contact.email && contactEmailRegex.test(contact.email))
    setPhone(contact.phone ?? "")
    setPhoneValid(
      (contact.phone ?? "").trim().length >= 5 &&
        contactPhoneRegex.test((contact.phone ?? "").trim()),
    )
    setLocation(contact.location ?? "")
    setLocationValid((contact.location ?? "").trim().length >= 2)
    setLinkedin(contact.linkedin ?? "")
    setLinkedinValid(isContactUrlValid(contact.linkedin ?? ""))
    setGithub(contact.github ?? "")
    setGithubValid(isContactUrlValid(contact.github ?? ""))
    setTimezone(contact.timezone ?? "")
    setTimezoneValid((contact.timezone ?? "").trim().length >= 2)
  }, [contact])

  const isValid =
    emailValid &&
    phoneValid &&
    locationValid &&
    linkedinValid &&
    githubValid &&
    timezoneValid

  function handleSave() {
    if (!isValid) return

    onSave(
      sanitizeContactInfo({
        email,
        phone,
        location,
        linkedin,
        github,
        timezone,
      }),
    )
    onClose()
  }

  return (
    <ThemedDialog
      open={open}
      onClose={onClose}
      title={t("shortcutForm.contact.dialogTitle")}
      footer={
        <DialogFooter
          onConfirm={handleSave}
          isValid={() =>
            isValid &&
            isContactInfoValid({
              email,
              phone,
              location,
              linkedin,
              github,
              timezone,
            })
          }
        />
      }
    >
      <div className="flex w-full flex-col items-center gap-4">
        <ValidatedTextInput
          placeholder={t("shortcutForm.contact.emailPlaceholder")}
          value={email}
          setInputValue={setEmail}
          isPassword={false}
          min={5}
          max={120}
          validationMessage={t("shortcutForm.contact.emailValidation")}
          isCustomValidationPassing={() => contactEmailRegex.test(email)}
          isValid={emailValid}
          setValid={setEmailValid}
          inputWidth={80}
        />
        <ValidatedTextInput
          placeholder={t("shortcutForm.contact.phonePlaceholder")}
          value={phone}
          setInputValue={setPhone}
          isPassword={false}
          min={5}
          max={30}
          validationMessage={t("shortcutForm.contact.phoneValidation")}
          isCustomValidationPassing={() => contactPhoneRegex.test(phone.trim())}
          isValid={phoneValid}
          setValid={setPhoneValid}
          inputWidth={80}
        />
        <ValidatedTextInput
          placeholder={t("shortcutForm.contact.locationPlaceholder")}
          value={location}
          setInputValue={setLocation}
          isPassword={false}
          min={2}
          max={120}
          validationMessage={t("shortcutForm.contact.locationValidation")}
          isValid={locationValid}
          setValid={setLocationValid}
          inputWidth={80}
        />
        <ValidatedTextInput
          placeholder={t("shortcutForm.contact.linkedinPlaceholder")}
          value={linkedin}
          setInputValue={setLinkedin}
          isPassword={false}
          min={0}
          max={200}
          validationMessage={t("shortcutForm.contact.linkedinValidation")}
          isCustomValidationPassing={() => isContactUrlValid(linkedin)}
          isValid={linkedinValid}
          setValid={setLinkedinValid}
          inputWidth={80}
        />
        <ValidatedTextInput
          placeholder={t("shortcutForm.contact.githubPlaceholder")}
          value={github}
          setInputValue={setGithub}
          isPassword={false}
          min={0}
          max={200}
          validationMessage={t("shortcutForm.contact.githubValidation")}
          isCustomValidationPassing={() => isContactUrlValid(github)}
          isValid={githubValid}
          setValid={setGithubValid}
          inputWidth={80}
        />
        <ValidatedTextInput
          placeholder={t("shortcutForm.contact.timezonePlaceholder")}
          value={timezone}
          setInputValue={setTimezone}
          isPassword={false}
          min={2}
          max={60}
          validationMessage={t("shortcutForm.contact.timezoneValidation")}
          isValid={timezoneValid}
          setValid={setTimezoneValid}
          inputWidth={80}
        />
      </div>
    </ThemedDialog>
  )
}
