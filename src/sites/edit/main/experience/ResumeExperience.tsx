import Stepper, { StepperOrientation } from "../../../../shared/Stepper"
import ExperienceBusiness from "./business/ExperienceBusiness"
import ExperienceTimeframeList from "./timeframe/ExperienceTimeframeList"
import ExperienceSkillsList from "./skill/ExperienceSkillsList"
import ExperienceSummary from "./summary/ExperienceSummary"
import { useAddExperience, useEditExperience } from "../../../../api/queries"
import { useTranslation } from "react-i18next"
import { useAuth } from "../../../login/use-auth"
import {
  ValidationStatus,
  type Experience,
  type Skill,
  type ValidationStep,
} from "../../../../api/model"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRight, faCheckToSlot } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"

interface ResumeExperienceProps {
  resumeId: number
  initialExperience: Experience
  steps: ValidationStep[]
  activeStepId: number
  closeEdit: () => void
}

export default function ResumeExperience({
  resumeId,
  initialExperience,
  steps,
  activeStepId,
  closeEdit,
}: ResumeExperienceProps) {
  const { authData } = useAuth()
  const { t } = useTranslation()
  const [experience, setExperience] = useState<Experience>(initialExperience)
  const addExperienceTrigger = useAddExperience(
    t,
    resumeId,
    authData.user!.jwtDesc,
  )
  const editExperienceTrigger = useEditExperience(
    t,
    resumeId,
    authData.user!.jwtDesc,
  )
  const [activeStep, setActiveStep] = useState<ValidationStep>(
    steps.find((s) => s.id === activeStepId)!,
  )
  const [stepsState, setStepsState] = useState<ValidationStep[]>(steps)

  async function saveExperience() {
    const result = initialExperience.id
      ? await editExperienceTrigger.mutateAsync({
          experience,
        })
      : await addExperienceTrigger.mutateAsync({
          experience,
        })
    if (result) { 
      closeEdit()
    }
  }

  async function nextStep() {
    if (activeStep.id === 4) {
      await saveExperience()
    } else {
      setActiveStep(stepsState.find((s) => s.id === activeStep.id + 1)!)
    }
  }

  function onBusinessChanged(businessName: string, description: string) {
    setExperience({
      ...experience,
      business: businessName,
      description: description,
    })
    markStepAsValid()
  }

  function onTimeframesChanged(startDate: string, endDate?: string) {
    setExperience({
      ...experience,
      timespan: {
        start: startDate,
        end: endDate,
      },
    })
    markStepAsValid()
  }

  function onSkillsChanged(skills: Skill[]) {
    setExperience({
      ...experience,
      skills: skills,
    })
    markStepAsValid()
  }

  function onSummaryChanged(position: string, summary: string) {
    setExperience({
      ...experience,
      position: position,
      summary: summary,
    })
    markStepAsValid()
  }

  function markStepAsValid() {
    setStepsState(
      stepsState.map((s) =>
        s.id === activeStep.id ? { ...s, status: ValidationStatus.VALID } : s,
      ),
    )
    setActiveStep({ ...activeStep, status: ValidationStatus.VALID })
  }

  return (
    <>
      <div className="m-4 h-[70vh] w-full max-w-4xl overflow-auto rounded-xl border border-[var(--border)] bg-[var(--background)] p-4 shadow-sm">
        <div className="flex h-40 items-center justify-center overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)]">
          <Stepper
            steps={stepsState}
            orientation={StepperOrientation.HORIZONTAL}
            activeStepId={() => activeStep.id}
            setActiveStepId={(id) =>
              setActiveStep(stepsState.find((s) => s.id === id)!)
            }
          />
        </div>
        <div className="my-4 flex h-[48vh] flex-1 overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
          {activeStep.id === 1 && (
            <ExperienceBusiness
              experience={experience}
              onBusinessChanged={onBusinessChanged}
            />
          )}
          {activeStep.id === 2 && (
            <ExperienceTimeframeList
              experience={experience}
              onTimeframeChanged={onTimeframesChanged}
            />
          )}
          {activeStep.id === 3 && (
            <ExperienceSkillsList
              experience={experience}
              onSkillsChanged={onSkillsChanged}
            />
          )}
          {activeStep.id === 4 && (
            <ExperienceSummary
              experience={experience}
              onSummaryChanged={onSummaryChanged}
            />
          )}
        </div>
      </div>
      {activeStep?.status === ValidationStatus.VALID && (
        <div className="cursor-pointer self-center p-2 text-3xl text-[var(--foreground-muted)] hover:text-[var(--foreground)]">
          <FontAwesomeIcon
            icon={activeStep.id === 4 ? faCheckToSlot : faArrowRight}
            onClick={nextStep}
          />
        </div>
      )}
    </>
  )
}
