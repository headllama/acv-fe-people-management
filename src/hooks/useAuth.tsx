/* eslint-disable @typescript-eslint/ban-types */
import { useCallback, createContext, useState, useContext } from 'react'

import { api } from '../services/api'
import { useToast } from '@chakra-ui/react'

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
  const toast = useToast()
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@Aceville:token')
    const user = localStorage.getItem('@Aceville:user')

    if (token && user) {
      return { token, user: JSON.parse(user) }
    }

    if (user) {
      return { token: '', user: JSON.parse(user) }
    }

    return {} as AuthState
  })

  const searchUser = useCallback(async (email) => {
    //const response = await api.get(`Authentication/SearchUser/${email}`)
    api
      .get(`Authentication/SearchUser/${email}`)
      .then((response) => {
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
      })
      .catch((error) => {
        toast({
          title: `${
            error.response.data.errors[0].message
              ? error.response.data.errors[0].message
              : error.response.data.message
          }`,
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'top',
        })
      })
  }, [])

  const signIn = useCallback(async ({ email, password }) => {
    api
      .post('Authentication/Authenticate/', {
        email,
        password,
      })
      .then((response) => {
        const { token } = response.data
        const userStore = localStorage.getItem('@Aceville:user')
        localStorage.setItem('@Aceville:token', token)

        if (token && userStore) {
          setData({ token, user: JSON.parse(userStore) })
        }
      })
      .catch((error) => {
        toast({
          title: `${
            error.response.data.errors[0].message
              ? error.response.data.errors[0].message
              : error.response.data.message
          }`,
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'top',
        })
      })
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
