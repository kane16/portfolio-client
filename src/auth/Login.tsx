import { Navigate } from "react-router-dom"
import { useAuth } from "./use-auth"
import TextInput from "../shared/TextInput"
import { useEffect, useState } from "react"
import { CircleLoader } from "react-spinners"
import Button from "../shared/Button"
import { useMutation } from "@tanstack/react-query"
import type { User } from "../api/model"
import { fetchUserByLoginData } from "../api/requests"
import toast from "react-hot-toast"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons"

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

  useEffect(() => {
    if (login.isError) {
      toast.error(
        login.error instanceof Error ? login.error.message : "Login failed",
        { position: "bottom-center" },
      )
    }
  }, [login.isError])

  if (authData.isAuthenticated) {
    return <Navigate to={"/edit"} replace={true} />
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
    return <Navigate to={"/edit"} replace={true} />
  }

  function isDisabled(): boolean {
    return loginUser.username === "" || loginUser.password === ""
  }

  function loginIfEnter(event: React.KeyboardEvent<HTMLDivElement>): void {
    if (event.key === "Enter") {
      if (!isDisabled()) {
        login.mutate(loginUser)
      } else {
        toast.error("Please fill in both fields", { position: "bottom-center" })
      }
    }
  }

  return (
    <div
      className="flex min-h-[85vh] flex-col items-center justify-center p-4"
      onKeyDownCapture={loginIfEnter}
    >
      <div className="grid min-h-[65vh] w-full max-w-xl grid-rows-6 rounded-lg bg-neutral-600 text-center dark:bg-neutral-900 lg:p-4">
        <div className="row-span-2 row-start-1 flex w-full justify-center self-center">
          <img
            className="w-24"
            src="/resources/images/delukesoft.jpg"
            alt="company-img"
          />
        </div>
        <div className="row-start-4">
          <TextInput
            setInputValue={(username) =>
              setLoginUser({ ...loginUser, username })
            }
            getInputValue={() => loginUser.username}
            placeholder={`Provide username`}
            isPassword={false}
          />
        </div>
        <div className="row-start-5">
          <TextInput
            setInputValue={(password) =>
              setLoginUser({ ...loginUser, password })
            }
            getInputValue={() => loginUser.password}
            placeholder={`Provide password`}
            isPassword={true}
          />
        </div>
        <div className="row-start-6 flex justify-center self-center">
          <Button
            icon={<FontAwesomeIcon icon={faRightToBracket} />}
            disabled={isDisabled()}
            onClick={() => login.mutate(loginUser)}
            text={`Sign in`}
          />
        </div>
      </div>
    </div>
  )
}
