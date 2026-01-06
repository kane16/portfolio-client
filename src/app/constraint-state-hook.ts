import { useFieldConstraints } from "../api/queries"
import { useAuth } from "../sites/login/use-auth"


export const useConstraint = () => {
  const { user } = useAuth()
  const { data } = useFieldConstraints(user!.jwtDesc)


  const findConstraint = (constraintPath: string) => {
    return data.find(
      (constraint) => constraint.path === constraintPath
    ) ?? {
      path: constraintPath,
      constraints: {
        nullable: true,
      }
    }
  }

  return { findConstraint }
}