import Search from "@/app/(shared)/Search"
import { useState } from "react"

export default function ResumeFilter() {
  const [searchText, setSearchText] = useState("")
  return (
    <div>
      <Search textChangedHandler={setSearchText} isLoading={false} />
      <div>{searchText}</div>
    </div>
  )
}
