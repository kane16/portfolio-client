export default function TextAreaInput({
  setInputValue,
  getInputValue,
  placeholder,
  inputWidth = 48,
}: {
  setInputValue: (value: string) => void
  getInputValue: () => string
  placeholder: string
  inputWidth?: number
}) {
  return (
    <div className={`w-${inputWidth}`}>
      <textarea
        rows={6}
        onChange={(e) => setInputValue(e.target.value)}
        className={`w-full rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-base text-[var(--foreground)] transition duration-200 placeholder:text-[var(--foreground-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--foreground-muted)]`}
        placeholder={placeholder}
        value={getInputValue()}
      />
    </div>
  )
}
