import { RouterProvider } from "react-router-dom"
import Footer from "./footer/footer"
import Header from "./header/header"
import "./index.css"
import { mainRoutes } from "./route/MainRoute"
import { Toaster } from "react-hot-toast"
import { useApplicationClick } from "./app/ApplicationClickHook"

function App() {
  const { clickHook, setApplicationClick } = useApplicationClick()

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
        <RouterProvider router={mainRoutes} />
      </div>
      <Toaster />
      <Footer />
    </>
  )
}

export default App
