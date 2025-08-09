declare module "i18next" {
  const i18next: unknown
  export default i18next
}

declare module "react-i18next" {
  export const initReactI18next: unknown
  export function useTranslation(): { t: (key: string) => string }
}
