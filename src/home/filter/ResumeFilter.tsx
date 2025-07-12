import { useState } from "react"
import { useAppSelector } from "../../app/hooks"
import type { ResumeFilter } from "../../features/portfolio/model"
import MultiSelect from "../../shared/MultiSelect"

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
  const [technicalDomains, setTechnicalDomains] = useState<ChoiceTechnicalDomain[]>([])
  const availableSkills: ChoiceSkill[] = useAppSelector(
    (state) => state.portfolio.resume?.informations.find(information => information.name === 'Skills')?.values ?? [],
  )
  const availableBusinesses: ChoiceBusiness[] = useAppSelector(
    (state) => state.portfolio.resume?.informations.find(information => information.name === 'Businesses')?.values ?? [],
  )
  const availableTechnicalDomains: ChoiceTechnicalDomain[] = useAppSelector(
    (state) => state.portfolio.resume?.informations.find(information => information.name === 'Technical Domains')?.values ?? [],
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
    <div className="flex flex-col items-center gap-8">
      <div className="flex flex-col items-center gap-4">
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
    </div>
  )
}
