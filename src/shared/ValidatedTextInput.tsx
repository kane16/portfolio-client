import { useEffect } from "react"
import TextInput from "./TextInput"
import { TextInputType } from "./TextInputType"
import TextAreaInput from "./TextAreaInput"

export default function ValidatedTextInput({
  setInputValue,
  getInputValue,
  placeholder,
  inputWidth,
  isPassword,
  minLength,
  maxLength,
  validationMessage = "Input is invalid",
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
  useEffect(() => {
    const currentValue = getInputValue()
    if (minLength && currentValue.length < minLength) {
      setValid(false)
    } else if (maxLength && currentValue.length > maxLength) {
      setValid(false)
    } else {
      setValid(true)
    }
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
          placeholder={placeholder}
          inputWidth={inputWidth}
        />
      )}
      <div className={`mt-2 flex justify-evenly text-sm`}>
        <div
          className={`text-red-500 transition duration-300 ${!isValid() ? "opacity-60" : "opacity-0"}`}
        >
          {validationMessage}
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
