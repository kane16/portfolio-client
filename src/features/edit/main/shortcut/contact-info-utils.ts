import type { ContactInfo } from "../../../../api/model"

export const contactEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
export const contactPhoneRegex = /^[0-9+()\-\s]*$/

export function isContactUrlValid(value: string): boolean {
  const candidate = value?.trim() ?? ""
  if (!candidate) {
    return true
  }

  try {
    new URL(candidate)
    return true
  } catch {
    return false
  }
}

export function isContactInfoValid(contact: ContactInfo): boolean {
  const email = contact.email?.trim() ?? ""
  const phone = contact.phone?.trim() ?? ""
  const location = contact.location?.trim() ?? ""
  const linkedin = contact.linkedin?.trim() ?? ""
  const github = contact.github?.trim() ?? ""
  const timezone = contact.timezone?.trim() ?? ""

  if (!email || !contactEmailRegex.test(email)) {
    return false
  }

  if (phone.length < 5 || !contactPhoneRegex.test(phone)) {
    return false
  }

  if (location.length < 2) {
    return false
  }

  if (!isContactUrlValid(linkedin)) {
    return false
  }

  if (!isContactUrlValid(github)) {
    return false
  }

  if (timezone.length < 2) {
    return false
  }

  return true
}

export function sanitizeContactInfo(contact: ContactInfo): ContactInfo {
  return {
    email: contact.email?.trim() ?? "",
    phone: contact.phone?.trim() ?? "",
    location: contact.location?.trim() ?? "",
    linkedin: contact.linkedin?.trim() ?? "",
    github: contact.github?.trim() ?? "",
    timezone: contact.timezone?.trim() ?? "",
  }
}
