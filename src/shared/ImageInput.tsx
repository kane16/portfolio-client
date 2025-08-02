import Dropdown from "./Dropdown"

export default function ImageInput({
  setInputValue,
  placeholder,
}: {
  setInputValue: (value: string) => void
  getInputValue: () => string
  placeholder: string
  inputWidth?: number
}) {
  return (
    <Dropdown
      disabled={false}
      name={placeholder}
      options={[
        { name: "Option 1", value: "option1" },
        { name: "Option 2", value: "option2" },
      ]}
      onSelected={(value) => setInputValue(value?.value || "")}
    />
  )
}
