import { useState, type JSX } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAdd } from "@fortawesome/free-solid-svg-icons"
import { useTranslation } from "react-i18next"
import { Navigate, useParams } from "react-router-dom"
import { useAuth } from "../../../login/use-auth"
import {
  useDeleteLanguageFromResume,
  useResumeById,
} from "../../../../api/queries"
import {
  LANGUAGE_LEVELS,
  NotFoundResponse,
  type Language,
} from "../../../../api/model"
import LanguageDialog from "./dialog/LanguageDialog"
import LanguageRow from "./LanguageRow"

function LanguageList(): JSX.Element {
  const { t } = useTranslation()
  const { authData } = useAuth()
  const { id } = useParams<{ id: string }>()
  const resumeId = Number.parseInt(id || "0")
  const { data: resume } = useResumeById(authData.user!.jwtDesc, resumeId)
  const [addLanguageOpened, setAddLanguageOpened] = useState(false)
  const [editLanguage, setEditLanguage] = useState<Language | null>(null)
  const deleteLanguage = useDeleteLanguageFromResume(t, resumeId)

  function deleteLanguageFromResume(language: Language): void {
    deleteLanguage.mutate({
      token: authData.user!.jwtDesc,
      languageId: language.id!,
    })
  }

  if (resume instanceof NotFoundResponse) {
    return <Navigate to={"/edit"} />
  }

  const languageList = resume.languages ?? []

  return (
    <div className="m-4 h-[70vh] w-full max-w-4xl overflow-auto rounded-xl border border-[var(--border)] bg-[var(--background)] p-4 shadow-sm">
      <div className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)]">
        <table className="min-w-full table-fixed text-left align-middle">
          <thead className="bg-[var(--surface-hover)]/80 text-[var(--foreground-muted)]">
            <tr>
              <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider">
                {t("resumeLanguages.language")}
              </th>
              <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider">
                {t("resumeLanguages.level")}
              </th>
              <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider">
                {t("resumeLanguages.actions")}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]">
            {languageList.length > 0 ? (
              languageList.map((language) => (
                <LanguageRow
                  key={language.name}
                  language={language}
                  setEdit={setEditLanguage}
                  setDelete={deleteLanguageFromResume}
                />
              ))
            ) : (
              <tr>
                <td
                  colSpan={3}
                  className="px-6 py-6 text-center text-sm text-[var(--foreground-muted)]"
                >
                  {t("resumeLanguages.empty")}
                </td>
              </tr>
            )}
          </tbody>
          <tfoot className="bg-[var(--surface-hover)]/70">
            <tr>
              <td
                colSpan={2}
                className="px-6 py-3 text-sm text-[var(--foreground-muted)]"
              >
                {t("resumeLanguages.footer")}
              </td>
              <td className="px-6 py-4 text-sm">
                <FontAwesomeIcon
                  icon={faAdd}
                  className="cursor-pointer rounded bg-green-500 p-1.5 text-sm text-white transition duration-300 hover:bg-green-700"
                  onClick={() => setAddLanguageOpened(true)}
                />
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
      {addLanguageOpened && (
        <LanguageDialog
          dialogTitle={t("addLanguage.addLanguage")}
          initialLanguage={{ name: "", level: LANGUAGE_LEVELS[0] }}
          resumeLanguages={languageList}
          isOpened={() => addLanguageOpened}
          setOpened={setAddLanguageOpened}
        />
      )}
      {editLanguage && (
        <LanguageDialog
          dialogTitle={t("editLanguage.editLanguage")}
          initialLanguage={editLanguage}
          resumeLanguages={languageList}
          isOpened={() => !!editLanguage}
          setOpened={(opened) => {
            if (!opened) setEditLanguage(null)
          }}
        />
      )}
    </div>
  )
}

export { LanguageList }
export default LanguageList
