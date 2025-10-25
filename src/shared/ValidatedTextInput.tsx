import { useEffect } from "react"
import TextInput, { DataInputType } from "./TextInput"
import { TextInputType } from "./TextInputType"
import TextAreaInput from "./TextAreaInput"
import { useTranslation } from "react-i18next"

export default function ValidatedTextInput({
  setInputValue,
  getInputValue,
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
  getInputValue: () => string
  placeholder: string
  inputWidth?: number
  isPassword: boolean
  min: number
  max?: number
  validationMessage?: string
  inputType?: TextInputType
  isCustomValidationPassing?: () => boolean
  isValid: () => boolean
  setValid: (isValid: boolean) => void
}) {
  const { t } = useTranslation()
  const message = validationMessage || t("validatedInput.inputInvalid")
  useEffect(() => {
    const currentValue = getInputValue()
    if (inputType === TextInputType.NUMBER) {
      const numberValue = Number(currentValue)
      if (isNaN(numberValue)) {
        setValid(false)
      } else {
        if (min !== undefined && numberValue < min) {
          setValid(false)
        } else if (max !== undefined && numberValue > max) {
          setValid(false)
        } else {
          setValid(
            isCustomValidationPassing ? isCustomValidationPassing() : true,
          )
        }
      }
    } else {
       if (min && currentValue.length < min) {
         setValid(false)
       } else if (max && currentValue.length > max) {
         setValid(false)
       } else {
         setValid(
           isCustomValidationPassing ? isCustomValidationPassing() : true,
         )
       }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getInputValue])

  return (
    <div className={`w-${inputWidth || 48}`}>
      {inputType === TextInputType.INPUT ||
      inputType === TextInputType.NUMBER ? (
        <TextInput
          getInputValue={getInputValue}
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
          getInputValue={getInputValue}
          setInputValue={setInputValue}
          inputWidth={inputWidth}
          placeholder={placeholder}
        />
      )}
      {inputType !== TextInputType.NUMBER && (
        <div className={`mt-2 flex justify-evenly gap-2 text-sm`}>
          <div
            className={`text-red-500 transition duration-300 ${!isValid() ? "opacity-60" : "opacity-0"}`}
          >
            {message}
          </div>
          <div
            className={`${isValid() ? "text-gray-400" : "text-red-500"} text-sm`}
          >
            {getInputValue().length}/{max}
          </div>
        </div>
      )}
      {inputType === TextInputType.NUMBER && (
        <div className={`mt-2 flex justify-end text-sm`}>
          <div
            className={`flex w-full justify-center gap-2 ${isValid() ? "text-gray-400" : "text-red-500"} text-sm`}
          >
            <div>{min}</div>
            <div>{"<"}</div>
            <div>{getInputValue()}</div>
            <div>{"<"}</div>
            <div>{max}</div>
          </div>
        </div>
      )}
    </div>
  )
}
