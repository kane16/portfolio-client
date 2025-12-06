import type { Selectable } from "./selectable"


export interface ImageOption extends Selectable {
  name: string
  description: string
  src: string
}
