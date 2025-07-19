import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faExclamation } from "@fortawesome/free-solid-svg-icons"
import { useRouteError } from "react-router-dom"

function ErrorPage() {
  const error = useRouteError() as Error | null

  console.log(error)
  if (error !== null) {
    console.log(error)
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
          <p className="text-center text-4xl text-red-500">{error?.message}</p>
        </div>
      </div>
    </div>
  )
}

export default ErrorPage
