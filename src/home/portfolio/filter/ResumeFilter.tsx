import { useAppDispatch } from "../../../app/hooks"
import Dropdown from "../../../shared/Dropdown"
import Search from "../../../shared/Search"
import { useEffect, useState } from "react"
import { changeResumeFilter } from "../../../features/portfolio/portfolio-slice"
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
  const availableSkills = useAppSelector(
    (state) => state.portfolio.resume?.skills,
  )
  const availableBusinesses = useAppSelector(
    (state) => state.portfolio.resume?.business,
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
    <div className="flex flex-col items-center gap-8">
      <div className="flex flex-col items-center gap-4">
        <Search textChangedHandler={setSearchText} isLoading={false} />
        <Dropdown
          name="Skills"
          options={
            availableSkills?.values?.map((skill) => ({ name: skill.name })) ??
            []
          }
          disabled={false}
          onSelected={(value) => {
            setCurrentSkill(value?.name)
          }}
        />
        <Dropdown
          name="Businesses"
          options={
            availableBusinesses?.values?.map((business) => ({
              name: business.name,
            })) ?? []
          }
          disabled={false}
          onSelected={(value) => {
            setCurrentBusiness(value?.name)
          }}
        />
      </div>
    </div>
  )
}
