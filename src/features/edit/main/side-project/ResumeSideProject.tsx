import Stepper, { StepperOrientation } from "../../../../shared/Stepper"
import SideProjectBusiness from "./business/SideProjectBusiness"
import SideProjectTimeframeList from "./timeframe/SideProjectTimeframeList"
import SideProjectSkillsList from "./skill/SideProjectSkillsList"
import SideProjectSummary from "./summary/SideProjectSummary"
import {
  useAddSideProject,
  useEditSideProject,
} from "../../../../api/side-projects"
import { useTranslation } from "react-i18next"
import { useAuth } from "../../../login/use-auth"
import { type Project, type Skill } from "../../../../api"
import {
  ValidationStatus,
  type ValidationStep,
} from "../../../../api/validation"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRight, faCheckToSlot } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"

interface ResumeSideProjectProps {
  resumeId: number
  initialSideProject: Project
  steps: ValidationStep[]
  activeStepId: number
  closeEdit: () => void
}

export default function ResumeSideProject({
  resumeId,
  initialSideProject,
  steps,
  activeStepId,
  closeEdit,
}: ResumeSideProjectProps) {
  const { token } = useAuth()
  const { t } = useTranslation()
  const [project, setProject] = useState<Project>(initialSideProject)
  const addSideProjectTrigger = useAddSideProject(t, resumeId, token!)
  const editSideProjectTrigger = useEditSideProject(t, resumeId, token!)
  const [activeStep, setActiveStep] = useState<ValidationStep>(
    steps.find((step) => step.id === activeStepId)!,
  )
  const [stepsState, setStepsState] = useState<ValidationStep[]>(steps)

  async function saveSideProject() {
    const result = project.id
      ? await editSideProjectTrigger.mutateAsync({
          sideProject: project,
        })
      : await addSideProjectTrigger.mutateAsync({
          sideProject: project,
        })

    if (result) {
      closeEdit()
    }
  }

  async function nextStep() {
    if (activeStep.id === 4) {
      await saveSideProject()
    } else {
      setActiveStep(stepsState.find((step) => step.id === activeStep.id + 1)!)
    }
  }

  function onBusinessChanged(businessName: string, description: string) {
    setProject({
      ...project,
      business: businessName,
      description: description,
    })
    markStepAsValid()
  }

  function onTimeframeChanged(startDate: string, endDate?: string) {
    setProject({
      ...project,
      timespan: {
        start: startDate,
        end: endDate,
      },
    })
    markStepAsValid()
  }

  function onSkillsChanged(skills: Skill[]) {
    setProject({
      ...project,
      skills: skills,
    })
    markStepAsValid()
  }

  function onSummaryChanged(position: string, summary: string) {
    setProject({
      ...project,
      position: position,
      summary: summary,
    })
    markStepAsValid()
  }

  function markStepAsValid() {
    setStepsState(
      stepsState.map((step) =>
        step.id === activeStep.id
          ? { ...step, status: ValidationStatus.VALID }
          : step,
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
              setActiveStep(stepsState.find((step) => step.id === id)!)
            }
          />
        </div>
        <div className="my-4 flex h-[48vh] flex-1 overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
          {activeStep.id === 1 && (
            <SideProjectBusiness
              project={project}
              onBusinessChanged={onBusinessChanged}
            />
          )}
          {activeStep.id === 2 && (
            <SideProjectTimeframeList
              project={project}
              onTimeframeChanged={onTimeframeChanged}
            />
          )}
          {activeStep.id === 3 && (
            <SideProjectSkillsList
              project={project}
              onSkillsChanged={onSkillsChanged}
            />
          )}
          {activeStep.id === 4 && (
            <SideProjectSummary
              project={project}
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
