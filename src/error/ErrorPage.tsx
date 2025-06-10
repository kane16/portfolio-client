import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { clearError } from "../features/error/error-slice"

function ErrorPage() {
  const dispatch = useAppDispatch()
  const error = useAppSelector((state) => state.error.message)
  const [errorMessage, setErrorMessage] = useState<string>('')

  useEffect(() => {
    if (error) {
      setErrorMessage(error)
      dispatch(clearError())
    }
  }, [error, dispatch])

  return (
    <p className="pt-6 text-center text-4xl text-black dark:text-white">
      {errorMessage}
    </p>
  )
}

export default ErrorPage
