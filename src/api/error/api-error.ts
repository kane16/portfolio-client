export async function apiError(
  response: Response,
  fallback: string,
): Promise<Error> {
  const result = await response
  if (result.status >= 500) {
    return new Error(fallback)
  }
  const data: { error?: string } = await result.json()
  const message = data?.error || response.statusText || fallback
  return new Error(message)
}
