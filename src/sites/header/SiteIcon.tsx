import { useNavigate } from "react-router-dom"

export default function SiteIcon() {
  const navigate = useNavigate()

  function onLogoClick() {
    navigate("/")
  }

  return (
    <>
      <span className="dark:hidden">
        <img
          src={"/light-delukesoft.png"}
          alt="Logo"
          width={60}
          height={60}
          onClick={onLogoClick}
          className="cursor-pointer transition-all duration-300 hover:scale-105 hover:opacity-80"
        />
      </span>
      <span className="hidden dark:inline">
        <img
          src={"/dark-delukesoft.png"}
          alt="Logo"
          width={60}
          height={60}
          onClick={onLogoClick}
          className="cursor-pointer transition-all duration-300 hover:scale-105 hover:opacity-80"
        />
      </span>
    </>
  )
}
