import { useState } from "react"
import { Navigate, useParams } from "react-router-dom"
import {
  useDeleteHobbyFromResume,
  useResumeById,
} from "../../../../../api/queries"
import { useAuth } from "../../../../login/use-auth"
import { NotFoundResponse } from "../../../../../api/model"
import { useTranslation } from "react-i18next"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAdd } from "@fortawesome/free-solid-svg-icons"
import HobbyRow from "./HobbyRow"
import HobbyDialog from "./HobbyDialog"

export default function HobbyList() {
  const { id } = useParams<{ id: string }>()
  const { authData } = useAuth()
  const { t } = useTranslation()
  const resumeId = Number.parseInt(id || "0")
  const { data: resume } = useResumeById(authData.user!.jwtDesc, resumeId)
  const deleteHobby = useDeleteHobbyFromResume(t, resumeId)
  const [dialogOpened, setDialogOpened] = useState(false)
  const [editingHobby, setEditingHobby] = useState<string | null>(null)

  if (resume instanceof NotFoundResponse) {
    return <Navigate to={"/edit"} />
  }

  const hobbies = resume ? resume.hobbies : []

  function openAddDialog() {
    setEditingHobby(null)
    setDialogOpened(true)
  }

  function openEditDialog(hobby: string) {
    setEditingHobby(hobby)
    setDialogOpened(true)
  }

  function closeDialog() {
    setDialogOpened(false)
    setEditingHobby(null)
  }

  function deleteHobbyFromResume(hobby: string) {
    deleteHobby.mutate({
      token: authData.user!.jwtDesc,
      hobbyName: hobby,
    })
  }

  return (
    <div className="m-4 h-[70vh] w-full max-w-4xl overflow-auto rounded-xl border border-[var(--border)] bg-[var(--background)] p-4 shadow-sm">
      <div className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)]">
        <table className="min-w-full table-fixed text-left align-middle">
          <thead className="bg-[var(--surface-hover)]/80 text-[var(--foreground-muted)]">
            <tr>
              <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider">
                {t("resumeHobbies.hobby")}
              </th>
              <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider">
                {t("resumeHobbies.actions")}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]">
            {hobbies?.map((hobby) => (
              <HobbyRow
                key={hobby}
                hobby={hobby}
                setEdit={openEditDialog}
                setDelete={deleteHobbyFromResume}
              />
            ))}
          </tbody>
          <tfoot className="bg-[var(--surface-hover)]/70">
            <tr>
              <td className="px-6 py-3 text-sm text-[var(--foreground-muted)]">
                {t("resumeHobbies.footer")}
              </td>
              <td className="px-6 py-4 text-sm">
                {hobbies && (
                  <FontAwesomeIcon
                    icon={faAdd}
                    className="cursor-pointer rounded bg-green-500 p-1.5 text-sm text-white transition duration-300 hover:bg-green-700"
                    onClick={openAddDialog}
                  />
                )}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
      {dialogOpened && hobbies && (
        <HobbyDialog
          dialogTitle={
            editingHobby ? t("editHobby.editHobby") : t("addHobby.addHobby")
          }
          initialHobby={editingHobby || ""}
          existingHobbies={hobbies}
          isOpened={() => dialogOpened}
          setOpened={(opened) => {
            if (!opened) {
              closeDialog()
            } else {
              setDialogOpened(opened)
            }
          }}
        />
      )}
    </div>
  )
}
