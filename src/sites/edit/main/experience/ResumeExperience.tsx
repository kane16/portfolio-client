import Stepper, { StepperOrientation } from "../../../../shared/Stepper"
import ExperienceBusiness from "./business/ExperienceBusiness"
import ExperienceTimeframeList from "./timeframe/ExperienceTimeframeList"
import { useExperienceValidationState } from "../../../../app/experience-validation-state-hook"
import ExperienceSkillsList from "./skill/ExperienceSkillsList"

export default function ResumeExperience() {
  const { validationState, mutateValidationState } =
    useExperienceValidationState()

  function setActiveStep(stepId: number) {
    const newState = {
      ...validationState,
      activeStep: stepId,
    }
    mutateValidationState(newState)
  }

  return (
    <div className="m-4 h-[70vh] w-full max-w-4xl overflow-auto rounded-xl border border-[var(--border)] bg-[var(--background)] p-4 shadow-sm">
      <div className="flex h-40 items-center justify-center overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)]">
        <Stepper
          steps={validationState.steps}
          orientation={StepperOrientation.HORIZONTAL}
          activeStepId={() => validationState.activeStep}
          setActiveStepId={setActiveStep}
        />
      </div>
      <div className="my-4 flex h-[48vh] overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
        {validationState.activeStep === 1 && (
          <ExperienceBusiness nextStep={() => setActiveStep(2)} />
        )}
        {validationState.activeStep === 2 && (
          <ExperienceTimeframeList nextStep={() => setActiveStep(3)} />
        )}
        {validationState.activeStep === 3 && (
          <ExperienceSkillsList nextStep={() => setActiveStep(4)} />
        )}
        {validationState.activeStep === 4 && <div>Summary Content</div>}
      </div>
    </div>
  )
}
