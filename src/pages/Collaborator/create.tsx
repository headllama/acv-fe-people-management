import { useEffect, useState } from 'react'

import {
  Box,
  Flex,
  SimpleGrid,
  Heading,
  List,
  Text,
  FormControl,
  FormLabel,
  Input,
  Button,
  Icon,
  Divider,
} from '@chakra-ui/react'

import * as S from './styles'
import { useForm } from 'react-hook-form'
import { Header } from '../../components/Header'
import { IoArrowBack } from 'react-icons/io5'
import { useHistory } from 'react-router-dom'
import { FormInputText } from '../../components/FormInputs/FormInputText'
import { FormInputTextMask } from '../../components/FormInputs/FormInputTextMask'
import { FormInputDropdown } from '../../components/FormInputs/FormInputDropdown'
import {
  optionsBreed,
  optionsEducation,
  optionsMaritalStatus,
  optionsPeriodAgreement,
} from './options'
import { CollaboratorsCreate, Dependent } from '../../types'
import { CustomListSimple } from '../../components/CustomListSimple'
import { api, ibgeApi } from '../../services/api'
import { stringToDate } from '../../utils/DateFormatted'
import { UploadBox } from '../../components/UploadBox'
import { useToast } from '@chakra-ui/react'

const defaultValues = {
  fullName: '',
  cpf: '',
  birthdate: '',
  education: '',
  breed: '',
  maritalStatus: '',
  motherName: '',
  fatherName: '',
  evaluationPeriod: '',
  workPeriod: '',
  occupation: '',
  remuneration: '',
  admissionDate: '',
  pis: '',
  militaryCertificate: '',
  firstPhone: '',
  secondPhone: '',
  dependent: {
    fullName: '',
    birthdate: '',
  },
  employeeAddress: {
    address: '',
    number: '',
    neighborhood: '',
    city: '',
    state: '',
    zipCode: '',
    nationality: '',
  },
  rgDocument: '',
  rgIssuer: '',
  rgRegisterDate: '',
  cnhDocument: '',
  cnhCategory: '',
  cnhRegisterDate: '',
  cnhExpiration: '',
  ctpsDocument: '',
  ctpsSeries: '',
  ctpsState: '',
  ctpsRegisterDate: '',
}

interface UF {
  label: string
  value: string
}

interface UFResponse {
  id: number
  sigla: string
  nome: string
  regiao: {
    id: number
    sigla: string
    nome: string
  }
}

