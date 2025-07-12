import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function RemovableButton(props: {
  title: string
  removeItem: (item: string) => void
}) {
  function handleClick(event: React.MouseEvent) {
    event.stopPropagation()
    props.removeItem(props.title)
  }

  return (
    <button className="z-10 m-0.5 cursor-default rounded-md bg-slate-200 p-1 text-sm text-black">
      {props.title}
      <FontAwesomeIcon
        icon={faXmark}
        onClick={handleClick}
        className="ml-2 cursor-pointer rounded-lg hover:bg-slate-500 hover:text-white"
      />
    </button>
  )
}
