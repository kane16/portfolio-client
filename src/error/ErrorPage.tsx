import { useAppSelector } from "../app/hooks"

function ErrorPage() {
  const error = useAppSelector((state) => state.portfolio.error)

  return (
    <p className="pt-6 text-center text-4xl text-black dark:text-white">
      {error}
    </p>
  )
}

export default ErrorPage
