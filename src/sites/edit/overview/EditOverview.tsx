import { useQuery } from "@tanstack/react-query"
import { useAuth } from "../../login/use-auth"
import { getHistory } from "../../../api/requests"
import { CircleLoader } from "react-spinners"
import { Navigate } from "react-router-dom"
import { NotFoundResponse, type ResumeHistory } from "../../../api/model"
import ResumeEditHeadline from "./ResumeEditHeadline"

export default function EditOverview() {
  const { authData } = useAuth()
  const { data, isPending, isFetching } = useQuery({
    queryKey: ["portfolioHistory"],
    queryFn: () => getHistory(authData.user?.jwtDesc || ""),
    throwOnError: true,
  })

  if (isPending || isFetching) {
    return <CircleLoader size={60} color="white" />
  }

  if (data instanceof NotFoundResponse) {
    return <Navigate to={"/edit/init"} />
  }

  const resumeHistory: ResumeHistory = data!

  return (
    <div className="mt-4 flex h-full w-full max-w-3xl flex-col items-center justify-between border-2 border-gray-500 p-6">
      <div className="text-3xl">Portfolio Overview</div>
      <div>
        {resumeHistory.history.map((version) => (
          <ResumeEditHeadline key={version.id} resumeVersion={version} />
        ))}
      </div>
      <div></div>
    </div>
  )
}
