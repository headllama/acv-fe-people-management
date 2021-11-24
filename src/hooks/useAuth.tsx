/* eslint-disable @typescript-eslint/ban-types */
import React, {
  useCallback,
  createContext,
  useState,
  useContext,
  ReactNode,
} from 'react'

import { api } from '../services/api'

import { AuthenticateInput, children } from '../types'

interface User {
  userName: string
  email: string
  profileUri?: string
}
interface AuthState {
  token: string
  user: User
}
interface AuthContextData {
  token: string
  user: User
  signIn(credentials: AuthenticateInput): void
  signOut(): void
  searchUser(email: string): Promise<void>
}

type AuthProviderProps = children
const AuthContext = createContext<AuthContextData>({} as AuthContextData)

function AuthProvider({ children }: AuthProviderProps) {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@Aceville:token')
    const user = localStorage.getItem('@Aceville:user')

    if (token && user) {
      return { token, user: JSON.parse(user) }
    }

    return {} as AuthState
  })

  const searchUser = useCallback(async (email) => {
    const response = await api.get(`Authentication/SearchUser/${email}`)
    const userData = {
      userName: response.data.userName,
      email,
      profileUri: response.data.profileUri,
    }

    localStorage.setItem('@Aceville:user', JSON.stringify(userData))
    setData({
      ...data,
      user: userData,
    })
  }, [])

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('Authentication/Authenticate/', {
      email,
      password,
    })

    const { token } = response.data
    localStorage.setItem('@Aceville:token', token)
    setData({ ...data, token })
  }, [])

  const signOut = useCallback(() => {
    localStorage.removeItem('@Aceville:token')
    localStorage.removeItem('@Aceville:user')
    setData({} as AuthState)
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user: data.user,
        signIn,
        signOut,
        searchUser,
        token: localStorage.getItem('@Aceville:token') || '',
      }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth(): AuthContextData {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('Para usar o useAuth, é obrigatório o usuário do Provider')
  }

  return context
}

export { AuthProvider, useAuth }
