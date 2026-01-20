import { useMutation } from "@tanstack/react-query"
import type { LoginUser } from "../../features/login/Login"
import { fetchUserByLoginData } from "./requests"

export function useLogin() {
  return useMutation({
    mutationFn: (loginUser: LoginUser) => {
      return fetchUserByLoginData(loginUser)
    },
  })
}
