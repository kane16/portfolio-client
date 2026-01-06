import Footer from "./sites/footer/footer"
import Header from "./sites/header/Header"
import "./index.css"
import { Toaster } from "react-hot-toast"
import { useApplicationClick } from "./app/application-click-hook"
import { Outlet } from "react-router-dom"

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
      <div className="antialiased" onClick={() => performApplicationClick()}>
        <Header />
        <div className="flex min-h-[90vh] w-full flex-col items-center justify-center py-4 md:h-[80vh] md:min-h-0 md:py-0">
          <Outlet />
        </div>
      </div>
      <Toaster position="bottom-center" />
      <Footer />
    </>
  )
}

export default App
