import { type JSX } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faExclamation, faRotateLeft } from "@fortawesome/free-solid-svg-icons"
import Button from "../shared/Button"
import { useLocation, useNavigate } from "react-router-dom"

function ErrorPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const error = location.state?.error
  const from = location.state?.from

  function goBackIcon(): JSX.Element {
    return <FontAwesomeIcon icon={faRotateLeft} />
  }

  return (
    <div className="flex justify-center">
      <div className="mx-2 mt-4 flex h-96 w-2/3 flex-col items-center justify-evenly rounded-md border-2 border-red-500 md:mx-0 md:mt-14">
        <div className="flex flex-col items-center gap-4">
          <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-red-500">
            <FontAwesomeIcon
              icon={faExclamation}
              size="2xl"
              className="mb-2 text-red-500"
            />
          </div>
          <p className="text-center text-4xl text-red-500">{error}</p>
        </div>
        <div>
          <Button
            text="Try Again"
            onClick={() => navigate(from)}
            icon={goBackIcon()}
          />
        </div>
      </div>
    </div>
  )
}

export default ErrorPage
