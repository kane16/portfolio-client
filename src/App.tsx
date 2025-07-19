import { RouterProvider } from "react-router-dom"
import Footer from "./footer/footer"
import Header from "./header/header"
import "./index.css"
import { mainRoutes } from "./route/MainRoute"
import { Toaster } from "react-hot-toast"

function App() {

  return (
    <>
      <div className="p-2 antialiased">
        <Header />
        <RouterProvider router={mainRoutes} />
      </div>
      <Toaster />
      <Footer />
    </>
  )
}

export default App
