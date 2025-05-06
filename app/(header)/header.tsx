import Image from "next/image"
import ThemeToggle from "../(shared)/ThemeToggle"
import Navbar from "./navbar"

export default function Header() {
  return (
    <div className="flex w-full justify-between border p-4 shadow-md shadow-slate-600 dark:border-white dark:shadow-amber-50">
      <div>
        <span className="dark:hidden">
          <Image
            src={"/light-delukesoft.png"}
            alt="Logo"
            width={40}
            height={40}
          />
        </span>
        <span className="hidden dark:inline">
          <Image
            src={"/dark-delukesoft.png"}
            alt="Logo"
            width={40}
            height={40}
          />
        </span>
      </div>
      <Navbar />
      <ThemeToggle />
    </div>
  )
}
