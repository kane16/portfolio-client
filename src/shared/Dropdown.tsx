import type { Selectable } from "./model/selectable"
import { useTranslation } from "react-i18next"

function Dropdown<T extends Selectable>(props: {
  name: string
  options: T[]
  disabled: boolean
  currentValue?: T
  onSelected: (value?: T) => void
  overrideStyles?: string
}) {
  const { t } = useTranslation()
  function selectItem(value: string) {
    const selected = props.options.find((option) => option.name === value)
    props.onSelected(selected)
  }

  return (
    <select
      disabled={props.disabled}
      className={`bottom-2 w-48 ${
        props.disabled ? "appearance-none" : ""
      } rounded-md border-2 p-2 outline-none dark:border-neutral-400 dark:bg-neutral-900 dark:text-white ${
        props.overrideStyles
      }`}
      name={props.name}
      value={props.currentValue?.name}
      onChange={(event) => selectItem(event.target.value)}
    >
      <option value={undefined}>
        {t("dropdown.noOption", { name: props.name })}
      </option>
      {props.options.map((option) => (
        <option value={option.name} key={option.name}>
          {option.name}
        </option>
      ))}
    </select>
  )
}

export default Dropdown
