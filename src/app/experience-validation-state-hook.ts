import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import {
  ValidationStatus,
  type Experience,
  type ValidationStep,
} from "../api/model"
import superjson from "superjson"

export interface ExperienceValidationState {
  experience: Experience
  steps: ValidationStep[]
  activeStep: number
}

export const emptyData = {
  experience: {
    position: "",
    business: "",
    summary: "",
    description: "",
    skills: [],
  },
  steps: [
    {
      id: 1,
      name: "Business",
      status: ValidationStatus.NOT_VALIDATED,
      messages: [],
      endpoint: "business",
    },
    {
      id: 2,
      name: "Timeframe",
      status: ValidationStatus.NOT_VALIDATED,
      messages: [],
      endpoint: "timeframe",
    },
    {
      id: 3,
      name: "Skills",
      status: ValidationStatus.NOT_VALIDATED,
      messages: [],
      endpoint: "skillexperience",
    },
    {
      id: 4,
      name: "Summary",
      status: ValidationStatus.NOT_VALIDATED,
      messages: [],
      endpoint: "summary",
    },
  ],
  activeStep: 1,
}

const initialState: ExperienceValidationState = sessionStorage.getItem(
  "new_experience_state",
)
  ? superjson.parse(sessionStorage.getItem("new_experience_state")!)
  : emptyData

export function useExperienceValidationState() {
  const queryClient = useQueryClient()

  const { data: validationState } = useQuery<ExperienceValidationState>({
    queryKey: ["experienceValidation"],
    initialData: initialState,
    queryFn: () => {
      return initialState
    },
    staleTime: Infinity,
  })

  const mutateValidationState = useMutation({
    mutationFn: async (data: ExperienceValidationState) => {
      return Promise.resolve(data)
    },
    onSuccess: (data: ExperienceValidationState) => {
      queryClient.setQueryData(["experienceValidation"], data)
      sessionStorage.setItem("new_experience_state", superjson.stringify(data))
    },
  }).mutate

  return {
    validationState,
    mutateValidationState,
  }
}
