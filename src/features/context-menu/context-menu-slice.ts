import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { ContextMenuType } from "./model/ContextMenuType"
import type { ContextMenuState } from "./model/ContextMenuState"

export const initialState: ContextMenuState = {
  hasFocus: false,
  contextMenuOpened: false,
  contextMenuType: ContextMenuType.DEFAULT,
}

const contextMenuSlice = createSlice({
  name: "contextMenu",
  initialState,
  reducers: {
    openContextMenu: (
      state,
      action: PayloadAction<{
        points: { x: number; y: number }
        type?: ContextMenuType
      }>,
    ) => {
      state.contextMenuOpened = true
      state.contextMenuPoints = action.payload.points
      if (action.payload.type) {
        state.contextMenuType = action.payload.type
      } else {
        state.contextMenuType = ContextMenuType.DEFAULT
      }
      state.hasFocus = true
    },
    focus: (state) => {
      state.hasFocus = true
    },
    loseFocus: (state) => {
      state.hasFocus = false
      state.contextMenuOpened = false
    }
  },
})

export const { openContextMenu, loseFocus, focus } = contextMenuSlice.actions
export default contextMenuSlice.reducer
