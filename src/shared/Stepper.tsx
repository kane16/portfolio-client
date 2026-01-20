import type { JSX } from "react"
import type { ValidationStep } from "../api/validation"
import ValidationStepperStep from "./ValidationStepperStep"
import StepperDivider from "./StepperVerticalDivider"

export enum StepperOrientation {
  VERTICAL = "vertical",
  HORIZONTAL = "horizontal",
}

export default function Stepper({
  steps,
  activeStepId,
  setActiveStepId,
  orientation,
}: {
  steps: ValidationStep[]
  activeStepId: () => number
  setActiveStepId: (id: number) => void
  orientation: StepperOrientation
}): JSX.Element {

  function isPreviousStepCompleted(currentStepId: number): boolean {
    if (currentStepId === 1) return true
    return steps.find(s => s.id === currentStepId - 1 && s.status === "VALID") !== undefined
  }

  return (
    <div className={`flex ${orientation === StepperOrientation.HORIZONTAL ? "flex-row" : "flex-col"} items-center justify-center`}>
      {steps.map((step, index) =>
        index === steps.length - 1 ? (
          <ValidationStepperStep
            key={step.id}
            step={step}
            isActive={() => activeStepId() === step.id}
            setActive={() => setActiveStepId(step.id)}
            isDisabled={!isPreviousStepCompleted(step.id)}
          />
        ) : (
          <div
            className={`flex ${orientation === StepperOrientation.HORIZONTAL ? "flex-row" : "flex-col"} items-center`}
            key={step.id}
          >
            <ValidationStepperStep
              key={step.id}
              step={step}
              isActive={() => activeStepId() === step.id}
              setActive={() => setActiveStepId(step.id)}
              isDisabled={!isPreviousStepCompleted(step.id)}
            />
            <StepperDivider
              key={`divider-${step.id}`}
              orientation={orientation}
            />
          </div>
        ),
      )}
    </div>
  )
}
