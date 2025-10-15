import Stepper, { StepperOrientation } from "../../../../shared/Stepper"
import ExperienceBusiness from "./business/ExperienceBusiness"
import ExperienceTimeframeList from "./timeframe/ExperienceTimeframeList"
import {
  emptyData,
  useExperienceValidationState,
} from "../../../../app/experience-validation-state-hook"
import ExperienceSkillsList from "./skill/ExperienceSkillsList"
import ExperienceSummary from "./summary/ExperienceSummary"
import {
  useAddExperience,
  useEditExperience,
  useResumeById,
} from "../../../../api/queries"
import { useTranslation } from "react-i18next"
import { useAuth } from "../../../login/use-auth"
import { useNavigate, useParams } from "react-router-dom"
import {
  NotFoundResponse,
  ValidationStatus,
  type ValidationStep,
} from "../../../../api/model"
import { useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRight, faCheckToSlot } from "@fortawesome/free-solid-svg-icons"

export default function ResumeExperience() {
  const navigate = useNavigate()
  const { authData } = useAuth()
  const { id, experienceId } = useParams()
  const resumeId = Number.parseInt(id || "0")
  const { data: resume } = useResumeById(authData.user!.jwtDesc, resumeId)
  const { t } = useTranslation()
  const { validationState, mutateValidationState } =
    useExperienceValidationState()
  const activeStep: ValidationStep | undefined = validationState.steps.find(
    (s) => s.id === validationState.activeStep,
  )
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

  useEffect(() => {
    if (experienceId) {
      if (resume instanceof NotFoundResponse) {
        return
      }
      console.log(experienceId)
      mutateValidationState({
        experience: resume.workHistory.find(
          (exp) => exp.id === Number.parseInt(experienceId, 0),
        )!,
        steps: validationState.steps.map((step) => ({
          ...step,
          status: ValidationStatus.VALID,
        })),
        activeStep: 1,
      })
    }
  }, [experienceId])

  function setActiveStep(stepId: number) {
    const newState = {
      ...validationState,
      activeStep: stepId,
    }
    mutateValidationState(newState)
  }

  async function saveExperience() {
    const result = experienceId
      ? await editExperienceTrigger.mutateAsync({
          experience: validationState.experience,
        })
      : await addExperienceTrigger.mutateAsync({
          experience: validationState.experience,
        })
    if (result) {
      mutateValidationState(emptyData)
      sessionStorage.removeItem("new_experience_state")
      navigate("..")
    }
  }

  async function nextStep() {
    if (validationState.activeStep === 4) {
      await saveExperience()
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
          {validationState.activeStep === 1 && <ExperienceBusiness />}
          {validationState.activeStep === 2 && <ExperienceTimeframeList />}
          {validationState.activeStep === 3 && <ExperienceSkillsList />}
          {validationState.activeStep === 4 && <ExperienceSummary />}
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
