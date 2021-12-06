import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Spacer,
  Avatar,
  Text,
  Tag,
  TagLabel,
  Link,
  Divider,
} from '@chakra-ui/react'

import { CollaboratorUserData } from '../../components/CollaboratorUserData'
import { CustomList } from '../../components/CustomList'
import { Header } from '../../components/Header'
import { IoTrashOutline } from 'react-icons/io5'
import { useParams } from 'react-router'
import { useEffect, useState } from 'react'
import { api } from '../../services/api'
import { SearchEmployeeResult } from '../../types'

const userDependentsData = [
  {
    label: 'Nome do Cônjuge',
    userData: 'Marta Lima Gomes',
  },
  {
    label: 'Dependente do IR?',
    userData: 'Sim',
  },
  {
    label: 'Data de Emissão',
    userData: '01/01/1990',
  },
]

const dependents = [
  {
    id: 1,
    name: 'Pedro Gomes',
  },
  {
    id: 2,
    name: 'Maria Gomes',
  },
  {
    id: 3,
    name: 'Paulo Gomes',
  },
]

export function CollaboratorDetail() {
  const { id } = useParams<{ id?: string }>()
  const [collaborator, setCollaborator] = useState<SearchEmployeeResult>()
  const [collaboratorDataInfo, setCollaboratorDataInfo] = useState<any[]>([])
  const [dependents, setDependents] = useState<any[]>([])
  const [userContactData, setUserContactData] = useState<any[]>([])
  const [userAddressData, setUserAddressData] = useState<any[]>([])
  const [userDocumentsInfos, setUserDocumentsInfos] = useState<any[]>([])

  useEffect(() => {
    api.get(`Employees/${id}`).then((response) => {
      console.log(response.data)
      setCollaborator(response.data)
    })
  }, [id])

  useEffect(() => {
    setCollaboratorDataInfo([
      {
        label: 'Nome completo',
        userData: collaborator?.fullName,
      },
      {
        label: 'Data de nascimento',
        userData: collaborator?.birthdate,
      },
      {
        label: 'CPF',
        userData: collaborator?.cpf,
      },
      {
        label: 'Escolaridade',
        userData: collaborator?.education,
      },
      {
        label: 'Estado Civil',
        userData: collaborator?.maritalStatus,
      },
      {
        label: 'Nome da mãe',
        userData: collaborator?.motherName,
      },
      {
        label: 'Salário',
        userData: `R$${collaborator?.remuneration}`,
      },
      {
        label: 'Nome do Pai',
        userData: collaborator?.fatherName,
      },
      {
        label: 'Cargo',
        userData: collaborator?.occupation,
      },
      {
        label: 'Raça',
        userData: collaborator?.breed,
      },
      {
        label: 'Horário de Trabalho',
        userData: collaborator?.workPeriod,
      },
      {
        label: 'Data de Admissão',
        userData: collaborator?.admissionDate,
      },
      {
        label: 'Contrato de Experiência',
        userData: collaborator?.evaluationPeriod,
      },
    ])
    setUserContactData([
      {
        label: 'E-mail',
        userData: 'jose.silva@gmail.com',
      },
      {
        label: 'Número de celular com DDD',
        userData: collaborator?.firstPhone,
      },
    ])

    setUserAddressData([
      {
        label: 'CEP',
        userData: '3504844',
      },
      {
        label: 'Cidade / Estado',
        userData: 'São Paulo - SP',
      },
      {
        label: 'Endereço',
        userData: 'Rua lorem ipsum',
      },
      {
        label: 'Bairro',
        userData: 'Consolação',
      },
      {
        label: 'Número',
        userData: '196',
      },
      {
        label: 'Complemento',
        userData: 'Apto 00',
      },
    ])

    setUserDocumentsInfos([
      {
        label: 'RG',
        userData: collaborator?.rg?.document,
      },
      {
        label: 'Emissor',
        userData: collaborator?.rg?.issuer,
      },
      {
        label: 'UF',
        userData: '-',
      },
      {
        label: 'Data de Emissão',
        userData: collaborator?.rg?.registerDate,
      },
      {
        label: 'CNH',
        userData: collaborator?.cnh?.document,
      },
      {
        label: 'Categoria',
        userData: collaborator?.cnh?.category,
      },
      {
        label: 'Primeira CNH',
        userData: '-',
      },
      {
        label: 'Validade CNH',
        userData: collaborator?.cnh?.expiration,
      },
      {
        label: 'CTPS',
        userData: collaborator?.ctps?.document,
      },
      {
        label: 'Série',
        userData: collaborator?.ctps?.series,
      },
      {
        label: 'UF',
        userData: collaborator?.ctps?.state,
      },
      {
        label: 'Data de Emissão',
        userData: collaborator?.ctps?.registerDate,
      },
      {
        label: 'PIS',
        userData: collaborator?.pis,
      },
      {
        label: 'Certificado de Reservista',
        userData: '-',
      },
    ])
  }, [collaborator])

  return (
    <Flex direction="column" bg="gray.50" pb="10">
      <Flex
        width="100%"
        borderBottomStyle="solid"
        borderBottomWidth={1}
        borderColor="gray.100"
        bg="white">
        <Header />
      </Flex>
      <Flex mb="2">
        <Box
          flex="1"
          borderRadius={8}
          bg="white"
          p="8"
          display="flex"
          alignItems="center">
          <Flex align="center">
            <Avatar size="md" name={collaborator?.fullName} mr="2" />
            <Box ml="4" textAlign="left">
              <Flex align="flex-start">
                <Flex direction="column">
                  <Heading size="xl" fontWeight="normal" fontFamily="Roboto">
                    {collaborator?.fullName}
                  </Heading>
                  <Text color="gray.800" fontSize="lg">
                    {collaborator?.occupation}
                  </Text>
                </Flex>
                <Tag
                  variant="outline"
                  colorScheme="green"
                  borderRadius="full"
                  size="lg"
                  ml={3}
                  mt={1}>
                  <TagLabel>Ativo</TagLabel>
                </Tag>
              </Flex>
            </Box>
          </Flex>
          <Spacer />
        </Box>
      </Flex>

      <Flex m="4">
        <Box flex="1">
          <Box p={8} bg="white" borderRadius={8}>
            <Heading as="h2" size="md" color="gray.800" fontFamily="Roboto">
              Dados pessoais
            </Heading>
            <Divider mt="4" borderColor="gray.100" />
            <Flex direction="row" flexWrap="wrap">
              {collaboratorDataInfo.map((dataInfo, index) => {
                return (
                  <CollaboratorUserData
                    key={index}
                    label={dataInfo.label}
                    userData={dataInfo.userData}
                  />
                )
              })}
            </Flex>
          </Box>
          <Box p={8} mt="4" bg="white" borderRadius={8}>
            <Heading as="h2" size="md" color="gray.800" fontFamily="Roboto">
              Documentos legais
            </Heading>
            <Divider mt="4" borderColor="gray.100" />
            <Flex direction="row" flexWrap="wrap">
              {userDocumentsInfos.map((dataInfo, index) => {
                return (
                  <CollaboratorUserData
                    key={index}
                    label={dataInfo.label}
                    userData={dataInfo.userData}
                  />
                )
              })}
            </Flex>
          </Box>
          <Box p={8} mt="4" bg="white" borderRadius={8}>
            <Heading as="h2" size="md" color="gray.800" fontFamily="Roboto">
              Dependentes
            </Heading>
            <Divider mt="4" borderColor="gray.100" />
            <Flex direction="row" flexWrap="wrap">
              {userDependentsData.map((dataInfo, index) => {
                return (
                  <CollaboratorUserData
                    key={index}
                    label={dataInfo.label}
                    userData={dataInfo.userData}
                  />
                )
              })}
            </Flex>
            <Box mt="6" boxShadow="xl">
              <Heading
                as="h2"
                size="md"
                color="gray.800"
                fontFamily="Roboto"
                mb="4"
                px="8">
                Lista de Dependentes para IR
              </Heading>
              {/*<CustomList items={dependents} disableLastDivider />*/}
            </Box>
          </Box>
          <Box p={8} mt="4" bg="white" borderRadius={8}>
            <Heading as="h2" size="md" color="gray.800" fontFamily="Roboto">
              Endereço
            </Heading>
            <Divider mt="4" borderColor="gray.100" />
            <Flex direction="row" flexWrap="wrap">
              {userAddressData.map((dataInfo, index) => {
                return (
                  <CollaboratorUserData
                    key={index}
                    label={dataInfo.label}
                    userData={dataInfo.userData}
                  />
                )
              })}
            </Flex>
          </Box>
          <Box p={8} mt="4" bg="white" borderRadius={8}>
            <Heading as="h2" size="md" color="gray.800" fontFamily="Roboto">
              Dados para contato
            </Heading>
            <Divider mt="4" borderColor="gray.100" />
            <Flex direction="row" flexWrap="wrap">
              {userContactData.map((dataInfo, index) => {
                return (
                  <CollaboratorUserData
                    key={index}
                    label={dataInfo.label}
                    userData={dataInfo.userData}
                  />
                )
              })}
            </Flex>
          </Box>
        </Box>

        <Box
          borderRadius={8}
          bg="white"
          boxShadow="sm"
          p="8"
          ml="4"
          minWidth="364px"
          h="200px">
          <Heading as="h2" size="md" color="gray.800" fontFamily="Roboto">
            Documentos
          </Heading>
          <Divider m="3px" borderColor="gray.100" />
          <Button
            as="a"
            size="lg"
            fontSize="lg"
            colorScheme="red"
            isFullWidth
            mt={4}
            style={{
              borderRadius: '50px',
              fontFamily: 'Roboto',
              fontSize: '18px',
              fontWeight: 'normal',
            }}>
            Download
          </Button>
          <Link display="flex" align="center" justifyContent="center" mt={4}>
            <Icon as={IoTrashOutline} fontSize="20" color="lightgray" />
            <Text ml="4" fontWeight="medium" color="#FF4F4F">
              Desativar Colaborador
            </Text>
          </Link>
        </Box>
      </Flex>
    </Flex>
  )
}
