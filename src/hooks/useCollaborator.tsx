import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from 'react'
import { CollaboratorsCreate } from '../types'
import { api } from '../services/api'

type CollaboratorContextData = {
  defaultValues: CollaboratorsCreate | undefined
  collaborator: CollaboratorsCreate | undefined
  listEmployees: (id: string | number) => Promise<void>
}

export const CollaboratorContext = createContext({} as CollaboratorContextData)

export const CollaboratorProvider = ({ children }: { children: ReactNode }) => {
  const [defaultValues, setDefaultValues] = useState<CollaboratorsCreate>()
  const [collaborator, setCollaborator] = useState<CollaboratorsCreate>()

  const listEmployees = useCallback(async (id: string | number) => {
    api
      .get(`/Employees/${id}`)
      .then((response) => {
        const user: CollaboratorsCreate = response.data
        setDefaultValues(user)
        setCollaborator(user)
        console.log(response.data, 'teste 5')
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  return (
    <CollaboratorContext.Provider
      value={{ defaultValues, collaborator, listEmployees }}>
      {children}
    </CollaboratorContext.Provider>
  )
}

export const useCollaborator = () => {
  const context = useContext(CollaboratorContext)

  return context
}
