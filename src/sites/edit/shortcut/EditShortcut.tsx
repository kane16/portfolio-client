import { useEffect, type JSX } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import {
  editPortfolio,
  getResumeById,
  getServerImages,
} from "../../../api/requests"
import toast from "react-hot-toast"
import {
  NotFoundResponse,
  type Resume,
  type ResumeShortcut,
} from "../../../api/model"
import { Navigate, useParams } from "react-router-dom"
import { useTranslation } from "react-i18next"
import ShortcutForm from "./ShortcutForm"
import { useAuth } from "../../login/use-auth"
import { CircleLoader } from "react-spinners"
import type { ImageOption } from "../../../shared/model/image-option"

export default function EditShortcut(): JSX.Element {
  const { id } = useParams<{ id: string }>()
  const shortcutId = Number.parseInt(id || "0")
  const { t } = useTranslation()
  const { authData } = useAuth()
  const queryClient = useQueryClient()

  const {
    data: images,
    isError: isImagesError,
    isPending: isImagesPending,
  } = useQuery({
    queryKey: ["images"],
    queryFn: getServerImages,
    retry: false,
  })
  const {
    data: resume,
    isError: isResumeError,
    isPending: isResumePending,
  } = useQuery({
    queryKey: ["resume", id],
    queryFn: () => getResumeById(authData.user!.jwtDesc, shortcutId),
    retry: false,
  })

  const saveShortcut = useMutation({
    mutationFn: ({
      token,
      portfolio,
    }: {
      token: string
      portfolio: ResumeShortcut
    }) => {
      return editPortfolio(token, portfolio, shortcutId)
    },
    onError(error) {
      toast.error(error.message)
    },
    onSuccess: () => {
      toast.success(t("editShortcut.resumeUpdated"))
      queryClient.refetchQueries({ queryKey: ["resume", id] })
    },
  })

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
  const resumeResult: Resume = resume!
  const resultImages: ImageOption[] = images!
  const chosenImage: ImageOption | undefined = resultImages.find(
    (image) => image.src === resumeResult.imageSource,
  )

  return (
    <ShortcutForm
      images={resultImages}
      saveShortcut={saveShortcut}
      shortcut={{
        title: resumeResult.title,
        summary: resumeResult.summary,
        image: chosenImage!,
      }}
    />
  )
}
