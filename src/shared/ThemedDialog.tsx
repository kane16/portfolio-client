import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  type JSX,
  type ReactNode,
} from "react"

export type ThemedDialogHandle = {
  el: HTMLDialogElement | null
}

export type ThemedDialogProps = {
  open: () => boolean
  onClose: () => void
  title?: string
  children?: ReactNode
  footer?: ReactNode
  modal?: boolean
  closeOnBackdrop?: boolean
}

// A simple HTML <dialog> with app theme colors (same look as table/cards)
const ThemedDialog = forwardRef<ThemedDialogHandle, ThemedDialogProps>(
  (
    {
      open,
      onClose,
      title,
      children,
      footer,
      modal = true,
      closeOnBackdrop = true,
    },
    ref,
  ): JSX.Element | null => {
    const dialogRef = useRef<HTMLDialogElement>(null)

    useImperativeHandle(ref, () => ({ el: dialogRef.current }), [])

    useEffect(() => {
      const dialog = dialogRef.current
      if (!dialog) return

      if (open() && !dialog.open) {
        if (modal) {
          dialog.showModal()
        } else {
          dialog.show()
        }
      } else if (!open && dialog.open) {
        dialog.close()
      }
    }, [open, modal])

    useEffect(() => {
      const dialog = dialogRef.current
      if (!dialog) return

      const handleCancel = (e: Event) => {
        e.preventDefault()
        onClose()
      }
      const handleClose = () => {
        if (open()) onClose()
      }
      dialog.addEventListener("cancel", handleCancel)
      dialog.addEventListener("close", handleClose)
      return () => {
        dialog.removeEventListener("cancel", handleCancel)
        dialog.removeEventListener("close", handleClose)
      }
    }, [onClose, open])

    const onBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
      if (!closeOnBackdrop) return
      if (e.target === dialogRef.current) onClose()
    }

    return (
      <dialog
        ref={dialogRef}
        onMouseDown={onBackdropClick}
        className="themed-dialog"
        aria-labelledby={title ? "themed-dialog-title" : undefined}
      >
        {title && (
          <div className="themed-dialog__header">
            <h3 id="themed-dialog-title" className="text-base font-semibold">
              {title}
            </h3>
            <button
              type="button"
              className="rounded-md p-1 text-[var(--foreground-muted)] hover:bg-[var(--surface-hover)] hover:text-[var(--foreground)] focus:outline-none"
              onClick={onClose}
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        )}
        <div className="themed-dialog__section">{children}</div>
        {footer && <div className="themed-dialog__footer">{footer}</div>}
      </dialog>
    )
  },
)

export default ThemedDialog
