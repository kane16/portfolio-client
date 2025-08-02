export default function SiteIcon() {
  return (
    <>
      <span className="dark:hidden">
        <img src={"/light-delukesoft.png"} alt="Logo" width={60} height={60} />
      </span>
      <span className="hidden dark:inline">
        <img src={"/dark-delukesoft.png"} alt="Logo" width={60} height={60} />
      </span>
    </>
  )
}
