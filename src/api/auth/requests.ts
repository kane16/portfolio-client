import type { LoginUser } from "../../features/login/Login"
import { apiError } from "../error"
import type { User } from "./model"

export const fetchUserByLoginData = async (
  loginUser: LoginUser,
): Promise<User> => {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(loginUser),
  })
  if (response.status !== 200) {
    throw await apiError(response, "Failed to login")
  }
  const data: User = await response.json()
  const contextUser: User = await fetchContextUserByToken(data.jwtDesc)
  sessionStorage.setItem("user", JSON.stringify(contextUser))
  sessionStorage.setItem("token", data.jwtDesc)
  return contextUser
}

export const fetchContextUserByToken = async (token: string): Promise<User> => {
  const response = await fetch("/api/auth/users/contextUser", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  if (response.status !== 200) {
    throw await apiError(response, "Failed to fetch context user")
  }
  const data: User = await response.json()
  return data
}

export const createUser = async (token: string, user: User): Promise<User> => {
  const response = await fetch("/api/auth/users", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
  if (response.status !== 201) {
    throw await apiError(response, "Failed to create user")
  }
  const data: User = await response.json()
  return data
}
