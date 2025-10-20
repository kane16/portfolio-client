import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import {
  ValidationStatus,
  type Project,
  type ValidationStep,
} from "../api/model"
import superjson from "superjson"

export interface SideProjectValidationState {
  project: Project
  steps: ValidationStep[]
  activeStep: number
}

export const sideProjectEmptyState: SideProjectValidationState = {
  project: {
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
      endpoint: "skills",
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

const initialState: SideProjectValidationState = sessionStorage.getItem(
  "new_side_project_state",
)
  ? superjson.parse(sessionStorage.getItem("new_side_project_state")!)
  : sideProjectEmptyState

export function useSideProjectValidationState() {
  const queryClient = useQueryClient()

  const { data: validationState } = useQuery<SideProjectValidationState>({
    queryKey: ["sideProjectValidation"],
    initialData: initialState,
    queryFn: () => {
      return initialState
    },
    staleTime: Infinity,
  })

  const mutateValidationState = useMutation({
    mutationFn: async (data: SideProjectValidationState) => {
      return Promise.resolve(data)
    },
    onSuccess: (data: SideProjectValidationState) => {
      queryClient.setQueryData(["sideProjectValidation"], data)
      sessionStorage.setItem(
        "new_side_project_state",
        superjson.stringify(data),
      )
    },
  }).mutate

  return {
    validationState,
    mutateValidationState,
  }
}
