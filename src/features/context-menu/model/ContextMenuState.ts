import { ContextMenuType } from "./ContextMenuType"

export interface ContextMenuState {
  hasFocus: boolean
  contextMenuOpened: boolean
  contextMenuPoints?: { x: number; y: number }
  contextMenuType: ContextMenuType
}
