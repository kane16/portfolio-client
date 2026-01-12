import { useFieldConstraints } from "../api/queries"
import { useAuth } from "../features/login/use-auth"

export const useConstraint = () => {
  const { token } = useAuth()
  const { data } = useFieldConstraints(token!)

  const findConstraint = (constraintPath: string) => {
    return (
      data.find((constraint) => constraint.path === constraintPath) ?? {
        path: constraintPath,
        constraints: {
          nullable: true,
        },
      }
    )
  }

  return { findConstraint }
}
