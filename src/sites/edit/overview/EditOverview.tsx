import { useAuth } from "../../login/use-auth"
import { CircleLoader } from "react-spinners"
import { Navigate, useNavigate } from "react-router-dom"
import {
  NotFoundResponse,
  type ResumeHistory,
  type ResumeVersion,
} from "../../../api/model"
import ResumeEditHeadline from "./ResumeEditHeadline"
import { useTranslation } from "react-i18next"
import { useState, type JSX } from "react"
import Button from "../../../shared/Button"
import { useHistory, useUnpublishResume } from "../../../api/queries"

export default function EditOverview(): JSX.Element {
  const { token } = useAuth()
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [selectedResumeVersion, setSelectedResumeId] =
    useState<ResumeVersion | null>(null)
  const { data, isPending, isFetching } = useHistory(token!)

  const unpublish = useUnpublishResume(t)

  if (isPending || isFetching) {
    return <CircleLoader size={60} color="white" />
  }

  if (data instanceof NotFoundResponse) {
    return <Navigate to={"/edit/init"} />
  }

  const resumeHistory: ResumeHistory = data!

  function selectResumeVersion(version: ResumeVersion): void {
    if (selectedResumeVersion?.id === version.id) {
      setSelectedResumeId(null)
    } else {
      setSelectedResumeId(version)
    }
  }

  async function unpublishSelectedResume() {
    await unpublish.mutate({
      token: token!,
    })
    setSelectedResumeId(null)
  }

  function anyResumePublished(): boolean {
    return resumeHistory.defaultPortfolio !== null
  }

  return (
    <div className="mt-4 flex h-full w-full max-w-3xl flex-col items-center justify-between rounded-xl border border-[var(--border)] bg-[var(--background)] p-6 shadow-sm">
      <div className="text-3xl">{t("editOverview.portfolioOverview")}</div>
      <div className="flex flex-col gap-6">
        {resumeHistory.history.map((version) => (
          <ResumeEditHeadline
            key={version.id}
            resumeVersion={version}
            selectResume={selectResumeVersion}
            isSelected={() => selectedResumeVersion?.id === version.id}
          />
        ))}
      </div>
      <div className="flex h-24 items-center justify-center gap-4">
        {selectedResumeVersion !== null ? (
          <>
            {selectedResumeVersion.state !== "PUBLISHED" ? (
              <>
                <Button
                  text={t("editOverview.editResume")}
                  onClick={() => navigate(`/edit/${selectedResumeVersion.id}`)}
                />
                <Button
                  text={t("editOverview.deleteResume")}
                  onClick={() =>
                    console.log(
                      `Deleting resume with ID ${selectedResumeVersion.id}`,
                    )
                  }
                />
              </>
            ) : (
              <Button
                text={t("editOverview.unpublishResume")}
                onClick={unpublishSelectedResume}
              />
            )}
          </>
        ) : (
          <>
            <Button
              text={t("editOverview.initiateNewResume")}
              onClick={() => navigate("/edit/init")}
            />
            {anyResumePublished() && (
              <Button
                text={t("editOverview.unpublishResume")}
                onClick={unpublishSelectedResume}
              />
            )}
          </>
        )}
      </div>
    </div>
  )
}
