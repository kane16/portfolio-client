import { useState } from "react"
import MultiSelect from "../../../shared/MultiSelect"
import Button from "../../../shared/Button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faArrowLeft,
  faArrowRight,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons"
import { useQuery } from "@tanstack/react-query"
import { CircleLoader } from "react-spinners"
import type { ResumeFilter } from "../../../api/model"
import { fetchResumeFilters } from "../../../api/requests"

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
  const { isPending, data } = useQuery<ResumeFilter>({
    queryKey: ["filters"],
    queryFn: () => fetchResumeFilters(),
    retry: false,
    throwOnError: true,
  })

  const [currentSkills, setCurrentSkills] = useState<ChoiceSkill[]>([])
  const [currentBusiness, setCurrentBusiness] = useState<ChoiceBusiness[]>([])
  const [technicalDomains, setTechnicalDomains] = useState<
    ChoiceTechnicalDomain[]
  >([])
  const [filtersHidden, setFiltersHidden] = useState(true)

  if (isPending) return <CircleLoader color={"white"} size={60} />

  const filters: ResumeFilter = data as ResumeFilter
  const availableSkills: ChoiceSkill[] = filters.skills.map((skill) => ({
    name: skill,
  }))
  const availableBusinesses: ChoiceBusiness[] = filters.business.map(
    (business) => ({
      name: business,
    }),
  )
  const availableTechnicalDomains: ChoiceTechnicalDomain[] =
    filters.technologyDomain.map((domain) => ({
      name: domain,
    }))

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

  return (
    <div className={`flex h-full`}>
      <div className="mt-7 flex flex-col justify-between">
        <FontAwesomeIcon
          icon={filtersHidden ? faArrowRight : faArrowLeft}
          onClick={() => setFiltersHidden(!filtersHidden)}
          className={`${filtersHidden ? "translate-x-0" : "mr-4 translate-x-80"} relative ml-2 cursor-pointer rounded-full bg-neutral-400 p-2 transition-all duration-300 ease-in-out hover:bg-neutral-500`}
        />
      </div>
      <div
        className={`mt-4 ${filtersHidden ? "hidden" : "flex"} h-full flex-col items-center
        justify-between gap-8 rounded-lg bg-neutral-700 p-4 shadow-lg`}
      >
        <div className={`flex flex-col items-center gap-4`}>
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
