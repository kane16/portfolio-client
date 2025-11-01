import { useEffect } from "react"
import TextInput from "./TextInput"
import { TextInputType } from "./TextInputType"
import TextAreaInput from "./TextAreaInput"
import { useTranslation } from "react-i18next"
import { DataInputType } from "./DataInputType"

export default function ValidatedTextInput({
  setInputValue,
  value,
  placeholder,
  inputWidth,
  isPassword,
  min,
  max,
  validationMessage,
  inputType = TextInputType.INPUT,
  isCustomValidationPassing,
  isValid,
  setValid,
}: {
  setInputValue: (value: string) => void
  value: string
  placeholder: string
  inputWidth?: number
  isPassword: boolean
  min: number
  max?: number
  validationMessage?: string
  inputType?: TextInputType
  isCustomValidationPassing?: () => boolean
  isValid: boolean
  setValid: (isValid: boolean) => void
}) {
  const { t } = useTranslation()
  const message = validationMessage || t("validatedInput.inputInvalid")
  useEffect(() => {
    let nextValid = true

    if (inputType === TextInputType.NUMBER) {
      const numberValue = Number(value)
      if (Number.isNaN(numberValue)) {
        nextValid = false
      } else if (min !== undefined && numberValue < min) {
        nextValid = false
      } else if (max !== undefined && numberValue > max) {
        nextValid = false
      } else {
        nextValid = isCustomValidationPassing
          ? isCustomValidationPassing()
          : true
      }
    } else {
      if (min !== undefined && value.length < min) {
        nextValid = false
      } else if (max !== undefined && value.length > max) {
        nextValid = false
      } else {
        nextValid = isCustomValidationPassing
          ? isCustomValidationPassing()
          : true
      }
    }

    if (nextValid !== isValid) {
      setValid(nextValid)
    }
  }, [value, inputType, min, max, isCustomValidationPassing, isValid, setValid])

  return (
    <div className={`w-${inputWidth || 48}`}>
      {inputType === TextInputType.INPUT ||
      inputType === TextInputType.NUMBER ? (
        <TextInput
          value={value}
          setInputValue={setInputValue}
          placeholder={placeholder}
          inputWidth={inputWidth}
          isPassword={isPassword}
          type={
            inputType === TextInputType.NUMBER
              ? DataInputType.NUMBER
              : DataInputType.TEXT
          }
        />
      ) : (
        <TextAreaInput
          value={value}
          setInputValue={setInputValue}
          inputWidth={inputWidth}
          placeholder={placeholder}
        />
      )}
      {inputType !== TextInputType.NUMBER && (
        <div className={`mt-2 flex justify-evenly gap-2 text-sm`}>
          <div
            className={`text-red-500 transition duration-300 ${!isValid ? "opacity-60" : "opacity-0"}`}
          >
            {message}
          </div>
          <div
            className={`${isValid ? "text-gray-400" : "text-red-500"} text-sm`}
          >
            {value.length}/{max}
          </div>
        </div>
      )}
      {inputType === TextInputType.NUMBER && (
        <div className={`mt-2 flex justify-end text-sm`}>
          <div
            className={`flex w-full justify-center gap-2 ${isValid ? "text-gray-400" : "text-red-500"} text-sm`}
          >
            <div>{min}</div>
            <div>{"<"}</div>
            <div>{value}</div>
            <div>{"<"}</div>
            <div>{max}</div>
          </div>
        </div>
      )}
    </div>
  )
}
