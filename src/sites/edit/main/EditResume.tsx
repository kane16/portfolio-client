import { useEffect, useState, type JSX } from "react"
import { Navigate, Outlet, useNavigate, useParams } from "react-router-dom"
import "react-circular-progressbar/dist/styles.css"
import ProgressStatusIndicator from "../../../shared/ProgressStatusIndicator"
import Stepper, { StepperOrientation } from "../../../shared/Stepper"
import { NotFoundResponse, type ValidationStep } from "../../../api/model"
import {
  useHistory,
  usePublishResume,
  useResumeById,
  useValidateResume,
} from "../../../api/queries"
import { useAuth } from "../../login/use-auth"
import toast from "react-hot-toast"
import Button from "../../../shared/Button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUpload } from "@fortawesome/free-solid-svg-icons"
import { useTranslation } from "react-i18next"

export default function EditResume(): JSX.Element {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { id } = useParams<{ id: string }>()
  const resumeId = Number.parseInt(id || "0")
  const { authData } = useAuth()
  const history = useHistory(authData.user!.jwtDesc)
  const publishResume = usePublishResume(t)
  const { data: resume } = useResumeById(authData.user!.jwtDesc, resumeId)
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

  useEffect(() => {
    const currentUrlStep = location.pathname
    steps
      .filter((step) => currentUrlStep.includes(step.endpoint))
      .forEach((step) => setCurrentStepId(step.id))
  }, [])

  if (history.data instanceof NotFoundResponse) {
    return <Navigate to={"/edit/init"} />
  }

  console.log(history)
  const versions = history.data!.history

  function triggerStepActivation(stepId: number) {
    steps
      .filter((s) => s.id === stepId)
      .forEach((s) => {
        setCurrentStepId(s.id)
        s.messages.map((e) => toast.error(e, { duration: 2000 }))
        navigate(s.endpoint)
      })
  }

  async function publishEditResume() {
    const result = await publishResume.mutateAsync({
      versionId: versions.find((v) => v.id === resumeId)!.version,
      token: authData.user!.jwtDesc,
    })
    if (result) {
      navigate("/edit")
    }
  }

  if (resume instanceof NotFoundResponse) {
    return <Navigate to={"/edit/init"} />
  }

  return (
    <div className="grid h-full w-full grid-cols-9 grid-rows-6 items-center justify-center gap-4 p-4">
      <div className="col-span-2 col-start-1 row-start-1 flex h-full w-full items-center justify-center">
        <div className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 shadow-sm">
          <div className="flex items-center justify-center">
            <ProgressStatusIndicator progress={validationResults.progress} />
          </div>
        </div>
      </div>
      <div className="col-span-2 col-start-1 row-span-5 row-start-2 flex h-full w-full items-center justify-center">
        <div className="h-full w-full overflow-auto rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 shadow-sm">
          <Stepper
            steps={steps}
            activeStepId={() => currentStepId}
            setActiveStepId={triggerStepActivation}
            orientation={StepperOrientation.VERTICAL}
          />
        </div>
      </div>
      <div className="col-span-5 col-start-3 row-span-6 flex h-full w-full justify-center">
        <Outlet />
      </div>
      {validationResults.progress === 100 && (
        <div className="col-span-2 col-start-8 flex h-full w-full p-4">
          <div className="flex h-[70vh] w-full flex-col items-center overflow-auto rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 shadow-sm">
            {
              <Button
                text={t("editResume.publishResume")}
                onClick={publishEditResume}
                overrideStyles="w-48 border-green-400 bg-green-700 hover:bg-green-800"
                icon={<FontAwesomeIcon icon={faUpload} />}
              />
            }
          </div>
        </div>
      )}
    </div>
  )
}
