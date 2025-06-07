import { useAppDispatch } from "../../../app/hooks"
import Dropdown from "../../../shared/Dropdown"
import Search from "../../../shared/Search"
import { useEffect, useState } from "react"
import { changeResumeFilter } from "../../../store/portfolio/portfolio-slice"
import { useAppSelector } from "../../../app/hooks"

export default function ResumeFilter() {
  const resumeFilter = useAppSelector((state) => state.portfolio.resumeFilter)
  const [searchText, setSearchText] = useState("")
  const [currentSkill, setCurrentSkill] = useState<string | undefined>(
    undefined,
  )
  const [currentBusiness, setCurrentBusiness] = useState<string | undefined>(
    undefined,
  )
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (
      resumeFilter.business !== currentBusiness ||
      resumeFilter.skill !== currentSkill ||
      resumeFilter.searchText !== searchText
    ) {
      dispatch(
        changeResumeFilter({
          searchText,
          skill: currentSkill,
          business: currentBusiness,
        }),
      )
    }
  }, [searchText, currentSkill, currentBusiness, dispatch])

  return (
    <div className="flex flex-col items-center gap-8 md:w-2/3 md:p-4">
      <div>
        <h1 className="text-2xl font-bold">Resume Filter</h1>
      </div>
      <div className="flex flex-col items-center gap-4">
        <Search textChangedHandler={setSearchText} isLoading={false} />
        <Dropdown
          name="Skills"
          options={[
            {
              name: "Java",
            },
            {
              name: "JavaScript",
            },
            {
              name: "Python",
            },
          ]}
          disabled={false}
          onSelected={(value) => {
            setCurrentSkill(value?.name)
          }}
        />
        <Dropdown
          name="Businesses"
          options={[
            {
              name: "Banking",
            },
            {
              name: "Insurance",
            },
            {
              name: "Healthcare",
            },
          ]}
          disabled={false}
          onSelected={(value) => {
            setCurrentBusiness(value?.name)
          }}
        />
      </div>
    </div>
  )
}
