import { CircleLoader } from "react-spinners"

export default function RoutesFallback() {
  return (
    <div className="flex h-64 w-screen items-center justify-center">
      <CircleLoader size={100} color="white" />
    </div>
  )
}
