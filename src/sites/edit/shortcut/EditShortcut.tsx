import { useEffect, useState, type JSX } from "react"
import ValidatedTextInput from "../../../shared/ValidatedTextInput"
import { TextInputType } from "../../../shared/TextInputType"
import { useAuth } from "../../login/use-auth"
import Button from "../../../shared/Button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSave } from "@fortawesome/free-solid-svg-icons"
import ImageInput from "../../../shared/ImageInput"
import { useMutation, useQuery } from "@tanstack/react-query"
import { getServerImages, initPortfolio } from "../../../api/requests"
import toast from "react-hot-toast"
import type { ImageOption } from "../../../shared/model/image-option"
import type { PortfolioShortcut } from "../../../api/model"
import { CircleLoader } from "react-spinners"
import { Navigate } from "react-router-dom"
import { useTranslation } from "react-i18next"

export default function EditShortcut(): JSX.Element {
  const { authData } = useAuth()
  const { t } = useTranslation()
  const [name, setName] = useState(
    `${authData.user?.firstname || ""} ${authData.user?.lastname || ""}`,
  )
  const [nameValid, setNameValid] = useState(true)
  const [title, setTitle] = useState("")
  const [titleValid, setTitleValid] = useState(true)
  const [description, setDescription] = useState("")
  const [descriptionValid, setDescriptionValid] = useState(true)
  const [image, setImage] = useState<ImageOption | undefined>(undefined)

  const { data, isError } = useQuery({
    queryKey: ["images"],
    queryFn: getServerImages,
    retry: false,
  })
  const saveShortcut = useMutation({
    mutationFn: ({
      token,
      portfolio,
    }: {
      token: string
      portfolio: PortfolioShortcut
    }) => {
      return initPortfolio(token, portfolio)
    },
    onError(error) {
      toast.error(error.message)
    },
    onSuccess: () => {
      toast.success(t("editInit.portfolioInitialized"))
    },
  })

  useEffect(() => {
    if (isError) {
      toast.error(t("editInit.failedFetchImages"))
    }
  }, [isError, t])

  useEffect(() => {
    if (data !== undefined && data.length === 0) {
      toast.error(t("editInit.noImages"))
    }
  }, [data, t])

  function isFormValid(): boolean {
    return nameValid && titleValid && descriptionValid && image !== undefined
  }

  function submit() {
    saveShortcut.mutate({
      token: authData.user!.jwtDesc,
      portfolio: {
        title,
        summary: description,
        image: {
          name: image!.name,
          src: image!.src,
        },
      },
    })
  }

  if (saveShortcut.isSuccess) {
    return <Navigate to={"/edit"} replace={true} />
  }

  return (
    <div className="m-4 grid h-[70vh] w-full max-w-4xl grid-cols-2 grid-rows-7 gap-4 rounded-lg border-2 p-4 dark:border-gray-400 dark:shadow-slate-600">
      <div className="col-span-2 flex items-center justify-center">
        <h1 className="text-3xl font-bold">{t("editInit.initiateResume")}</h1>
      </div>
      <div className="col-start-1 row-start-2 flex justify-center">
        <ValidatedTextInput
          placeholder={t("editInit.enterUserFullName")}
          getInputValue={() => name}
          setInputValue={setName}
          isPassword={false}
          minLength={5}
          maxLength={50}
          isValid={() => nameValid}
          setValid={setNameValid}
          inputType={TextInputType.INPUT}
          inputWidth={80}
          validationMessage={t("editInit.nameValidation")}
        />
      </div>
      <div className="col-start-2 row-start-2 flex justify-center">
        <ValidatedTextInput
          placeholder={t("editInit.enterResumeTitle")}
          getInputValue={() => title}
          setInputValue={setTitle}
          isPassword={false}
          minLength={5}
          maxLength={30}
          isValid={() => titleValid}
          setValid={setTitleValid}
          inputType={TextInputType.INPUT}
          inputWidth={80}
          validationMessage={t("editInit.titleValidation")}
        />
      </div>
      <div className="col-start-1 row-span-3 row-start-3 flex items-start justify-center">
        <ValidatedTextInput
          placeholder={t("editInit.enterResumeDescription")}
          getInputValue={() => description}
          setInputValue={setDescription}
          isPassword={false}
          minLength={30}
          maxLength={100}
          isValid={() => descriptionValid}
          setValid={setDescriptionValid}
          inputType={TextInputType.TEXTAREA}
          inputWidth={80}
          validationMessage={t("editInit.descriptionValidation")}
        />
      </div>
      <div
        className={`col-start-2 row-span-3 row-start-3 flex items-start justify-center`}
      >
        <ImageInput
          getInputValue={() => image}
          setInputValue={setImage}
          images={data || []}
          overrideStyles="w-80 h-48"
        />
      </div>
      <div className="col-start-1 col-end-3 row-start-7 flex justify-center">
        {saveShortcut.isPending ? (
          <CircleLoader size={40} color="white" />
        ) : (
          <Button
            onClick={submit}
            text={t("editInit.saveChanges")}
            disabled={() => !isFormValid()}
            overrideStyles="h-12"
            icon={<FontAwesomeIcon icon={faSave} />}
          />
        )}
      </div>
    </div>
  )
}
