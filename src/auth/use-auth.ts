import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import type { User } from "../api/model"

export interface AuthData {
  isAuthenticated: boolean
  user: User | null
}

export function useAuth() {
  const client = useQueryClient()

  const { data: authData } = useQuery<AuthData>({
    queryKey: ["authData"],
    queryFn: () => {
      return {
        isAuthenticated: false,
        user: null,
      } as AuthData
    },
    initialData: {
      isAuthenticated: false,
      user: null,
    },
    staleTime: Infinity,
  })

  const setAuth = useMutation({
    mutationFn: async (data: AuthData) => {
      return Promise.resolve(data)
    },
    onSuccess: (data: AuthData) => {
      client.setQueryData(["authData"], data)
    },
  }).mutate


  return {authData, setAuth}
}
