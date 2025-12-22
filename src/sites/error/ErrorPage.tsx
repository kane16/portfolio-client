import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faExclamation } from "@fortawesome/free-solid-svg-icons"
import { useRouteError } from "react-router-dom"

function ErrorPage() {
  const error = useRouteError() as Error | null

  return (
    <div className="mx-auto mt-10 flex w-full max-w-lg flex-col items-center justify-center gap-6 p-8 text-center md:mt-20">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
        <FontAwesomeIcon
          icon={faExclamation}
          size="2xl"
          className="text-gray-400 dark:text-gray-500"
        />
      </div>
      <p className="text-lg text-gray-600 dark:text-gray-300">
        {error?.message || "Something went wrong"}
      </p>
    </div>
  )
}

export default ErrorPage
