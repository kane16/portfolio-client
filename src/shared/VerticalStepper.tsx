import type { JSX } from "react";
import type { ValidationStep } from "../api/model";


export default function VerticalStepper(
  { steps }: { steps: ValidationStep[] }
): JSX.Element {
  return <div className="flex flex-col">
    {steps.map(step => <div>
      <div>{step.state}</div>
    </div>)}
  </div>;
}