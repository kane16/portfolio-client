import { RouterProvider } from "react-router-dom"
import Footer from "./sites/footer/footer"
import Header from "./sites/header/Header"
import "./index.css"
import { mainRoutes } from "./route/MainRoute"
import { Toaster } from "react-hot-toast"
import { useApplicationClick } from "./app/application-click-hook"
import { useTranslation } from "react-i18next"

function App() {
  const { clickHook, setApplicationClick } = useApplicationClick()
  const { t } = useTranslation()

  async function performApplicationClick() {
    if (
      clickHook?.preventApplicationClick === false &&
      clickHook?.applicationClick === false
    ) {
      await setApplicationClick({
        applicationClick: true,
        preventApplicationClick: false,
      })
    }
  }

  return (
    <>
      <div
        className="p-2 antialiased"
        onClick={() => performApplicationClick()}
      >
        <Header />
        <div className="flex h-[80vh] w-full flex-col items-center justify-center">
          {t("welcome")}
          <RouterProvider router={mainRoutes} />
        </div>
      </div>
      <Toaster position="bottom-center" />
      <Footer />
    </>
  )
}

export default App
