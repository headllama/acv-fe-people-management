import { children } from '../types'
import { AuthProvider } from './useAuth'

export function AppProvider({ children }: children) {
  return <AuthProvider>{children}</AuthProvider>
}
