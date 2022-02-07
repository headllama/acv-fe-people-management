import { ApiErrorDetail } from './ApiErrorDetail'

export interface ApiError {
  code?: string
  id?: string
  message?: string
  errors?: ApiErrorDetail[]
}
