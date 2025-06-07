import { useQuery } from "@tanstack/react-query"
import ResumeDescription from "./description/ResumeDescription"
import ResumeFilter from "./filter/ResumeFilter"
import ResumeInfoMatrix from "./matrix/ResumeInfoMatrix"
import type { Resume } from "../../features/portfolio/model"
import { CircleLoader } from "react-spinners"
import {
  fetchPortfolio,
  pullPortfolioFailure,
  pullPortfolioSuccess,
} from "../../features/portfolio/portfolio-slice"
import { useAppDispatch } from "../../app/hooks"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function Portfolio() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { isPending, error, data } = useQuery<Resume>({
    queryKey: ["portfolio"],
    queryFn: () => fetchPortfolio(),
    retry: false,
  })

  useEffect(() => {
    if (error) {
      dispatch(pullPortfolioFailure(error.message))
      navigate("/error")
    } else if (!data) {
      dispatch(pullPortfolioFailure("No data"))
    } else if (data) {
      dispatch(pullPortfolioSuccess(data))
    }
  }, [error, data, dispatch, navigate])

  if (isPending) return <CircleLoader color={"white"} size={60} />

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
