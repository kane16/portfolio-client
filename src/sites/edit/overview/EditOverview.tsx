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
import { useState } from "react"
import Button from "../../../shared/Button"
import { useHistory, usePublishResume, useUnpublishResume } from "../../../api/queries"

export default function EditOverview() {
  const { authData } = useAuth()
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [selectedResumeVersion, setSelectedResumeId] =
    useState<ResumeVersion | null>(null)
  const { data, isPending, isFetching } = useHistory(authData.user!.jwtDesc)

  const unpublish = useUnpublishResume(t)
  const publish = usePublishResume(t)

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

  function unpublishResume(): void {
    unpublish.mutate({
      token: authData.user!.jwtDesc,
    })
    setSelectedResumeId(null)
  }

  function publishResumeWithVersion(versionId: number): void {
    publish.mutate({
      token: authData.user!.jwtDesc,
      versionId,
    })
    setSelectedResumeId(null)
  }

  function anyResumePublished(): boolean {
    return resumeHistory.defaultPortfolio !== null
  }

  return (
    <div className="mt-4 flex h-full w-full max-w-3xl flex-col items-center justify-between border-2 border-gray-500 p-6">
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
            <Button
              text={t("editOverview.editResume")}
              onClick={() => navigate(`/edit/${selectedResumeVersion.id}`)}
            />
            {selectedResumeVersion.state !== "PUBLISHED" ? (
              <>
                <Button
                  text={t("editOverview.deleteResume")}
                  onClick={() =>
                    console.log(
                      `Deleting resume with ID ${selectedResumeVersion.id}`,
                    )
                  }
                />
                <Button
                  text={t("editOverview.publishResume")}
                  onClick={() =>
                    publishResumeWithVersion(selectedResumeVersion.version)
                  }
                />
              </>
            ) : (
              <Button
                text={t("editOverview.unpublishResume")}
                onClick={unpublishResume}
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
                onClick={unpublishResume}
              />
            )}
          </>
        )}
      </div>
    </div>
  )
}
