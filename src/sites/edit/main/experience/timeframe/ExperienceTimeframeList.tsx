

export default function ExperienceTimeframeList() {
  const { authData } = useAuth()
    const { t } = useTranslation()
    const { id } = useParams<{ id: string }>()
    const resumeId = id ? parseInt(id, 10) : null
    const { data: resume } = useResumeById(authData.user!.jwtDesc!, resumeId!)

  return <div>Timeframe Content</div>
}