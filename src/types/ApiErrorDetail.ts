import { ApiErrorDetailProperty } from './ApiErrorDetailProperty'

export interface ApiErrorDetail {
  errorCode?: string
  message?: string
  path?: string
  url?: string
  properties?: ApiErrorDetailProperty[]
}
