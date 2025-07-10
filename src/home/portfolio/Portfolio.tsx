import { useQuery } from "@tanstack/react-query"
import ResumeDescription from "./description/ResumeDescription"
import ResumeInfoMatrix from "./resume-info/ResumeInfo"
import type { Resume } from "../../features/portfolio/model"
import { CircleLoader } from "react-spinners"
import {
  fetchPortfolio,
  pullPortfolioFailure,
  pullPortfolioSuccess,
} from "../../features/portfolio/portfolio-slice"
import { useAppDispatch } from "../../app/hooks"
import { useEffect } from "react"
import { failedWithMessage } from "../../features/error/error-slice"

export default function Portfolio() {
  const dispatch = useAppDispatch()
  const { isPending, error, data } = useQuery<Resume>({
    queryKey: ["portfolio"],
    queryFn: () => fetchPortfolio(),
    retry: false,
  })

  useEffect(() => {
    if (error && !isPending) {
      dispatch(pullPortfolioFailure())
      dispatch(failedWithMessage(error.message))
    } else if (!data && !isPending) {
      dispatch(pullPortfolioFailure())
      dispatch(failedWithMessage("No data"))
    } else if (data) {
      dispatch(pullPortfolioSuccess(data))
    }
  }, [error, data, dispatch, isPending])

  if (isPending) return <CircleLoader color={"white"} size={60} />

  return (
    <div className="flex flex-col gap-4 rounded-md bg-neutral-100 p-4 text-lg dark:border-gray-500 dark:bg-neutral-800 md:grid md:h-[80vh] md:max-w-4xl md:grid-cols-7 md:grid-rows-3 md:border-2">
      <div className="scrollbar scrollbar-thumb-neutral-300 scrollbar-track-neutral-100 dark:scrollbar-thumb-neutral-800 dark:scrollbar-track-neutral-600 overflow-hidden overflow-y-auto md:col-span-5 md:pt-4">
        <ResumeDescription />
      </div>
      <div className="md:col-span-8 md:row-span-2 md:row-start-2">
        <ResumeInfoMatrix />
      </div>
    </div>
  )
}
