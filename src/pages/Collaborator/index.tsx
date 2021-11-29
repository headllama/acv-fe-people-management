import { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Input,
  InputGroup,
  Spacer,
  InputRightElement,
} from '@chakra-ui/react'

import { api } from '../../services/api'

import { Header } from '../../components/Header'
import { ManagementEmployees } from '../../components/ManagementEmployees'
import { FaUserPlus } from 'react-icons/fa'
import { IoSearchOutline } from 'react-icons/io5'
import { Pagination } from '../../components/Pagination'
import { NoResults } from '../../components/NoResults'
import { Sidebar } from '../../components/Sidebar'
import { useHistory } from 'react-router-dom'
import { SearchEmployeeResult } from '../../types'
import { CustomList } from '../../components/CustomList'

export interface StatisticsItem {
  title: string
  quantity: string
  progressValue: number
  progressColor: string
}
interface Statistics {
  total: number
  states: StatisticsItem[]
}

const hasList = true

type CustomListItemProps = {
  name: string
  redirectRoute: string
  avatarUri?: string
}

export function Collaborator() {
  const history = useHistory()
  const [collaborators, setCollaborators] = useState<CustomListItemProps[]>([])
  const [statistics, setStatistics] = useState<Statistics>()

  useEffect(() => {
    api.get('Employees').then((response) => {
      const list = response.data.map((item: SearchEmployeeResult) => {
        return {
          name: item.fullName,
          redirectRoute: `/collaborator/detail/${item.id}`,
        }
      })
      setCollaborators(list)
    })
  }, [])

  return (
    <>
      <Flex
        width="100%"
        borderBottomStyle="solid"
        borderBottomWidth={1}
        borderColor="gray.100"
        bg="white">
        <Header />
      </Flex>
      <Flex direction="row" bg="gray.50">
        <Flex>
          <Sidebar />
        </Flex>

        <Flex direction="column" bg="gray.50" width="100%">
          <Flex>
            <Box flex="1" bg="white" p="8" display="flex" alignItems="center">
              <Heading size="xl" fontWeight="normal" fontFamily="Roboto">
                Gestão de Pessoas
              </Heading>
              <Spacer />
              <Button
                as="a"
                size="lg"
                fontSize="lg"
                colorScheme="red"
                onClick={() => {
                  history.push('/collaborator/create')
                }}
                rightIcon={<Icon as={FaUserPlus} />}
                style={{
                  borderRadius: '50px',
                  fontFamily: 'Roboto',
                  fontSize: '18px',
                  fontWeight: 'normal',
                }}>
                Adicionar Colaborador
              </Button>
            </Box>
          </Flex>

          <Flex m="4">
            <Box borderRadius={8} bg="white" flex="1">
              <Box p={8}>
                <InputGroup>
                  <Input placeholder="Busque por nome, CPF ou RG" size="lg" />
                  <InputRightElement
                    top="4px"
                    // eslint-disable-next-line react/no-children-prop
                    children={<Icon as={IoSearchOutline} />}
                  />
                </InputGroup>
              </Box>
              {hasList ? (
                <>
                  <CustomList items={collaborators} />
                  {/* <Flex align="center" justify="center">
                    <Pagination />
                  </Flex> */}
                </>
              ) : (
                <Flex align="center" justify="center" p={10}>
                  <NoResults text={'Nenhum colaborador por aqui...'} />
                </Flex>
              )}
            </Box>

            <Box
              borderRadius={8}
              bg="white"
              boxShadow="sm"
              p="8"
              ml="4"
              minWidth="364px">
              {statistics && (
                <ManagementEmployees
                  total={statistics?.total}
                  title="Total de colaboradores"
                  description="Status dos cadastros de colaboradores"
                  states={statistics?.states}
                />
              )}
            </Box>
          </Flex>
        </Flex>
      </Flex>
    </>
  )
}
