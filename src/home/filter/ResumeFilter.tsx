import { useState } from "react"
import { useAppSelector } from "../../app/hooks"
import type { ResumeFilter } from "../../features/portfolio/model"
import MultiSelect from "../../shared/MultiSelect"
import Button from "../../shared/Button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faArrowLeft,
  faArrowRight,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons"

interface ChoiceSkill {
  name: string
}

interface ChoiceBusiness {
  name: string
}

interface ChoiceTechnicalDomain {
  name: string
}

export default function ResumeFilter() {
  const [currentSkills, setCurrentSkills] = useState<ChoiceSkill[]>([])
  const [currentBusiness, setCurrentBusiness] = useState<ChoiceBusiness[]>([])
  const [technicalDomains, setTechnicalDomains] = useState<
    ChoiceTechnicalDomain[]
  >([])
  const [filtersHidden, setFiltersHidden] = useState(true)
  const availableSkills: ChoiceSkill[] = useAppSelector(
    (state) =>
      state.portfolio.resume?.informations.find(
        (information) => information.name === "Skills",
      )?.values ?? [],
  )
  const availableBusinesses: ChoiceBusiness[] = useAppSelector(
    (state) =>
      state.portfolio.resume?.informations.find(
        (information) => information.name === "Businesses",
      )?.values ?? [],
  )
  const availableTechnicalDomains: ChoiceTechnicalDomain[] = useAppSelector(
    (state) =>
      state.portfolio.resume?.informations.find(
        (information) => information.name === "Technical Domains",
      )?.values ?? [],
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
