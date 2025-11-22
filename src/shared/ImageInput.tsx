import Dropdown from "./Dropdown"
import type { ImageOption } from "./model/image-option"
import { useTranslation } from "react-i18next"

export default function ImageInput({
  setInputValue,
  getInputValue,
  images,
  overrideStyles = "",
}: {
  setInputValue: (value: ImageOption | undefined) => void
  getInputValue: () => ImageOption | undefined
  images: ImageOption[]
  inputWidth?: number
  overrideStyles?: string
}) {
  const { t } = useTranslation()
  return (
    <div className={`flex flex-col items-center gap-4 ${overrideStyles}`}>
      <Dropdown
        disabled={images.length === 0}
        name={t("image.label")}
        options={images}
        onSelected={(value) => setInputValue(value)}
        currentValue={getInputValue()}
      />
      <div>
        {getInputValue() ? (
          <img
            className={`rounded-md object-scale-down ${overrideStyles}`}
            src={getInputValue()?.src}
            alt={getInputValue()?.name}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  )
}
