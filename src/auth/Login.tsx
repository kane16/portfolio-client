import { Navigate } from "react-router-dom"
import { useAuth } from "./use-auth"
import TextInput from "../shared/TextInput"
import { useState } from "react"
import { CircleLoader } from "react-spinners"
import Button from "../shared/Button"
import { useMutation } from "@tanstack/react-query"
import type { User } from "../api/model"
import { fetchUserByLoginData } from "../api/requests"
import toast from "react-hot-toast"

export interface LoginUser {
  username: string
  password: string
}

export default function Login() {
  const { authData, setAuth } = useAuth()
  const login = useMutation({
    mutationFn: (loginUser: LoginUser) => {
      return fetchUserByLoginData(loginUser)
    },
  })
  const [loginUser, setLoginUser] = useState<LoginUser>({
    username: "",
    password: "",
  })

  if (authData.isAuthenticated) {
    return <Navigate to={"/"} replace={true} />
  }

  if (login.isPending) {
    return <CircleLoader size={60} color="white" />
  }

  if (login.isSuccess) {
    const user = login.data as User
    setAuth({
      isAuthenticated: true,
      user,
    })
    return <Navigate to={"/"} replace={true} />
  }

  if (login.isError) {
    toast.error(
      login.error instanceof Error ? login.error.message : "Login failed",
      { position: "bottom-center" },
    )
  }

  return (
    <div className="flex flex-col items-center">
      <div className="grid min-h-[86vh] w-full max-w-xl grid-rows-6 rounded-lg bg-slate-600 text-center dark:bg-slate-900 lg:p-4">
        <div className="row-span-2 row-start-1 flex w-full justify-center self-center">
          <img
            className="w-24"
            src="/resources/images/delukesoft.jpg"
            alt="company-img"
          />
        </div>
        <TextInput
          setInputValue={(username) => setLoginUser({ ...loginUser, username })}
          getInputValue={() => loginUser.username}
          placeholder={`Provide username`}
          isPassword={false}
          style="row-start-3 pt-8"
        />
        <TextInput
          setInputValue={(password) => setLoginUser({ ...loginUser, password })}
          getInputValue={() => loginUser.password}
          placeholder={`Provide password`}
          isPassword={true}
          style="row-start-4"
        />
        <div className="row-start-5 flex justify-center self-center">
          <Button
            disabled={!loginUser.username || !loginUser.password}
            onClick={() => login.mutate(loginUser)}
            text={`Sign in`}
          />
        </div>
      </div>
    </div>
  )
}
