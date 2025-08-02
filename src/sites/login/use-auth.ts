import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import type { User } from "../../api/model"

export interface AuthData {
  isAuthenticated: boolean
  user: User | null
}

export function useAuth() {
  const client = useQueryClient()

  const { data: authData } = useQuery<AuthData>({
    queryKey: ["authData"],
    queryFn: () => {
      const user = sessionStorage.getItem("user")

      return {
        isAuthenticated: user !== null,
        user: user ? (JSON.parse(user) as User) : null,
      } as AuthData
    },
    initialData: {
      isAuthenticated: false,
      user: null,
    },
  })

  const setAuth = useMutation({
    mutationFn: async (data: AuthData) => {
      return Promise.resolve(data)
    },
    onSuccess: (data: AuthData) => {
      if (!data.isAuthenticated) {
        sessionStorage.removeItem("user")
      }
      client.setQueryData(["authData"], data)
    },
  }).mutate

  return { authData, setAuth }
}
