import { useEffect, useState, type JSX } from "react"
import { useTranslation } from "react-i18next"
import { type Institution } from "../../../../api/model"
import ThemedDialog from "../../../../shared/ThemedDialog"
import DialogFooter from "../../../../shared/DialogFooter"
import ValidatedTextInput from "../../../../shared/ValidatedTextInput"

export interface EducationInstitutionDialogProps {
  open: () => boolean
  onClose: () => void
  institution: Institution
  onSave: (value: Institution) => void
}

export default function EducationInstitutionDialog({
  open,
  onClose,
  institution,
  onSave,
}: EducationInstitutionDialogProps): JSX.Element {
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
      <div className="flex w-full flex-col items-center gap-4">
        <ValidatedTextInput
          placeholder={t("educationForm.institution.namePlaceholder")}
          value={name}
          setInputValue={setName}
          isPassword={false}
          min={3}
          max={60}
          validationMessage={t("educationForm.institution.nameValidation")}
          isValid={nameValid}
          setValid={setNameValid}
          inputWidth={80}
        />
        <ValidatedTextInput
          placeholder={t("educationForm.institution.cityPlaceholder")}
          value={city}
          setInputValue={setCity}
          isPassword={false}
          min={2}
          max={40}
          validationMessage={t("educationForm.institution.cityValidation")}
          isValid={cityValid}
          setValid={setCityValid}
          inputWidth={80}
        />
        <ValidatedTextInput
          placeholder={t("educationForm.institution.countryPlaceholder")}
          value={country}
          setInputValue={setCountry}
          isPassword={false}
          min={2}
          max={40}
          validationMessage={t("educationForm.institution.countryValidation")}
          isValid={countryValid}
          setValid={setCountryValid}
          inputWidth={80}
        />
      </div>
    </ThemedDialog>
  )
}
