import { useQuery } from "@tanstack/react-query"
import { useAuth } from "../login/use-auth"
import { getHistory } from "../../api/requests"
import { CircleLoader } from "react-spinners"
import { Navigate } from "react-router-dom"
import { NotFoundResponse } from "../../api/model"

export default function EditMain() {
  const { authData } = useAuth()
  const { data, isPending } = useQuery({
    queryKey: ["portfolioHistory"],
    queryFn: () => getHistory(authData.user?.jwtDesc || ""),
    retry: false,
    throwOnError: true,
  })

  if (isPending) {
    return <CircleLoader size={60} color="white" />
  }

   if (data instanceof NotFoundResponse) {
    return <Navigate to={"/edit/init"} />
  }

  return <div>Loaded</div>
}
