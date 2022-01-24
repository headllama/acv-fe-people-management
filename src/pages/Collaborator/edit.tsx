import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Flex, Spinner } from '@chakra-ui/react'

//* CUSTOM
import { useCollaborator } from '../../hooks/useCollaborator'
import { EditUserForm } from './components/EditUserForm'

export const CentralizedSpinner = () => {
  return (
    <Flex w="100%" h="100vh" align="center" justify="center">
      <Spinner />
    </Flex>
  )
}

export function CollaboratorEdit() {
  const params = useParams<{ id: string }>()

  const { listEmployees, collaborator } = useCollaborator()

  useEffect(() => {
    listEmployees(params.id)
  }, [listEmployees, params.id])

  return collaborator ? (
    <EditUserForm id={params.id} collaborator={collaborator} />
  ) : (
    <CentralizedSpinner />
  )
}
