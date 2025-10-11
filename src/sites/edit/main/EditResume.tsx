import { useEffect, useState, type JSX } from "react"
import { Outlet, useNavigate, useParams } from "react-router-dom"
import "react-circular-progressbar/dist/styles.css"
import ProgressStatusIndicator from "../../../shared/ProgressStatusIndicator"
import Stepper, { StepperOrientation } from "../../../shared/Stepper"
import { type ValidationStep } from "../../../api/model"
import { useValidateResume } from "../../../api/queries"
import { useAuth } from "../../login/use-auth"
import toast from "react-hot-toast"

export default function EditResume(): JSX.Element {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const resumeId = Number.parseInt(id || "0")
  const { authData } = useAuth()
  const [currentStepId, setCurrentStepId] = useState<number>(1)
  const { data: validationResults } = useValidateResume(
    authData.user!.jwtDesc,
    resumeId,
  )
  const steps: ValidationStep[] = validationResults.validationResults.map(
    (step, idx) => ({
      id: idx + 1,
      name: step.domain.title,
      status: step.validationStatus,
      messages: step.errors,
      endpoint: step.domain.endpoint,
    }),
  )

  function triggerStepActivation(stepId: number) {
    steps.filter((s) => s.id === stepId).forEach((s) => {
      setCurrentStepId(s.id)
      s.messages.map((e) => toast.error(e, { duration: 2000 }))
      navigate(s.endpoint)
    })
  }

  useEffect(() => {
    const currentUrlStep = location.pathname
    steps
      .filter((step) => currentUrlStep.includes(step.endpoint))
      .forEach((step) => setCurrentStepId(step.id))
  }, [])

  return (
    <div className="grid h-full w-full grid-cols-9 grid-rows-6 items-center justify-center gap-4 p-4">
      <div className="col-span-7 col-start-1 row-span-6 flex h-full w-full justify-center">
        <Outlet />
      </div>
      <div className="col-span-2 col-start-8 row-start-1 flex h-full w-full items-center justify-center">
        <div className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 shadow-sm">
          <div className="flex items-center justify-center">
            <ProgressStatusIndicator progress={validationResults.progress} />
          </div>
        </div>
      </div>
      <div className="col-span-2 col-start-8 row-span-5 row-start-2 flex h-full w-full items-center justify-center">
        <div className="h-full w-full overflow-auto rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 shadow-sm">
          <Stepper
            steps={steps}
            activeStepId={() => currentStepId}
            setActiveStepId={triggerStepActivation}
            orientation={StepperOrientation.VERTICAL}
          />
        </div>
      </div>
    </div>
  )
}
