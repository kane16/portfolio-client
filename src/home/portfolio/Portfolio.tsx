import { useQuery } from "@tanstack/react-query"
import ResumeDescription from "./description/ResumeDescription"
import ResumeFilter from "./filter/ResumeFilter"
import ResumeInfoMatrix from "./matrix/ResumeInfoMatrix"
import type { Resume } from "../../store/portfolio/model"
import { CircleLoader } from "react-spinners"
import ErrorPage from "../../error/ErrorPage"
import {
  pullPortfolioFailure,
  pullPortfolioSuccess,
} from "../../store/portfolio/portfolio-slice"
import { useAppDispatch } from "../../app/hooks"

export default function Portfolio() {
  const dispatch = useAppDispatch()
  const { isPending, error, data } = useQuery<Resume>({
    queryKey: ["portfolio"],
    queryFn: () => fetchPortfolio(),
    retry: 2,
  })

  const fetchPortfolio = async (): Promise<Resume> => {
    const response = await fetch("/api/portfolio/cv")
    if (response.status !== 200) {
      throw new Error("Failed to fetch portfolio")
    }

    const data: Resume = await response.json()
    return data
  }

  if (isPending) return <CircleLoader color={"white"} size={60} />
  if (error) {
    dispatch(pullPortfolioFailure(error.message))
    return <ErrorPage error={error.message} />
  }
  if (!data) {
    dispatch(pullPortfolioFailure("No data"))
    return <ErrorPage error={"No data"} />
  }
  if (data) {
    dispatch(pullPortfolioSuccess(data))
  }

  return (
    <div
      className="flex flex-col gap-4 rounded-md bg-neutral-100 p-4 text-lg dark:border-gray-500 dark:bg-stone-800
      md:grid md:h-[80vh] md:w-2/3 md:grid-cols-7 md:border-2"
    >
      <div className="md:col-span-2 md:pt-4">
        <ResumeFilter />
      </div>
      <div className="md:col-span-5 md:pt-4">
        <ResumeDescription />
      </div>
      <div className="md:col-span-5">
        <ResumeInfoMatrix />
      </div>
    </div>
  )
}
