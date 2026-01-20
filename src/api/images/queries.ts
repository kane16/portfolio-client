import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query"
import { toast } from "react-hot-toast"
import type { TFunction } from "i18next"
import { getServerImages, uploadImage } from "./requests"

export function useApplicationImages() {
  return useSuspenseQuery({
    queryKey: ["images"],
    queryFn: getServerImages,
    retry: false,
  })
}

export function useUploadImage(
  t: TFunction<"translation", undefined>,
  token: string,
) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({
      filename,
      image,
    }: {
      filename: string
      image: File
    }) => {
      return uploadImage(token, filename, image)
    },
    onError(error) {
      toast.error(error.message)
    },
    onSuccess: () => {
      toast.success(t("uploadImage.imageUploaded"))
      queryClient.invalidateQueries({ queryKey: ["images"] })
    },
  })
}
