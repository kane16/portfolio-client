import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import type { User } from "../../api/auth"

export interface AuthData {
  isAuthenticated: boolean
  user: User | null
  token: string | null
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
        token: sessionStorage.getItem("token") || null,
      } as AuthData
    },
    initialData: {
      isAuthenticated:
        sessionStorage.getItem("user") !== null &&
        sessionStorage.getItem("token") !== null,
      user: sessionStorage.getItem("user")
        ? (JSON.parse(sessionStorage.getItem("user")!) as User)
        : null,
      token: sessionStorage.getItem("token") || null,
    },
  })

  const setAuth = useMutation({
    mutationFn: async (data: AuthData) => {
      return Promise.resolve(data)
    },
    onSuccess: (data: AuthData) => {
      if (!data.isAuthenticated) {
        sessionStorage.removeItem("user")
        sessionStorage.removeItem("token")
      }
      client.setQueryData(["authData"], data)
    },
  }).mutate

  return {
    setAuth,
    user: authData.user,
    token: authData.token,
    isAuthenticated: authData.isAuthenticated,
  }
}
