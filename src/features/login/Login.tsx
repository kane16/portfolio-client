import { Navigate } from "react-router-dom"
import { useAuth } from "./use-auth"
import TextInput from "../../shared/TextInput"
import { DataInputType } from "../../shared/DataInputType"
import { useEffect, useState } from "react"
import { CircleLoader } from "react-spinners"
import Button from "../../shared/Button"
import { type User, useLogin } from "../../api/auth"
import toast from "react-hot-toast"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons"
import { useTranslation } from "react-i18next"

export interface LoginUser {
  username: string
  password: string
}

export default function Login() {
  const { isAuthenticated, setAuth } = useAuth()
  const { t } = useTranslation()
  const login = useLogin()
  const [loginUser, setLoginUser] = useState<LoginUser>({
    username: "",
    password: "",
  })

  useEffect(() => {
    if (login.isError) {
      toast.error(
        login.error instanceof Error
          ? login.error.message
          : t("login.loginFailed"),
        { position: "bottom-center" },
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [login.isError, t])

  if (isAuthenticated) {
    return <Navigate to={"/edit"} replace={true} />
  }

  if (login.isSuccess) {
    const user = login.data as User
    setAuth({
      isAuthenticated: true,
      user,
      token: user.jwtDesc,
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
        toast.error(t("login.fillFields"), { position: "bottom-center" })
      }
    }
  }

  return (
    <div
      onKeyDownCapture={loginIfEnter}
      className="grid min-h-[500pt] w-full min-w-[300pt] max-w-[350pt] grid-rows-7 rounded-lg bg-neutral-600 text-center dark:bg-neutral-900"
    >
      <div className="row-span-2 row-start-1 flex w-full justify-center self-center">
        <img
          className="w-24"
          src="/resources/images/delukesoft.jpg"
          alt="company-img"
        />
      </div>
      <div className="row-start-4 flex justify-center">
        <TextInput
          setInputValue={(username) => setLoginUser({ ...loginUser, username })}
          value={loginUser.username}
          placeholder={t("login.usernamePlaceholder")}
          isPassword={false}
          type={DataInputType.TEXT}
        />
      </div>
      <div className="row-start-5 flex justify-center">
        <TextInput
          setInputValue={(password) => setLoginUser({ ...loginUser, password })}
          value={loginUser.password}
          placeholder={t("login.passwordPlaceholder")}
          isPassword={true}
          type={DataInputType.TEXT}
        />
      </div>
      <div className="row-start-7 flex justify-center self-center">
        {login.isPending ? (
          <CircleLoader size={40} color="white" />
        ) : (
          <Button
            icon={<FontAwesomeIcon icon={faRightToBracket} />}
            disabled={isDisabled}
            onClick={() => login.mutate(loginUser)}
            text={t("login.signIn")}
          />
        )}
      </div>
    </div>
  )
}
