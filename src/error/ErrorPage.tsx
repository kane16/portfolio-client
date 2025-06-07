function ErrorPage({ error }: { error: string }) {
  return (
    <p className="pt-6 text-center text-4xl text-black dark:text-white">
      {error}
    </p>
  )
}

export default ErrorPage
