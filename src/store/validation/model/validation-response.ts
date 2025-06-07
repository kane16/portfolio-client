import type { SerializedError } from "@reduxjs/toolkit"

export interface ValidationResponse extends SerializedError {
  status: number
  validationErrors: {first: string, second: string}[]
}