export function CollaboratorCreate() {
  const history = useHistory()
  const toast = useToast()

  const [step, setStep] = useState(2)
  const [dependents, setDependents] = useState<Dependent[]>([])
  const [ufs, setUfs] = useState<UF[]>([])
  const [collaboradorID, setCollaboradorID] = useState('')

  useEffect(() => {
    ibgeApi.get('estados?orderBy=nome').then((response) => {
      const ufsFormatted = response.data
        ? response.data.map((ufItem: UFResponse) => {
            return {
              label: ufItem.nome,
              value: ufItem.sigla,
            }
          })
        : []

      setUfs(ufsFormatted)
    })
  }, [])

  const methods = useForm<CollaboratorsCreate>({ defaultValues: defaultValues })
  const {
    handleSubmit,
    register,
    control,
    getValues,
    formState: { errors },
  } = methods

  const onSubmit = (data: CollaboratorsCreate) => {
    console.log(data)

    if (step === 0) {
      const collaboratorCreate = {
        fullName: data.fullName,
        cpf: data.cpf,
        birthdate: stringToDate(data.birthdate),
        education: parseInt(data.education),
        breed: parseInt(data.breed),
        maritalStatus: parseInt(data.maritalStatus),
        motherName: data.motherName,
        fatherName: data.fatherName,
        evaluationPeriod: parseInt(data.evaluationPeriod),
        workPeriod: data.workPeriod,
        occupation: data.occupation,
        remuneration: parseFloat(data.remuneration),
        admissionDate: stringToDate(data.admissionDate),
      }

      createCollaborator(collaboratorCreate)
    } else if (step === 1) {
      const collaboratorUpdate = {
        rg: {
          document: data.rgDocument,
          issuer: data.rgIssuer,
          registerDate: stringToDate(data.rgRegisterDate),
        },

        cnh: {
          document: data.cnhDocument,
          category: data.cnhCategory,
          registerDate: stringToDate(data.cnhRegisterDate),
          expiration: stringToDate(data.cnhExpiration),
          // firstCNH: parseInt(data.firstCNH),
        },

        ctps: {
          document: data.ctpsDocument,
          series: data.ctpsSeries,
          state: data.ctpsState,
          registerDate: stringToDate(data.ctpsRegisterDate),
        },
        militaryCertificate: data.militaryCertificate,
        pis: data.pis,
      }

      updateCollaborator(collaboratorUpdate, 2)
    } else if (step === 2) {
      const dependentsData = dependents.map((dependent) => {
        return {
          fullName: dependent.fullName,
          birthdate: stringToDate(dependent.birthdate),
          cpf: dependent.cpf,
        }
      })
      const collaboratorUpdate = {
        dependents: dependentsData,
      }
      updateCollaborator(collaboratorUpdate, 3)
    } else if (step === 3) {
      const collaboratorUpdate = {
        firstPhone: data.firstPhone,
        secondPhone: data.secondPhone,
        // email: ''
      }
      updateCollaborator(collaboratorUpdate, 4)
    } else if (step === 4) {
      const collaboratorUpdate = {
        employeeAddress: {
          address: data.employeeAddress.address,
          number: data.employeeAddress.number,
          neighborhood: data.employeeAddress.neighborhood,
          city: data.employeeAddress.city,
          state: data.employeeAddress.state,
          zipCode: data.employeeAddress.zipCode,
          nationality: data.employeeAddress.nationality,
        },
      }
      updateCollaborator(collaboratorUpdate, 5)
    }
  }

  async function createCollaborator(data: any) {
    await api
      .post('Employees', data)
      .then((response) => {
        setCollaboradorID(response.data.employeeId)
        setStep(1)
      })
      .catch((error) => {
        console.log(error.response)
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
  }

  async function updateCollaborator(data: any, stepItem: number) {
    await api
      .patch(`Employees/${collaboradorID}`, data)
      .then((response) => {
        console.log(response)
        setStep(stepItem)
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
  }

  const menuItems = [
    'Dados Pessoais',
    'Documentos',
    'Dependentes',
    'Contratos',
    'Endereços',
    'Uploads',
  ]

  function addDependents() {
    const { dependent } = getValues()
    if (dependent.fullName) {
      const item = {
        fullName: dependent.fullName,
        birthdate: dependent.birthdate,
        cpf: dependent.cpf,
      }
      setDependents([...dependents, item])
    }
  }

  function handleGoBack() {
    const formatedStep = step
    setStep(formatedStep - 1)
    if (step === 0) history.push('/collaborator')
  }

  function renderSteps() {
    switch (step) {
      case 0:
        return (
          <S.RightSide>
            <Heading fontSize="lg" color="gray.800" fontFamily="Roboto" mb="4">
              Dados Pessoais
            </Heading>
            <FormInputText
              name="fullName"
              control={control}
              label="Nome completo"
              register={register}
              errors={errors}
              required
            />
            <Flex direction="row">
              <FormInputTextMask
                name="cpf"
                control={control}
                label="CPF"
                register={register}
                errors={errors}
                mask="999.999.999-99"
                required
              />
              <FormInputTextMask
                name="birthdate"
                control={control}
                label="Data Nascimento"
                register={register}
                errors={errors}
                mask="99/99/9999"
                required
              />
            </Flex>
            <FormInputDropdown
              name="education"
              control={control}
              label="Escolaridade"
              register={register}
              errors={errors}
              options={optionsEducation}
              required
            />
            <Flex direction="row">
              <FormInputDropdown
                name="breed"
                control={control}
                label="Raça"
                register={register}
                errors={errors}
                options={optionsBreed}
                required
              />
              <FormInputDropdown
                name="maritalStatus"
                control={control}
                label="Estado Civi"
                register={register}
                errors={errors}
                options={optionsMaritalStatus}
                required
              />
            </Flex>
            <Flex direction="row">
              <FormInputText
                name="motherName"
                control={control}
                label="Nome da mãe"
                register={register}
                errors={errors}
                required
              />
              <FormInputText
                name="fatherName"
                control={control}
                label="Nome do pai"
                register={register}
                errors={errors}
                required
              />
            </Flex>
            <Flex direction="row">
              <FormInputDropdown
                name="evaluationPeriod"
                control={control}
                label="Contrato de experiência"
                register={register}
                errors={errors}
                options={optionsPeriodAgreement}
                required
              />
              <FormInputText
                name="workPeriod"
                control={control}
                label="Horário de Trabalho"
                register={register}
                errors={errors}
                required
              />
            </Flex>
            <Flex direction="row">
              <FormInputText
                name="occupation"
                control={control}
                label="Cargo/Função"
                register={register}
                errors={errors}
                required
              />
              <FormInputText
                name="remuneration"
                control={control}
                label="Salário"
                register={register}
                errors={errors}
                required
              />
            </Flex>
            <FormInputTextMask
              name="admissionDate"
              control={control}
              label="Data de Admissão"
              register={register}
              errors={errors}
              mask="99/99/9999"
              required
            />
            <S.WrapperFooter>
              <S.BackButton onClick={handleGoBack}>
                <Icon as={IoArrowBack} />
                <Text
                  fontSize="lg"
                  fontWeight="semibold"
                  color={'gray.800'}
                  mx="2">
                  Voltar
                </Text>
              </S.BackButton>
              <Button
                as="a"
                size="lg"
                fontSize="lg"
                colorScheme="red"
                ml="4"
                style={{
                  borderRadius: '50px',
                  fontFamily: 'Roboto',
                  fontSize: '18px',
                  fontWeight: 'normal',
                }}
                onClick={handleSubmit(onSubmit)}>
                Continuar
              </Button>
            </S.WrapperFooter>
          </S.RightSide>
        )
      case 1:
        return (
          <S.RightSide>
            <Heading fontSize="lg" color="gray.800" fontFamily="Roboto" mb="4">
              Documentos Legais
            </Heading>
            <Flex direction="row">
              <FormInputTextMask
                name="rgDocument"
                control={control}
                label="Documento de identidade"
                register={register}
                errors={errors}
                mask="99.999.999-9"
                required
              />
              <FormInputText
                name="rgIssuer"
                control={control}
                label="Emissor"
                register={register}
                errors={errors}
                required
              />
            </Flex>
            <Flex direction="row">
              <FormInputDropdown
                name="rgUf"
                control={control}
                label="UF"
                register={register}
                errors={errors}
                options={ufs}
                required
              />
              <FormInputTextMask
                name="rgRegisterDate"
                control={control}
                label="Data de Emissão"
                register={register}
                errors={errors}
                mask="99/99/9999"
                required
              />
            </Flex>
            <Divider mt={2} />
            <Flex direction="row">
              <FormInputText
                name="cnhDocument"
                control={control}
                label="CNH"
                register={register}
                errors={errors}
              />
              <FormInputText
                name="cnhCategory"
                control={control}
                label="Categoria"
                register={register}
                errors={errors}
              />
            </Flex>
            <Flex direction="row">
              <FormInputDropdown
                name="firstCNH"
                control={control}
                label="Primeira Habilitação"
                register={register}
                errors={errors}
                options={[
                  {
                    label: 'Sim',
                    value: '0',
                  },
                  {
                    label: 'Não',
                    value: '1',
                  },
                ]}
              />
              <FormInputTextMask
                name="cnhRegisterDate"
                control={control}
                label="Data de Emissão"
                register={register}
                errors={errors}
                mask="99/99/9999"
              />
              <FormInputTextMask
                name="cnhExpiration"
                control={control}
                label="Validade da CNH"
                register={register}
                errors={errors}
                mask="99/99/9999"
              />
            </Flex>
            <Divider mt={2} />
            <Flex direction="row">
              <FormInputText
                name="ctpsDocument"
                control={control}
                label="Carteira de Trabalho"
                register={register}
                errors={errors}
              />
              <FormInputText
                name="ctpsSeries"
                control={control}
                label="Série"
                register={register}
                errors={errors}
              />
            </Flex>
            <Flex direction="row">
              <FormInputDropdown
                name="ctpsState"
                control={control}
                label="UF"
                register={register}
                errors={errors}
                options={ufs}
                required
              />
              <FormInputTextMask
                name="ctpsRegisterDate"
                control={control}
                label="Data de Emissão CTPS"
                register={register}
                errors={errors}
                mask="99/99/9999"
              />
            </Flex>
            <FormInputText
              name="pis"
              control={control}
              label="PIS"
              register={register}
              errors={errors}
            />
            <FormInputText
              name="militaryCertificate"
              control={control}
              label="Certificado de Reservista"
              register={register}
              errors={errors}
            />
            <S.WrapperFooter>
              <S.BackButton onClick={handleGoBack}>
                <Icon as={IoArrowBack} />
                <Text
                  fontSize="lg"
                  fontWeight="semibold"
                  color={'gray.800'}
                  mx="2">
                  Voltar
                </Text>
              </S.BackButton>
              <Button
                as="a"
                size="lg"
                fontSize="lg"
                colorScheme="red"
                ml="4"
                style={{
                  borderRadius: '50px',
                  fontFamily: 'Roboto',
                  fontSize: '18px',
                  fontWeight: 'normal',
                }}
                onClick={handleSubmit(onSubmit)}>
                Continuar
              </Button>
            </S.WrapperFooter>
          </S.RightSide>
        )
      case 2:
        return (
          <S.RightSide>
            <div>
              <Heading
                fontSize="lg"
                color="gray.800"
                fontFamily="Roboto"
                mb="4">
                Dependentes
              </Heading>
              <FormInputText
                name="dependent.fullName"
                control={control}
                label="Nome do dependente"
                register={register}
                errors={errors}
              />

              <Flex direction="row">
                {/* <FormInputDropdown
                  name="dependent.hasIR"
                  control={control}
                  label="Dependente IR?"
                  register={register}
                  errors={errors}
                  options={[
                    {
                      label: 'Sim',
                      value: '0',
                    },
                    {
                      label: 'Não',
                      value: '1',
                    },
                  ]}
                /> */}
                <FormInputTextMask
                  name="dependent.cpf"
                  control={control}
                  label="CPF"
                  register={register}
                  errors={errors}
                  mask="999.999.999-99"
                  required
                />
                <FormInputTextMask
                  name="dependent.birthdate"
                  control={control}
                  label="Data de Nascimento"
                  register={register}
                  errors={errors}
                  mask="99/99/9999"
                />
              </Flex>
              <Box mt="6" boxShadow="xl">
                <S.WrapperDependentsHeader>
                  <Heading
                    as="h2"
                    size="md"
                    color="gray.800"
                    fontFamily="Roboto">
                    Lista de Dependentes para IR
                  </Heading>
                  <Button
                    as="a"
                    size="sm"
                    fontSize="small"
                    colorScheme="red"
                    ml="4"
                    style={{
                      borderRadius: '50px',
                      fontFamily: 'Roboto',
                      fontWeight: 'normal',
                    }}
                    onClick={addDependents}>
                    Adicionar
                  </Button>
                </S.WrapperDependentsHeader>
                <CustomListSimple items={dependents} disableLastDivider />
              </Box>
            </div>

            <S.WrapperFooter>
              <S.BackButton onClick={handleGoBack}>
                <Icon as={IoArrowBack} />
                <Text
                  fontSize="lg"
                  fontWeight="semibold"
                  color={'gray.800'}
                  mx="2">
                  Voltar
                </Text>
              </S.BackButton>
              <Button
                as="a"
                size="lg"
                fontSize="lg"
                colorScheme="red"
                ml="4"
                style={{
                  borderRadius: '50px',
                  fontFamily: 'Roboto',
                  fontSize: '18px',
                  fontWeight: 'normal',
                }}
                onClick={handleSubmit(onSubmit)}>
                Continuar
              </Button>
            </S.WrapperFooter>
          </S.RightSide>
        )
      case 3:
        return (
          <S.RightSide>
            <div>
              <Heading
                fontSize="lg"
                color="gray.800"
                fontFamily="Roboto"
                mb="4">
                Dados para contato
              </Heading>
              <FormInputTextMask
                name="firstPhone"
                control={control}
                label="Celular"
                register={register}
                errors={errors}
                required
                mask="(99) 99999-9999"
              />
              <FormInputTextMask
                name="secondPhone"
                control={control}
                label="Telefone (opcional)"
                register={register}
                errors={errors}
                mask="(99) 9999-9999"
              />
              <FormInputText
                name="email"
                control={control}
                label="E-mail"
                register={register}
                errors={errors}
              />
            </div>

            <S.WrapperFooter>
              <S.BackButton onClick={handleGoBack}>
                <Icon as={IoArrowBack} />
                <Text
                  fontSize="lg"
                  fontWeight="semibold"
                  color={'gray.800'}
                  mx="2">
                  Voltar
                </Text>
              </S.BackButton>
              <Button
                as="a"
                size="lg"
                fontSize="lg"
                colorScheme="red"
                ml="4"
                style={{
                  borderRadius: '50px',
                  fontFamily: 'Roboto',
                  fontSize: '18px',
                  fontWeight: 'normal',
                }}
                onClick={handleSubmit(onSubmit)}>
                Continuar
              </Button>
            </S.WrapperFooter>
          </S.RightSide>
        )
      case 4:
        return (
          <S.RightSide>
            <div>
              <Heading
                fontSize="lg"
                color="gray.800"
                fontFamily="Roboto"
                mb="4">
                Dados de Endereço
              </Heading>
              <FormInputTextMask
                name="employeeAddress.zipCode"
                control={control}
                label="CEP"
                register={register}
                errors={errors}
                mask="99.999-999"
              />
              <FormInputText
                name="employeeAddress.address"
                control={control}
                label="Endereço"
                register={register}
                errors={errors}
              />
              <Flex direction="row">
                <FormInputText
                  name="employeeAddress.number"
                  control={control}
                  label="Nº"
                  register={register}
                  errors={errors}
                />
                <FormInputText
                  name="employeeAddress.neighborhood"
                  control={control}
                  label="Bairro"
                  register={register}
                  errors={errors}
                />
              </Flex>
              <Flex direction="row">
                <FormInputText
                  name="employeeAddress.city"
                  control={control}
                  label="Cidade"
                  register={register}
                  errors={errors}
                />
              </Flex>
              <Flex direction="row">
                <FormInputDropdown
                  name="employeeAddress.state"
                  control={control}
                  label="UF"
                  register={register}
                  errors={errors}
                  options={ufs}
                  required
                />
                <FormInputText
                  name="employeeAddress.nationality"
                  control={control}
                  label="Nacionalidade"
                  register={register}
                  errors={errors}
                />
              </Flex>
            </div>

            <S.WrapperFooter>
              <S.BackButton onClick={handleGoBack}>
                <Icon as={IoArrowBack} />
                <Text
                  fontSize="lg"
                  fontWeight="semibold"
                  color={'gray.800'}
                  mx="2">
                  Voltar
                </Text>
              </S.BackButton>
              <Button
                as="a"
                size="lg"
                fontSize="lg"
                colorScheme="red"
                ml="4"
                style={{
                  borderRadius: '50px',
                  fontFamily: 'Roboto',
                  fontSize: '18px',
                  fontWeight: 'normal',
                }}
                onClick={handleSubmit(onSubmit)}>
                Continuar
              </Button>
            </S.WrapperFooter>
          </S.RightSide>
        )
      case 5:
        return (
          <S.RightSide>
            <Box mt={4}>
              <Heading
                fontSize="22px"
                color="gray.800"
                fontFamily="Roboto"
                mb="4"
                display="flex"
                justifyContent="center">
                Upload de Documentos do Colaborador
              </Heading>
              <Box
                boxShadow="xl"
                style={{
                  borderRadius: '8px',
                  boxShadow:
                    '0px 2px 8px rgba(51, 22, 61, 0.08), 0px 1px 4px rgba(51, 22, 61, 0.12)',
                }}>
                <UploadBox collaboratorId={collaboradorID} />
              </Box>
            </Box>

            <S.WrapperFooter>
              <S.BackButton onClick={handleGoBack}>
                <Icon as={IoArrowBack} />
                <Text
                  fontSize="lg"
                  fontWeight="semibold"
                  color={'gray.800'}
                  mx="2">
                  Voltar
                </Text>
              </S.BackButton>
              <Button
                as="a"
                size="lg"
                fontSize="lg"
                colorScheme="red"
                ml="4"
                style={{
                  borderRadius: '50px',
                  fontFamily: 'Roboto',
                  fontSize: '18px',
                  fontWeight: 'normal',
                }}
                onClick={() => {
                  history.push('/collaborator')
                }}>
                Continuar
              </Button>
            </S.WrapperFooter>
          </S.RightSide>
        )
      default:
        break
    }
  }

  return (
    <Flex direction="column" h="100vh" bg="gray.50">
      <Flex
        width="100%"
        borderBottomStyle="solid"
        borderBottomWidth={1}
        borderColor="gray.100"
        bg="white">
        <Header />
      </Flex>

      <Flex my="8" px="8">
        <SimpleGrid flex="1" gap="6" align="flex-start">
          <Box borderRadius={8} bg="white" boxShadow="sm" p="8">
            <S.WrapperBox>
              <S.LeftSide>
                <Heading
                  fontSize="lg"
                  color="gray.800"
                  fontFamily="Roboto"
                  mb="4">
                  Cadastro
                </Heading>
                <List spacing={3}>
                  {menuItems.map((item, i) => {
                    return (
                      <S.WrapperListItem key={i}>
                        <S.Circle
                          active={step === i || step > i}
                          lastChild={i === menuItems.length - 1}
                        />
                        <Text
                          fontSize="md"
                          color={i === 0 ? 'gray.800' : 'gray.300'}>
                          {item}
                        </Text>
                      </S.WrapperListItem>
                    )
                  })}
                </List>
              </S.LeftSide>
              <S.Divider />
              {renderSteps()}
            </S.WrapperBox>
          </Box>
        </SimpleGrid>
      </Flex>
    </Flex>
  )
}
