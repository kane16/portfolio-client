import { useEffect, type JSX } from "react"
import ShortcutForm from "./ShortcutForm"
import { Navigate } from "react-router-dom"
import { toast } from "react-hot-toast"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useTranslation } from "react-i18next"
import { getServerImages, initPortfolio } from "../../../api/requests"
import type { ResumeShortcut } from "../../../api/model"

export default function CreateShortcut(): JSX.Element {
  const { t } = useTranslation()

  const { data: images, isError } = useQuery({
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
      portfolio: ResumeShortcut
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
    if (images !== undefined && images.length === 0) {
      toast.error(t("editInit.noImages"))
    }
  }, [images, t])

  if (saveShortcut.isSuccess) {
    return <Navigate to={"/edit"} replace={true} />
  }

  return <ShortcutForm images={images || []} saveShortcut={saveShortcut} />
}
