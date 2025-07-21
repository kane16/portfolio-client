import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

interface ApplicationClickHook {
  applicationClick: boolean
  preventApplicationClick: boolean
}

export function useApplicationClick() {
  const queryClient = useQueryClient()

  const { data: clickHook } = useQuery({
    queryKey: ["applicationClick"],
    queryFn: () => {
      return {
        applicationClick: false,
        preventApplicationClick: true,
      } as ApplicationClickHook
    },
    staleTime: Infinity,
  })

  const setApplicationClick = useMutation({
    mutationFn: async (data: ApplicationClickHook) => {
      return Promise.resolve(data)
    },
    onSuccess: (data: ApplicationClickHook) => {
      queryClient.setQueryData(["applicationClick"], data)
    },
  }).mutate

  return { clickHook, setApplicationClick }
}
