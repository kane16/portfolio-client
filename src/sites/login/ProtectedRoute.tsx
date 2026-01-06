import type { JSX } from "react"
import { useAuth } from "./use-auth"
import { Navigate } from "react-router-dom"

export default function ProtectedRoute({
  internalElement,
}: {
  internalElement: JSX.Element
}): JSX.Element {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to={"/login"} replace={true} />
  }

  return internalElement
}
