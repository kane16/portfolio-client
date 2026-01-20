import { useEffect, type JSX } from "react"
import ShortcutForm from "./ShortcutForm"
import { Navigate } from "react-router-dom"
import { toast } from "react-hot-toast"
import { useTranslation } from "react-i18next"
import { useApplicationImages } from "../../../../api/images"
import { useInitShortcut } from "../../../../api/portfolio"

export default function CreateShortcut(): JSX.Element {
  const { t } = useTranslation()

  const { data: images, isError } = useApplicationImages()
  const saveShortcut = useInitShortcut(t)

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

  return <ShortcutForm images={images} saveShortcut={saveShortcut} />
}
