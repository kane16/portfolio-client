import Dropdown from "../../shared/Dropdown"
import { useEffect, useState } from "react"
import { useAppSelector } from "../../app/hooks"
import type { ResumeFilter } from "../../features/portfolio/model"

export default function ResumeFilter() {
  const resumeFilter: ResumeFilter = useAppSelector(
    (state) => state.portfolio.resumeFilter,
  )
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

  useEffect(() => {
    setCurrentSkill(resumeFilter.skill)
    setCurrentBusiness(resumeFilter.business)
  }, [resumeFilter])

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="flex flex-col items-center gap-4">
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
          currentValue={{ name: currentSkill ?? "" }}
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
          currentValue={{ name: currentBusiness ?? "" }}
        />
      </div>
    </div>
  )
}
