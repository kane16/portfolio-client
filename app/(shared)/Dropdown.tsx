import { Selectable } from "./selectable"


function Dropdown<T extends Selectable>(props: {
  name: string
  options: T[]
  disabled: boolean
  currentValue?: T
  onSelected: (value?: T) => void
  overrideStyles?: string
}) {
  
  function selectItem(value: string) {
    const selected = props.options.find((option) => option.name === value)
    props.onSelected(selected)
  }

  return (
    <select
      disabled={props.disabled}
      className={`bottom-2 m-4 mb-6 mr-2 w-56 ${
        props.disabled ? "appearance-none" : ""
      } rounded-md border-2 p-2 dark:border-slate-400 dark:bg-slate-800 dark:text-white ${
        props.overrideStyles
      }`}
      name={props.name}
      value={props.currentValue?.name}
      onChange={(event) => selectItem(event.target.value)}
    >
      {props.options.map((option) => (
        <option value={option.name} key={option.name}>
          {option.name}
        </option>
      ))}
    </select>
  )
}

export default Dropdown
