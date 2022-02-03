/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Flex,
  Heading,
  Spacer,
  Avatar,
  Text,
  Tag,
  TagLabel,
  Stack,
  Link,
  Divider,
  Icon,
  Button,
} from '@chakra-ui/react'

import { motion } from 'framer-motion'
import { IoTrashOutline } from 'react-icons/io5'
import { FaUserEdit } from 'react-icons/fa'
import { IoMdCloudDownload } from 'react-icons/io'

import { useHistory } from 'react-router-dom'
import { CollaboratorUserData } from '../../components/CollaboratorUserData'
import { Header } from '../../components/Header'
import { useParams } from 'react-router'
import { useEffect, useState, useRef } from 'react'
import { api } from '../../services/api'
import { SearchEmployeeResult } from '../../types'
import { format } from 'date-fns'
import { CustomListSimple } from '../../components/CustomListSimple'

const MotionFlex = motion(Flex)

const variants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: '-100%' },
}

interface userFiles {
  fileName: string
  fileTypeId: string
  id: string
  tag: string
}

export function CollaboratorDetail() {
  const { id } = useParams<{ id?: string }>()
  const history = useHistory()
  const [alertOpen, setAlertOpen] = useState(false)
  const [collaborator, setCollaborator] = useState<SearchEmployeeResult>()
  const [collaboratorDataInfo, setCollaboratorDataInfo] = useState<any[]>([])
  const [userContactData, setUserContactData] = useState<any[]>([])
  const [userAddressData, setUserAddressData] = useState<any[]>([])
  const [userDocumentsInfos, setUserDocumentsInfos] = useState<any[]>([])
  const [userFiles, setUserFiles] = useState<userFiles[] | undefined>([])
  const [bankDataInfos, setBankDataInfos] = useState<any[]>([])
  const [userBank, setUserBank] = useState<any[]>([])
  const cancelRef = useRef()

  useEffect(() => {
    api
      .get(`/Files/Employee/${id}`)
      .then((response) => setUserFiles(response.data))
  }, [id])

  useEffect(() => {
    api
      .get(`/Files/Employee/${id}`)
      .then((response) => setUserFiles(response.data))
  }, [id])

  useEffect(() => {
    api.get(`Employees/${id}`).then((response) => {
      setCollaborator(response.data)
      console.log(response.data, 'teste')
    })
  }, [id])

  useEffect(() => {
    setUserBank([
      {
        label: 'Banco',
        userData: collaborator?.bank,
      },
      {
        label: 'Cód. do Banco',
        userData: collaborator?.bankCode,
      },
      {
        label: 'Agência',
        userData: collaborator?.bankBranch,
      },
      {
        label: 'Conta',
        userData: collaborator?.bankAccount,
      },
      {
        label: 'Tipo de Conta',
        userData: collaborator?.bankAccountType,
      },
      {
        label: 'Chave Pix',
        userData: collaborator?.pixKey,
      },
      {
        label: 'Tipo da Chave Pix',
        userData: collaborator?.pixKeyType,
      },
    ])

    setCollaboratorDataInfo([
      {
        label: 'Nome completo',
        userData: collaborator?.fullName,
      },
      {
        label: 'Data de nascimento',
        userData: collaborator?.birthdate
          ? format(new Date(collaborator?.birthdate), 'dd/MM/yyyy')
          : '',
      },
      {
        label: 'Nome do Cônjugue',
        userData: collaborator?.partnerName,
      },
      {
        label: 'Data de nascimento do Cônjugue',
        userData: collaborator?.partnerBirthdate
          ? format(new Date(collaborator?.partnerBirthdate), 'dd/MM/yyyy')
          : '',
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
        userData: collaborator?.admissionDate
          ? format(new Date(collaborator?.admissionDate), 'dd/MM/yyyy')
          : '',
      },
      {
        label: 'Contrato de Experiência',
        userData: collaborator?.evaluationPeriod,
      },
    ])

    setUserContactData([
      {
        label: 'E-mail',
        //@ts-ignore
        userData: collaborator?.email,
      },
      {
        label: 'Número de celular com DDD',
        userData: collaborator?.firstPhone,
      },
    ])

    setUserAddressData([
      {
        label: 'CEP',
        userData: collaborator?.employeeAddress?.zipCode,
      },
      {
        label: 'Cidade / Estado',
        userData: `${collaborator?.employeeAddress?.city} - ${collaborator?.employeeAddress?.state}`,
      },
      {
        label: 'Endereço',
        userData: collaborator?.employeeAddress?.address,
      },
      {
        label: 'Bairro',
        userData: collaborator?.employeeAddress?.neighborhood,
      },
      {
        label: 'Número',
        userData: collaborator?.employeeAddress?.number,
      },
      // {
      //   label: 'Complemento',
      //   userData: 'Apto 00',
      // },
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
      // {
      //   label: 'UF',
      //   userData: '-',
      // },
      {
        label: 'Data de Emissão',
        userData: collaborator?.rg?.registerDate
          ? format(new Date(collaborator?.rg?.registerDate), 'dd/MM/yyyy')
          : '',
      },
      {
        label: 'CNH',
        userData: collaborator?.cnh?.document,
      },
      {
        label: 'Categoria',
        userData: collaborator?.cnh?.category,
      },
      // {
      //   label: 'Primeira CNH',
      //   userData: '-',
      // },
      {
        label: 'Validade CNH',
        userData: collaborator?.cnh?.expiration
          ? format(new Date(collaborator?.cnh?.expiration), 'dd/MM/yyyy')
          : '',
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
        userData: collaborator?.ctps?.registerDate
          ? format(new Date(collaborator?.ctps?.registerDate), 'dd/MM/yyyy')
          : '',
      },
      {
        label: 'PIS',
        userData: collaborator?.pis,
      },
      // {
      //   label: 'Certificado de Reservista',
      //   userData: '-',
      // },
      {
        label: 'Titulo de eleitor',
        userData: collaborator?.electoralRegister,
      },
    ])
  }, [collaborator])

  // function to create a pdf and download him
  const handleDownloadFile = async (id: any) => {
    window.open(
      `https://acv-ms-people-management.azurewebsites.net/Files/${id}`,
      '_blank'
    )
  }

  const handleDesactiveCollaborator = (id: string) => {
    api
      .post(`Employees/${id}/disable`)
      //@ts-ignore
      .then(() => setCollaborator({ ...collaborator, isEnabled: false }))
      .catch((error) => {
        console.log(error)
      })

    setAlertOpen(false)
  }

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
                  colorScheme={collaborator?.isEnabled ? 'green' : 'red'}
                  borderRadius="full"
                  size="lg"
                  ml={3}
                  mt={1}>
                  <TagLabel>
                    {collaborator?.isEnabled ? 'Ativo' : 'Desativado'}
                  </TagLabel>
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
              Dados bancários
            </Heading>
            <Divider mt="4" borderColor="gray.100" />
            <Flex direction="row" flexWrap="wrap">
              {userBank.map((dataInfo, index) => {
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
            <Flex direction="row" flexWrap="wrap"></Flex>
            <Box mt="6">
              {collaborator?.dependents && (
                <CustomListSimple
                  items={collaborator?.dependents}
                  disableLastDivider
                  boxShadow="none"
                />
              )}
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
        <Flex flexDir="column">
          <Box
            borderRadius={8}
            bg="white"
            boxShadow="sm"
            p="8"
            ml="4"
            minWidth="364px"
            mb="4"
            h="fit-content">
            <Heading as="h2" size="md" color="gray.800" fontFamily="Roboto">
              Opções
            </Heading>
            <Divider m="3px" borderColor="gray.100" />
            <Link
              display="flex"
              align="center"
              onClick={() =>
                history.push(`/collaborator/edit/${collaborator?.id}`)
              }
              justifyContent="space-between"
              mt={4}>
              <Text fontWeight="medium" color="#FF4F4F">
                Editar Colaborador
              </Text>
              <Icon as={FaUserEdit} fontSize="20" color="lightgray" />
            </Link>
            {collaborator?.isEnabled && (
              <Link
                display="flex"
                align="center"
                justifyContent="space-between"
                onClick={() => setAlertOpen(true)}
                mt={4}>
                <Text fontWeight="medium" color="#FF4F4F">
                  Desativar Colaborador
                </Text>
                <Icon as={IoTrashOutline} fontSize="20" color="lightgray" />
              </Link>
            )}
            <MotionFlex
              variants={variants}
              animate={alertOpen ? 'open' : 'closed'}
              display={alertOpen ? 'flex' : 'none'}
              p="10px"
              borderRadius="20px"
              mt="20px"
              flexDir="column">
              <Text color="#FF4F4F">Deseja desativar o colaborador?</Text>
              <Flex
                mt="15px"
                justifyContent="space-between"
                alignItems="center">
                <Button
                  //@ts-ignore
                  onClick={() => handleDesactiveCollaborator(collaborator.id)}>
                  Confirmar
                </Button>
                <Button onClick={() => setAlertOpen(false)}>Cancelar</Button>
              </Flex>
            </MotionFlex>
          </Box>
          <Box
            borderRadius={8}
            bg="white"
            boxShadow="sm"
            p="8"
            ml="4"
            minWidth="364px"
            h="fit-content">
            <Heading as="h2" size="md" color="gray.800" fontFamily="Roboto">
              Documentos
            </Heading>
            <Divider m="3px" borderColor="gray.100" />
            <Stack margin="15px 0" spacing={2}>
              {userFiles?.length === 0 ? (
                <Text>Não existem documentos para download</Text>
              ) : (
                <>
                  {userFiles?.map((file) => (
                    <Flex
                      key={file.id}
                      w="100%"
                      justifyContent="space-between"
                      alignItems="center">
                      <Text fontSize="16  px">{file.tag}</Text>
                      <Icon
                        onClick={() => handleDownloadFile(file.id)}
                        as={IoMdCloudDownload}
                        cursor="pointer"
                        color="#FF4F4F"
                        transition="all 0.8s ease"
                        fontSize="30px"
                        _hover={{ opacity: 0.5 }}
                      />
                    </Flex>
                  ))}
                </>
              )}
            </Stack>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  )
}
