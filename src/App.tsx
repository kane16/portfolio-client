import Footer from "./footer/footer"
import Header from "./header/header"
import "./index.css"
import { mainRoutes } from "./route/MainRoute"

function App() {

  return (
    <>
      <div className="p-2 antialiased">
        <Header />
        {mainRoutes()}
      </div>
      <Footer />
    </>
  )
}

export default App
