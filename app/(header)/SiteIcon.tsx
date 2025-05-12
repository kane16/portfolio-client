import Image from "next/image"

export default function SiteIcon() {
  return (
    <>
      <span className="dark:hidden">
        <Image
          src={"/light-delukesoft.png"}
          alt="Logo"
          width={40}
          height={40}
        />
      </span>
      <span className="hidden dark:inline">
        <Image src={"/dark-delukesoft.png"} alt="Logo" width={40} height={40} />
      </span>
    </>
  )
}
