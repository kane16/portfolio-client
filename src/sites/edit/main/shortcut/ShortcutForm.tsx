import { useState, type JSX } from "react"
import ValidatedTextInput from "../../../../shared/ValidatedTextInput"
import { useTranslation } from "react-i18next"
import type { ResumeShortcut } from "../../../../api/model"
import { useAuth } from "../../../login/use-auth"
import type { ImageOption } from "../../../../shared/model/image-option"
import { TextInputType } from "../../../../shared/TextInputType"
import ImageInput from "../../../../shared/ImageInput"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSave } from "@fortawesome/free-solid-svg-icons"
import { CircleLoader } from "react-spinners"
import Button from "../../../../shared/Button"
import type { UseMutationResult } from "@tanstack/react-query"

export default function ShortcutForm({
  shortcut,
  images,
  saveShortcut,
}: {
  shortcut?: ResumeShortcut
  images: ImageOption[]
  saveShortcut: UseMutationResult<
    boolean,
    Error,
    {
      token: string
      portfolio: ResumeShortcut
    },
    unknown
  >
}): JSX.Element {
  const { t } = useTranslation()
  const { authData } = useAuth()
  const [name, setName] = useState(
    `${authData.user?.firstname || ""} ${authData.user?.lastname || ""}`,
  )

  const [nameValid, setNameValid] = useState(true)
  const [title, setTitle] = useState(shortcut?.title || "")
  const [titleValid, setTitleValid] = useState(true)
  const [description, setDescription] = useState(shortcut?.summary || "")
  const [descriptionValid, setDescriptionValid] = useState(true)
  const [image, setImage] = useState<ImageOption | undefined>(shortcut?.image)

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
          min={5}
          max={50}
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
          min={5}
          max={30}
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
          min={30}
          max={100}
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
          images={images || []}
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
