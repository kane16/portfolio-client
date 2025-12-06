import {
  useCallback,
  useState,
  type DragEvent,
  type KeyboardEvent,
  type JSX,
} from "react"
import { useTranslation } from "react-i18next"
import Button from "../../shared/Button"
import toast from "react-hot-toast"
import { useUploadImage } from "../../api/queries"
import { useAuth } from "../login/use-auth"

export default function UploadImage(): JSX.Element {
  const { authData } = useAuth()
  const { t } = useTranslation()
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [imageName, setImageName] = useState<string>("")
  const [isDragging, setIsDragging] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const uploadImageMutation = useUploadImage(t, authData!.user!.jwtDesc)

  const handleFile = useCallback(
    (file?: File | null) => {
      if (!file) {
        return
      }
      if (!file.type.startsWith("image/")) {
        toast.error(t("uploadImage.invalidType"))
        return
      }

      setSelectedFile(file)
    },
    [t],
  )

  const handleFiles = useCallback(
    (files: FileList | null) => {
      if (!files || files.length === 0) {
        return
      }
      handleFile(files[0])
    },
    [handleFile],
  )

  const onDrop = useCallback(
    (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault()
      setIsDragging(false)
      handleFiles(event.dataTransfer.files)
    },
    [handleFiles],
  )

  const onDragOver = useCallback(
    (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault()
      if (!isDragging) {
        setIsDragging(true)
      }
    },
    [isDragging],
  )

  const onDragLeave = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDragging(false)
  }, [])

  const openFilePicker = useCallback(() => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = "image/*"
    input.onchange = (event: Event) => {
      const target = event.target as HTMLInputElement | null
      handleFiles(target?.files ?? null)
    }
    input.click()
  }, [handleFiles])

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault()
        openFilePicker()
      }
    },
    [openFilePicker],
  )

  function isFormFilled(): boolean {
    return !!selectedFile && imageName.trim().length > 0
  }

  const isActive = isDragging || isHovering

  function clearForm() {
    setSelectedFile(null)
    setImageName("")
  }

  async function uploadImage(): Promise<void> {
    if (!selectedFile) {
      return
    }

    try {
      await uploadImageMutation.mutateAsync({
        filename: imageName,
        image: selectedFile,
      })
      clearForm()
    } catch {
      toast.error(t("uploadImage.error"))
    }
  }

  return (
    <div className="m-4 h-[70vh] w-full max-w-4xl overflow-auto rounded-xl border border-[var(--border)] bg-[var(--background)] p-4 shadow-sm">
      <div className="flex h-full flex-col items-center justify-between gap-6 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6">
        <div className="flex w-full max-w-md flex-col gap-2">
          <h1 className="text-2xl font-semibold text-[var(--foreground)]">
            {t("uploadImage.title")}
          </h1>
          <p className="text-sm text-[var(--foreground-muted)]">
            {t("uploadImage.subtitle")}
          </p>
        </div>

        <div className="flex w-full justify-center">
          <div className="flex w-full max-w-md flex-col gap-2">
            <label className="text-sm font-medium text-[var(--foreground)]">
              {t("uploadImage.imageNameLabel", "Image name")}
            </label>
            <input
              type="text"
              value={imageName}
              onChange={(event) => setImageName(event.target.value)}
              placeholder={t(
                "uploadImage.imageNamePlaceholder",
                "My awesome image",
              )}
              className="w-full rounded-md border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-[var(--foreground)] shadow-sm focus:border-[var(--foreground-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--foreground-muted)]"
            />
          </div>
        </div>

        {!selectedFile ? (
          <div
            className={[
              "flex h-64 w-full cursor-pointer flex-col items-center justify-center gap-3 rounded-lg border-2 px-6 text-center transition-all duration-300 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--foreground-muted)]",
              isActive
                ? "border-[var(--foreground-muted)] bg-[var(--background-alt)] shadow-[0_18px_32px_-24px_rgba(17,17,17,0.45)]"
                : "border-dashed border-[var(--border)] bg-[var(--surface)]",
            ].join(" ")}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            role="button"
            tabIndex={0}
            onClick={openFilePicker}
            onKeyDown={handleKeyDown}
          >
            <div className="flex flex-col items-center gap-2">
              <span className="text-base font-medium text-[var(--foreground)]">
                {t("uploadImage.dropLabel")}
              </span>
              <span className="text-xs text-[var(--foreground-muted)]">
                {t("uploadImage.supportedFormats")}
              </span>
            </div>
          </div>
        ) : (
          <div
            className={[
              "flex w-full cursor-pointer flex-col gap-4 overflow-hidden rounded-lg border-2 bg-[var(--surface)] p-4 text-left transition-all duration-300 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--foreground-muted)]",
              "min-h-[16rem]",
              isActive
                ? "border-[var(--foreground-muted)] bg-[var(--background-alt)] shadow-[0_18px_32px_-24px_rgba(17,17,17,0.45)]"
                : "border-[var(--border)]",
            ].join(" ")}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            role="button"
            tabIndex={0}
            onClick={openFilePicker}
            onKeyDown={handleKeyDown}
          >
            <div className="flex flex-col gap-2">
              <h2 className="text-lg font-semibold text-[var(--foreground)]">
                {t("uploadImage.previewTitle")}
              </h2>
              <p className="text-xs text-[var(--foreground-muted)]">
                {t("uploadImage.fileName", { name: selectedFile.name })}
              </p>
            </div>
            <div className="flex flex-1 items-center justify-center overflow-hidden rounded-lg bg-[var(--background)]">
              <img
                src={URL.createObjectURL(selectedFile)}
                alt={selectedFile.name ?? t("uploadImage.previewTitle")}
                className="max-h-80 w-full object-contain"
              />
            </div>
            <p className="text-xs text-[var(--foreground-muted)]">
              {t("uploadImage.replaceLabel")}
            </p>
          </div>
        )}
        <Button
          text={t("uploadImage.uploadButton")}
          onClick={uploadImage}
          disabled={() => !isFormFilled()}
        />
      </div>
    </div>
  )
}
