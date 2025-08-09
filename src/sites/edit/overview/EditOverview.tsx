import { useQuery } from "@tanstack/react-query"
import { useAuth } from "../../login/use-auth"
import { getHistory } from "../../../api/requests"
import { CircleLoader } from "react-spinners"
import { Navigate } from "react-router-dom"
import {
  NotFoundResponse,
  type ResumeHistory,
  type ResumeVersion,
} from "../../../api/model"
import ResumeEditHeadline from "./ResumeEditHeadline"
import { useTranslation } from "react-i18next"
import { useState } from "react"
import Button from "../../../shared/Button"

export default function EditOverview() {
  const { authData } = useAuth()
  const { t } = useTranslation()
  const [selectedResumeVersion, setSelectedResumeId] =
    useState<ResumeVersion | null>(null)
  const { data, isPending, isFetching } = useQuery({
    queryKey: ["portfolioHistory"],
    queryFn: () => getHistory(authData.user?.jwtDesc || ""),
    throwOnError: true,
  })

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

  return (
    <div className="mt-4 flex h-full w-full max-w-3xl flex-col items-center justify-between border-2 border-gray-500 p-6">
      <div className="text-3xl">{t("editOverview.portfolioOverview")}</div>
      <div>
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
              onClick={() =>
                console.log(`Editing resume with ID: ${selectedResumeVersion}`)
              }
              disabled={false}
            />
            {selectedResumeVersion.state !== "PUBLISHED" ? (
              <Button
                text={t("editOverview.deleteResume")}
                onClick={() =>
                  console.log(
                    `Deleting resume with ID ${selectedResumeVersion.id}`,
                  )
                }
              />
            ) : (
              <Button
                text={t("editOverview.unpublishResume")}
                onClick={() =>
                  console.log(
                    `Unpublishing resume with ID: ${selectedResumeVersion.id}`,
                  )
                }
              />
            )}
          </>
        ) : (
          <Button
            text={t("editOverview.initiateNewResume")}
            onClick={() =>
              console.log(
                `Create resume`,
              )
            }
          />
        )}
      </div>
    </div>
  )
}
