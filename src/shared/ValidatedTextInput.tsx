import { useEffect } from "react"
import TextInput from "./TextInput"
import { TextInputType } from "./TextInputType"
import TextAreaInput from "./TextAreaInput"
import { useTranslation } from "react-i18next"

export default function ValidatedTextInput({
  setInputValue,
  getInputValue,
  placeholder,
  inputWidth,
  isPassword,
  minLength,
  maxLength,
  validationMessage,
  inputType = TextInputType.INPUT,
  isValid,
  setValid,
}: {
  setInputValue: (value: string) => void
  getInputValue: () => string
  placeholder: string
  inputWidth?: number
  isPassword: boolean
  minLength: number
  maxLength?: number
  validationMessage?: string
  inputType?: TextInputType
  isValid: () => boolean
  setValid: (isValid: boolean) => void
}) {
  const { t } = useTranslation()
  const message = validationMessage || t("validatedInput.inputInvalid")
  useEffect(() => {
    const currentValue = getInputValue()
    if (minLength && currentValue.length < minLength) {
      setValid(false)
    } else if (maxLength && currentValue.length > maxLength) {
      setValid(false)
    } else {
      setValid(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getInputValue])

  return (
    <div className={`w-${inputWidth || 48}`}>
      {inputType === TextInputType.INPUT ? (
        <TextInput
          getInputValue={getInputValue}
          setInputValue={setInputValue}
          placeholder={placeholder}
          inputWidth={inputWidth}
          isPassword={isPassword}
        />
      ) : (
        <TextAreaInput
          getInputValue={getInputValue}
          setInputValue={setInputValue}
          inputWidth={inputWidth}
          placeholder={placeholder}
        />
      )}
      <div className={`mt-2 flex justify-evenly text-sm`}>
        <div
          className={`text-red-500 transition duration-300 ${!isValid() ? "opacity-60" : "opacity-0"}`}
        >
          {message}
        </div>
        <div
          className={`${isValid() ? "text-gray-400" : "text-red-500"} text-sm`}
        >
          {getInputValue().length}/{maxLength}
        </div>
      </div>
    </div>
  )
}
