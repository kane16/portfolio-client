import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "./app/hooks"
import Footer from "./footer/footer"
import Header from "./header/header"
import "./index.css"
import { mainRoutes } from "./route/MainRoute"
import { useNavigate } from "react-router-dom"
import toast, { Toaster } from "react-hot-toast"
import { clearError, clearPopup } from "./features/error/error-slice"

function App() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const error = useAppSelector((state) => state.error.message)
  const popup = useAppSelector((state) => state.error.popup)

  useEffect(() => {
    if (error) {
      navigate("/error", { state: { from: location.pathname, error: error } })
      dispatch(clearError())
    }
    if (popup) {
      toast.error(popup, {
        position: "bottom-center",
        duration: 3000,
      })
      dispatch(clearPopup())
    }
  }, [error, popup, navigate, dispatch])

  return (
    <>
      <div className="p-2 antialiased">
        <Header />
        <div className="flex flex-col items-center">{mainRoutes()}</div>
      </div>
      <Toaster />
      <Footer />
    </>
  )
}

export default App
