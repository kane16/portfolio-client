import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import MultiSelect from "../../shared/MultiSelect"
import Button from "../../shared/Button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faArrowLeft,
  faArrowRight,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons"
import { useQuery } from "@tanstack/react-query"
import {
  fetchResumeFilter,
  pullResumeFilterFailure,
  pullResumeFilterSuccess,
} from "../../features/portfolio/portfolio-slice"
import { CircleLoader } from "react-spinners"
import type { ResumeFilter } from "../../features/portfolio/model"
import { failedWithMessage } from "../../features/error/error-slice"

interface ChoiceSkill {
  name: string
}

interface ChoiceBusiness {
  name: string
}

interface ChoiceTechnicalDomain {
  name: string
}

export default function ResumeFilterComponent() {
  const dispatch = useAppDispatch()
  const { isPending, error, data } = useQuery<ResumeFilter>({
    queryKey: ["filters"],
    queryFn: () => fetchResumeFilter(),
    retry: false,
  })

  useEffect(() => {
    if (error && !isPending) {
      dispatch(pullResumeFilterFailure())
      dispatch(failedWithMessage("Filters pull failed"))
    } else if (data) {
      dispatch(pullResumeFilterSuccess(data))
    }
  }, [error, data])

  const [currentSkills, setCurrentSkills] = useState<ChoiceSkill[]>([])
  const [currentBusiness, setCurrentBusiness] = useState<ChoiceBusiness[]>([])
  const [technicalDomains, setTechnicalDomains] = useState<
    ChoiceTechnicalDomain[]
  >([])
  const [filtersHidden, setFiltersHidden] = useState(true)
  const availableSkills: ChoiceSkill[] = useAppSelector((state) =>
    state.portfolio.resumeFilter.skills.map((skill) => ({ name: skill })),
  )
  const availableBusinesses: ChoiceBusiness[] = useAppSelector((state) =>
    state.portfolio.resumeFilter.business.map((business) => ({
      name: business,
    })),
  )
  const availableTechnicalDomains: ChoiceTechnicalDomain[] = useAppSelector(
    (state) =>
      state.portfolio.resumeFilter.technologyDomain.map((domain) => ({
        name: domain,
      })),
  )

  function selectItem<T extends { name: string }>(
    item: T,
    items: T[],
    setItems: (items: T[]) => void,
  ) {
    if (items.some((i) => i.name === item.name)) {
      setItems(items.filter((i) => i.name !== item.name))
    } else {
      setItems([...items, item])
    }
  }

  if (isPending) return <CircleLoader color={"white"} size={60} />

  return (
    <div className={`flex h-full`}>
      <div className="flex flex-col justify-between">
        <div></div>
        <FontAwesomeIcon
          icon={filtersHidden ? faArrowRight : faArrowLeft}
          onClick={() => setFiltersHidden(!filtersHidden)}
          className={`${filtersHidden ? "translate-x-0" : "mr-4 translate-x-80"} relative ml-2 cursor-pointer rounded-full bg-neutral-400 p-2 transition-all duration-300 ease-in-out hover:bg-neutral-500`}
        />
      </div>
      <div
        className={`mt-4 ${filtersHidden ? "hidden" : "flex"} 
        h-full flex-col items-center justify-between gap-8 rounded-lg bg-neutral-600 p-4 shadow-lg`}
      >
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-2xl font-bold text-white">Resume Filters</h2>
          <MultiSelect
            items={availableSkills}
            selectedItems={() => currentSkills}
            selectItem={(item) =>
              selectItem(item, currentSkills, setCurrentSkills)
            }
            clearItems={() => setCurrentSkills([])}
            placeholder="All Skills"
          />
          <MultiSelect
            items={availableBusinesses}
            selectedItems={() => currentBusiness}
            selectItem={(item) =>
              selectItem(item, currentBusiness, setCurrentBusiness)
            }
            clearItems={() => setCurrentBusiness([])}
            placeholder="All Businesses"
          />
          <MultiSelect
            items={availableTechnicalDomains}
            selectedItems={() => technicalDomains}
            selectItem={(item) =>
              selectItem(item, technicalDomains, setTechnicalDomains)
            }
            clearItems={() => setTechnicalDomains([])}
            placeholder="All Technical Domains"
          />
        </div>
        <Button
          text="Apply Filters"
          onClick={() => {}}
          icon={<FontAwesomeIcon icon={faMagnifyingGlass} />}
        />
      </div>
    </div>
  )
}
