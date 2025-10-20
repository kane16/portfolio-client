import Stepper, { StepperOrientation } from "../../../../shared/Stepper"
import SideProjectBusiness from "./business/SideProjectBusiness"
import SideProjectTimeframeList from "./timeframe/SideProjectTimeframeList"
import SideProjectSkillsList from "./skill/SideProjectSkillsList"
import SideProjectSummary from "./summary/SideProjectSummary"
import {
  sideProjectEmptyState,
  useSideProjectValidationState,
} from "../../../../app/side-project-validation-state-hook"
import {
  useAddSideProject,
  useEditSideProject,
  useResumeById,
} from "../../../../api/queries"
import { useTranslation } from "react-i18next"
import { useAuth } from "../../../login/use-auth"
import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import {
  NotFoundResponse,
  ValidationStatus,
  type ValidationStep,
} from "../../../../api/model"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRight, faCheckToSlot } from "@fortawesome/free-solid-svg-icons"

export default function ResumeSideProject() {
  const navigate = useNavigate()
  const { authData } = useAuth()
  const { t } = useTranslation()
  const { id, projectId } = useParams()
  const resumeId = Number.parseInt(id || "0")
  const { data: resume } = useResumeById(authData.user!.jwtDesc, resumeId)
  const { validationState, mutateValidationState } =
    useSideProjectValidationState()
  const addSideProjectTrigger = useAddSideProject(
    t,
    resumeId,
    authData.user!.jwtDesc,
  )
  const editSideProjectTrigger = useEditSideProject(
    t,
    resumeId,
    authData.user!.jwtDesc,
  )
  const activeStep: ValidationStep | undefined = validationState.steps.find(
    (step) => step.id === validationState.activeStep,
  )

  useEffect(() => {
    if (!projectId || resume instanceof NotFoundResponse) {
      return
    }
    const project = resume.sideProjects.find(
      (item) => item.id === Number.parseInt(projectId, 10),
    )
    if (!project) {
      return
    }
    mutateValidationState({
      project,
      steps: sideProjectEmptyState.steps.map((step) => ({
        ...step,
        status: ValidationStatus.VALID,
      })),
      activeStep: 1,
    })
  }, [projectId, resume, mutateValidationState])

  function setActiveStep(stepId: number) {
    mutateValidationState({
      ...validationState,
      activeStep: stepId,
    })
  }

  async function saveSideProject() {
    const result = projectId
      ? await editSideProjectTrigger.mutateAsync({
          sideProject: validationState.project,
        })
      : await addSideProjectTrigger.mutateAsync({
          sideProject: validationState.project,
        })

    if (result) {
      mutateValidationState(sideProjectEmptyState)
      sessionStorage.removeItem("new_side_project_state")
      navigate("..")
    }
  }

  async function nextStep() {
    if (validationState.activeStep === 4) {
      await saveSideProject()
    } else {
      setActiveStep(validationState.activeStep + 1)
    }
  }

  return (
    <>
      <div className="m-4 h-[70vh] w-full max-w-4xl overflow-auto rounded-xl border border-[var(--border)] bg-[var(--background)] p-4 shadow-sm">
        <div className="flex h-40 items-center justify-center overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)]">
          <Stepper
            steps={validationState.steps}
            orientation={StepperOrientation.HORIZONTAL}
            activeStepId={() => validationState.activeStep}
            setActiveStepId={setActiveStep}
          />
        </div>
        <div className="my-4 flex h-[48vh] flex-1 overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
          {validationState.activeStep === 1 && <SideProjectBusiness />}
          {validationState.activeStep === 2 && <SideProjectTimeframeList />}
          {validationState.activeStep === 3 && <SideProjectSkillsList />}
          {validationState.activeStep === 4 && <SideProjectSummary />}
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
