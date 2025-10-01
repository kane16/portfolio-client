import { useEffect, useState } from "react"
import Stepper, { StepperOrientation } from "../../../../../shared/Stepper"
import {
  type Project,
  ValidationStatus,
  type ValidationStep,
} from "../../../../../api/model"
import ExperienceBusiness from "../business/ExperienceBusiness"
import ExperienceTimeframeList from "../timeframe/ExperienceTimeframeList"
import Cookies from "js-cookie"

export default function ResumeExperience() {
  const [project, setProject] = useState<Project>(
    Cookies.get("new_experience")
      ? JSON.parse(Cookies.get("new_experience")!)
      : {
          position: "",
          business: "",
          summary: "",
          description: "",
          timespan: {
            start: new Date(),
            end: new Date(),
          },
          skills: [],
        },
  )
  const [businessStep] = useState<ValidationStep>({
    id: 1,
    name: "Business",
    state: project.business
      ? ValidationStatus.VALID
      : ValidationStatus.NOT_VALIDATED,
    messages: [],
    activateStep: () => {},
    endpoint: "",
  })
  const [timeframeStep] = useState<ValidationStep>({
    id: 2,
    name: "Timeframe",
    state: ValidationStatus.NOT_VALIDATED,
    messages: [],
    activateStep: () => {},
    endpoint: "",
  })
  const [positionSkillsStep] = useState<ValidationStep>({
    id: 3,
    name: "Position Skills",
    state: ValidationStatus.NOT_VALIDATED,
    messages: [],
    activateStep: () => {},
    endpoint: "",
  })
  const [summaryStep] = useState<ValidationStep>({
    id: 4,
    name: "Summary",
    state: ValidationStatus.NOT_VALIDATED,
    messages: [],
    activateStep: () => {},
    endpoint: "",
  })

  const [steps, setSteps] = useState<ValidationStep[]>([
    businessStep,
    timeframeStep,
    positionSkillsStep,
    summaryStep,
  ])
  const [activeStep, setActiveStep] = useState<number>(
    steps.find(
      (step) =>
        step.state === ValidationStatus.NOT_VALIDATED ||
        step.state === ValidationStatus.INVALID,
    )?.id || 1,
  )

  async function validateBusiness() {
    setSteps([
      { ...businessStep, state: ValidationStatus.VALID },
      timeframeStep,
      positionSkillsStep,
      summaryStep,
    ])
    console.log(project)
    Cookies.set("new_experience", JSON.stringify(project))
  }

  useEffect(() => {
    if (Cookies.get("new_experience") != null) {
      setProject(JSON.parse(Cookies.get("new_experience")!))
    }
  }, [])

  return (
    <div className="m-4 h-[70vh] w-full max-w-4xl overflow-auto rounded-xl border border-[var(--border)] bg-[var(--background)] p-4 shadow-sm">
      <div className="flex h-40 items-center justify-center overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)]">
        <Stepper
          steps={steps}
          orientation={StepperOrientation.HORIZONTAL}
          activeStepId={() => activeStep}
          setActiveStepId={setActiveStep}
        />
      </div>
      <div className="my-4 flex h-[48vh] overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
        {activeStep === 1 && (
          <ExperienceBusiness
            experience={project}
            setExperience={setProject}
            validate={validateBusiness}
            isValid={steps[0]!.state === ValidationStatus.VALID}
            nextStep={() => setActiveStep(2)}
          />
        )}
        {activeStep === 2 && <ExperienceTimeframeList />}
        {activeStep === 3 && <div>Position Skills Content</div>}
        {activeStep === 4 && <div>Summary Content</div>}
      </div>
    </div>
  )
}
