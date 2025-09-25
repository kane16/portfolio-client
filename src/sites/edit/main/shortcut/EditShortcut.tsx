import { useEffect, type JSX } from "react"
import toast from "react-hot-toast"
import { NotFoundResponse } from "../../../../api/model"
import { Navigate, useParams } from "react-router-dom"
import { useTranslation } from "react-i18next"
import ShortcutForm from "./ShortcutForm"
import { useAuth } from "../../../login/use-auth"
import { CircleLoader } from "react-spinners"
import type { ImageOption } from "../../../../shared/model/image-option"
import {
  useApplicationImages,
  useEditPortfolioById,
  useResumeById,
} from "../../../../api/queries"

export default function EditShortcut(): JSX.Element {
  const { id } = useParams<{ id: string }>()
  const shortcutId = Number.parseInt(id || "0")
  const { t } = useTranslation()
  const { authData } = useAuth()

  const {
    data: images,
    isError: isImagesError,
    isPending: isImagesPending,
  } = useApplicationImages()

  const {
    data: resume,
    isError: isResumeError,
    isPending: isResumePending,
  } = useResumeById(authData.user!.jwtDesc, shortcutId)

  const saveShortcut = useEditPortfolioById(shortcutId, t)

  useEffect(() => {
    if (isImagesError) {
      toast.error(t("editShortcut.failedFetchImages"))
    }
    if (isResumeError) {
      toast.error(t("editShortcut.failedFetchPortfolio"))
    }
  }, [isImagesError, isResumeError, t])

  useEffect(() => {
    if (images !== undefined && images.length === 0) {
      toast.error(t("editShortcut.noImages"))
    }
  }, [images, t])

  if (saveShortcut.isSuccess) {
    return <Navigate to={"/edit"} replace={true} />
  }

  if (isResumePending || isImagesPending) {
    return <CircleLoader size={40} color="white" />
  }

  if (resume instanceof NotFoundResponse || images?.length === 0) {
    return <Navigate to={"/edit"} />
  }
  const resultImages: ImageOption[] = images!
  const chosenImage: ImageOption | undefined = resultImages.find(
    (image) => image.src === resume.imageSource,
  )

  return (
    <ShortcutForm
      images={resultImages}
      saveShortcut={saveShortcut}
      shortcut={{
        title: resume.title,
        summary: resume.summary,
        image: chosenImage!,
      }}
    />
  )
}
