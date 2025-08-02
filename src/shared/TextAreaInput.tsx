export default function TextAreaInput({
  setInputValue,
  getInputValue,
  placeholder,
  inputWidth,
}: {
  setInputValue: (value: string) => void
  getInputValue: () => string
  placeholder: string
  inputWidth?: number
}) {
  return (
    <textarea
      rows={6}
      onChange={(e) => setInputValue(e.target.value)}
      className={`w-${inputWidth || 48} rounded-md border-2 border-neutral-700 px-3 py-2 text-base font-medium text-neutral-900
             transition duration-200 focus:border-neutral-500 focus:outline-none dark:bg-neutral-800 dark:text-white`}
      placeholder={placeholder}
    >
      {getInputValue()}
    </textarea>
  )
}
