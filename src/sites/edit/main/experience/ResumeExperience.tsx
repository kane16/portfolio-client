import Stepper, { StepperOrientation } from "../../../../shared/Stepper"
import ExperienceBusiness from "./business/ExperienceBusiness"
import ExperienceTimeframeList from "./timeframe/ExperienceTimeframeList"
import { useExperienceValidationState } from "../../../../app/experience-validation-state-hook"
import ExperienceSkillsList from "./skill/ExperienceSkillsList"
import ExperienceSummary from "./summary/ExperienceSummary"
import { useSaveExperience } from "../../../../api/queries"
import { useTranslation } from "react-i18next"
import { useAuth } from "../../../login/use-auth"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-hot-toast"

export default function ResumeExperience() {
  const navigate = useNavigate()
  const { authData } = useAuth()
  const { id } = useParams()
  const resumeId = Number.parseInt(id || "0")
  const { t } = useTranslation()
  const { validationState, mutateValidationState } =
    useExperienceValidationState()
  const saveExperienceTrigger = useSaveExperience(
    t,
    resumeId,
    authData.user!.jwtDesc,
  )

  function setActiveStep(stepId: number) {
    const newState = {
      ...validationState,
      activeStep: stepId,
    }
    mutateValidationState(newState)
  }

  async function saveExperience() {
    const result = await saveExperienceTrigger.mutateAsync({
      experience: validationState.experience,
    })
    if (result) {
      toast.success(t("experience.saveSuccess"))
    } else {
      toast.error(t("experience.saveError"))
    }
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
        {validationState.activeStep === 4 && (
          <ExperienceSummary nextStep={saveExperience} />
        )}
      </div>
    </div>
  )
}
