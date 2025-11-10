import { useFieldConstraints } from "../api/queries"
import { useAuth } from "../sites/login/use-auth"


export const useConstraint = () => {
  const { authData } = useAuth()
  const { data } = useFieldConstraints(authData.user!.jwtDesc)


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