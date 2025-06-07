import Footer from "./footer/footer"
import Header from "./header/header"
import Home from "./home/Home"
import "./index.css"

function App() {
  return (
    <>
      <div className="p-2 antialiased">
        <Header />
        <Home />
      </div>
      <Footer />
    </>
  )
}

export default App
