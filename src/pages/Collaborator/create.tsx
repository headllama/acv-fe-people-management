import { useEffect, useState } from 'react'

import {
  Box,
  Flex,
  SimpleGrid,
  Heading,
  Text,
  Button,
  Icon,
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionIcon,
  AccordionButton,
  Image,
} from '@chakra-ui/react'
import savingImg from '../../assets/saving.gif'

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
  optionsAccountType,
  optionsPIXType,
} from './options'
import {
  CollaboratorsCreate,
  Dependent,
  UpdateEmployeeInput,
} from '../../types'
import { CustomListSimple } from '../../components/CustomListSimple'
import { api, ibgeApi, viacep } from '../../services/api'
import { useToast } from '@chakra-ui/react'
import { FormInputDate } from '../../components/FormInputs/FormInputDate'
import { FormInputCurrency } from '../../components/FormInputs/FormInputCurrency'
import { UploadBox } from '../../components/UploadBox'

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
  const [birthDate, setBirthDate] = useState<Date>(new Date())
  const [admissionDate, setAdmissionDate] = useState<Date>(new Date())
  const [rgRegisterDate, setRgRegisterDate] = useState<Date>(new Date())
  const [cnhRegisterDate, setCnhRegisterDate] = useState<Date>(new Date())
  const [cnhExpiration, setCnhExpiration] = useState<Date>(new Date())
  const [ctpsRegisterDate, setCtpsRegisterDate] = useState<Date>(new Date())
  const [dependentBirthdate, setDependentBirthdate] = useState<Date>(new Date())

  const [remuneration, setRemuneration] = useState('0,00')

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [defaultValues, setDefaultValues] = useState<CollaboratorsCreate>({
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
      cpf: '',
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
    bankBranch: '',
    bankAccount: '',
    bank: '',
    bankCode: '',
    bankAccountType: '',
    pixKey: '',
    pixKeyType: '',
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
    firstCNH: '',
  })
  const history = useHistory()
  const toast = useToast()

  const [dependents, setDependents] = useState<Dependent[]>([])
  const [ufs, setUfs] = useState<UF[]>([])
  const [collaboradorID, setCollaboradorID] = useState()
  const [loading, setLoading] = useState(false)
  const [collaboratorForm, setCollaboratorForm] =
    useState<UpdateEmployeeInput>()

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
    watch,
    control,
    getValues,
    setError,
    setValue,
    clearErrors,
    formState: { errors },
  } = methods

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (name === 'employeeAddress.zipCode') {
        getAddressByZipCode(value?.employeeAddress?.zipCode || '')
      }
    })
    return () => subscription.unsubscribe()
  }, [watch])

  function getAddressByZipCode(zipcode: string) {
    const zipcodeSemPonto = zipcode.replace(/\./g, '')
    if (zipcode && zipcodeSemPonto.length === 10)
      viacep
        .get(zipcodeSemPonto.replace(/_/g, '') + `/json/`)
        .then((response) => {
          setValue('employeeAddress.address', response.data.logradouro)
          setValue('employeeAddress.neighborhood', response.data.bairro)
          setValue('employeeAddress.city', response.data.localidade)
          setValue('employeeAddress.state', response.data.uf)
        })
  }

  const onSubmit = (data: CollaboratorsCreate) => {
    setLoading(true)
    const dependentsData = dependents.map((dependent) => {
      return {
        fullName: dependent.fullName,
        birthdate: dependentBirthdate,
        cpf: dependent.cpf,
      }
    })

    const collaboratorCreate = {
      fullName: data.fullName,
      cpf: data.cpf,
      birthdate: birthDate,
      education: parseInt(data.education),
      breed: parseInt(data.breed),
      maritalStatus: parseInt(data.maritalStatus),
      motherName: data.motherName,
      fatherName: data.fatherName,
      evaluationPeriod: parseInt(data.evaluationPeriod),
      workPeriod: data.workPeriod,
      occupation: data.occupation,
      remuneration: remuneration,
      admissionDate: admissionDate,

      rg: {
        document: data.rgDocument,
        issuer: data.rgIssuer,
        registerDate: rgRegisterDate,
      },

      cnh: {
        document: data.cnhDocument,
        category: data.cnhCategory,
        registerDate: cnhRegisterDate,
        expiration: cnhExpiration,
        // firstCNH: parseInt(data.firstCNH),
      },

      ctps: {
        document: data.ctpsDocument,
        series: data.ctpsSeries,
        state: data.ctpsState,
        registerDate: ctpsRegisterDate,
      },
      militaryCertificate: data.militaryCertificate,
      pis: data.pis,

      dependents: dependentsData,

      firstPhone: data.firstPhone,
      secondPhone: data.secondPhone,
      // email: ''

      employeeAddress: {
        address: data.employeeAddress.address,
        number: data.employeeAddress.number,
        neighborhood: data.employeeAddress.neighborhood,
        city: data.employeeAddress.city,
        state: data.employeeAddress.state,
        zipCode: data.employeeAddress.zipCode,
        nationality: data.employeeAddress.nationality,
      },

      bankBranch: data.bankBranch,
      bankAccount: data.bankAccount,
      bank: data.bank,
      banckCode: data.bankCode,
      bankAccountType: parseInt(data.bankAccountType),
      pixKey: data.pixKey,
      pixKeyType: parseInt(data.pixKeyType),
    }
    setCollaboratorForm({ ...collaboratorForm, ...collaboratorCreate })
    createCollaborator(collaboratorCreate)
  }

  async function createCollaborator(data: any) {
    await api
      .post('Employees', data)
      .then((response) => {
        setCollaboradorID(response.data.employeeId)
        setLoading(false)
      })
      .catch((error) => {
        setLoading(false)
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

  function addDependents() {
    const { dependent } = getValues()
    if (dependent.fullName) {
      const item = {
        fullName: dependent.fullName,
        birthdate: dependentBirthdate,
        cpf: dependent.cpf,
      }
      setDependents([...dependents, item])
    }
  }

  function removeDependents(index: number) {
    const listaNova = [...dependents]
    listaNova.splice(index, 1)
    setDependents(listaNova)
  }

  function handleGoBack() {
    history.push('/collaborator')
  }

  function renderSteps() {
    return (
      <>
        <S.RightSide>
          <Accordion defaultIndex={[0]} allowMultiple>
            <AccordionItem style={{ borderTop: 'none' }}>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  <Heading
                    fontSize="lg"
                    color="gray.800"
                    fontFamily="Roboto"
                    mb="4">
                    Dados Pessoais
                  </Heading>
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4}>
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
                  <FormInputDate
                    name="birthdate"
                    errors={errors}
                    selectedDate={birthDate}
                    onChange={(e) => {
                      if (!e) {
                        setError('birthdate', {
                          type: 'required',
                          message: 'Campo é obrigatório',
                        })
                      } else {
                        clearErrors(['birthdate'])
                      }
                      setBirthDate(e)
                    }}
                    label="Data Nascimento"
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
                    label="Estado Civil"
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

                  <FormInputCurrency
                    name="remuneration"
                    errors={errors}
                    onChange={(e) => {
                      if (!e) {
                        setError('remuneration', {
                          type: 'required',
                          message: 'Campo é obrigatório',
                        })
                      } else {
                        clearErrors(['remuneration'])
                      }
                      setRemuneration(remuneration)
                    }}
                    label="Salário"
                  />
                </Flex>

                <FormInputDate
                  name="admissionDate"
                  errors={errors}
                  selectedDate={admissionDate}
                  onChange={(e) => {
                    if (!e) {
                      setError('admissionDate', {
                        type: 'required',
                        message: 'Campo é obrigatório',
                      })
                    } else {
                      clearErrors(['admissionDate'])
                    }
                    setAdmissionDate(e)
                  }}
                  label="Data de Admissão"
                />
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  <Heading
                    fontSize="lg"
                    color="gray.800"
                    fontFamily="Roboto"
                    my="4">
                    Documentos Legais
                  </Heading>
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4}>
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
                  <FormInputDate
                    name="rgRegisterDate"
                    errors={errors}
                    selectedDate={rgRegisterDate}
                    onChange={(e) => {
                      if (!e) {
                        setError('rgRegisterDate', {
                          type: 'required',
                          message: 'Campo é obrigatório',
                        })
                      } else {
                        clearErrors(['rgRegisterDate'])
                      }
                      setRgRegisterDate(e)
                    }}
                    label="Data de Emissão"
                  />
                </Flex>
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

                  <FormInputDate
                    name="cnhRegisterDate"
                    errors={errors}
                    selectedDate={cnhRegisterDate}
                    onChange={(e) => {
                      if (!e) {
                        setError('cnhRegisterDate', {
                          type: 'required',
                          message: 'Campo é obrigatório',
                        })
                      } else {
                        clearErrors(['cnhRegisterDate'])
                      }
                      setCnhRegisterDate(e)
                    }}
                    label="Data de Emissão"
                  />

                  <FormInputDate
                    name="cnhExpiration"
                    errors={errors}
                    selectedDate={cnhExpiration}
                    onChange={(e) => {
                      if (!e) {
                        setError('cnhExpiration', {
                          type: 'required',
                          message: 'Campo é obrigatório',
                        })
                      } else {
                        clearErrors(['cnhExpiration'])
                      }
                      setCnhExpiration(e)
                    }}
                    label="Validade da CNH"
                  />
                </Flex>
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

                  <FormInputDate
                    name="ctpsRegisterDate"
                    errors={errors}
                    selectedDate={ctpsRegisterDate}
                    onChange={(e) => {
                      if (!e) {
                        setError('ctpsRegisterDate', {
                          type: 'required',
                          message: 'Campo é obrigatório',
                        })
                      } else {
                        clearErrors(['ctpsRegisterDate'])
                      }
                      setCtpsRegisterDate(e)
                    }}
                    label="Data de Emissão CTPS"
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
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    <Heading
                      fontSize="lg"
                      color="gray.800"
                      fontFamily="Roboto"
                      my="4">
                      Dependentes
                    </Heading>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <FormInputText
                  name="dependent.fullName"
                  control={control}
                  label="Nome do dependente"
                  register={register}
                  errors={errors}
                />
                <Flex direction="row">
                  <FormInputTextMask
                    name="dependent.cpf"
                    control={control}
                    label="CPF"
                    register={register}
                    errors={errors}
                    mask="999.999.999-99"
                  />
                  <FormInputDate
                    name="dependent.birthdate"
                    errors={errors}
                    selectedDate={dependentBirthdate}
                    onChange={(e) => {
                      if (!e) {
                        setError('dependent.birthdate', {
                          type: 'required',
                          message: 'Campo é obrigatório',
                        })
                      } else {
                        clearErrors(['dependent.birthdate'])
                      }
                      setDependentBirthdate(e)
                    }}
                    label="Data de Nascimento"
                  />
                </Flex>
                <Box mt="6" boxShadow="xl">
                  <S.WrapperDependentsHeader>
                    <Heading
                      fontSize="lg"
                      color="gray.800"
                      fontFamily="Roboto"
                      my="4">
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
                  <CustomListSimple
                    items={dependents}
                    disableLastDivider
                    handleRemove={removeDependents}
                  />
                </Box>
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  <Heading
                    fontSize="lg"
                    color="gray.800"
                    fontFamily="Roboto"
                    my="4">
                    Dados para contato
                  </Heading>
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4}>
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
                {/* <FormInputText
                name="email"
                control={control}
                label="E-mail"
                register={register}
                errors={errors}
              /> */}
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  <Heading
                    fontSize="lg"
                    color="gray.800"
                    fontFamily="Roboto"
                    my="4">
                    Dados de Endereço
                  </Heading>
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4}>
                <FormInputTextMask
                  name="employeeAddress.zipCode"
                  control={control}
                  label="CEP"
                  register={register}
                  errors={errors}
                  required
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
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  <Heading
                    fontSize="lg"
                    color="gray.800"
                    fontFamily="Roboto"
                    my="4">
                    Dados Bancários
                  </Heading>
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4}>
                <Flex direction="row">
                  <FormInputText
                    name="bank"
                    control={control}
                    label="Banco"
                    register={register}
                    errors={errors}
                  />
                  <FormInputText
                    name="banckCode"
                    control={control}
                    label="Cód. Banco"
                    register={register}
                    errors={errors}
                  />
                </Flex>

                <Flex direction="row">
                  <FormInputText
                    name="bankBranch"
                    control={control}
                    label="Agência"
                    register={register}
                    errors={errors}
                  />
                  <FormInputText
                    name="bankAccount"
                    control={control}
                    label="Conta"
                    register={register}
                    errors={errors}
                  />
                  <FormInputDropdown
                    name="bankAccountType"
                    control={control}
                    label="Tipo de conta"
                    register={register}
                    errors={errors}
                    options={optionsAccountType}
                    required
                  />
                </Flex>

                <Flex direction="row">
                  <FormInputText
                    name="pixKey"
                    control={control}
                    label="Chave PIX"
                    register={register}
                    errors={errors}
                  />
                  <FormInputDropdown
                    name="pixKeyType"
                    control={control}
                    label="Tipo PIX"
                    register={register}
                    errors={errors}
                    options={optionsPIXType}
                    required
                  />
                </Flex>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>

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
              Salvar
            </Button>
          </S.WrapperFooter>
        </S.RightSide>
      </>
    )
  }

  return (
    <Flex direction="column" bg="gray.50">
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
          {loading ? (
            <Box
              borderRadius={8}
              bg="white"
              boxShadow="sm"
              p="8"
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column">
              <Text color="purple.900" fontSize="lg" mb="4">
                Aguarde um momento, estamos cadastrando o colaborador!
              </Text>
              <Image src={savingImg} alt="Salvando" width="200px" />
            </Box>
          ) : collaboradorID ? (
            <Box borderRadius={8} bg="white" boxShadow="sm" p="8">
              <Heading
                fontSize="lg"
                color="gray.800"
                fontFamily="Roboto"
                my="4">
                Upload de Documentos do Colaborador
              </Heading>
              <Text color="purple.900" fontSize="lg" mb="4">
                Colaborador cadastrado com sucesso! Agora só falta adicionar os
                documentos!
              </Text>
              <Box
                boxShadow="xl"
                style={{
                  borderRadius: '8px',
                  boxShadow:
                    '0px 2px 8px rgba(51, 22, 61, 0.08), 0px 1px 4px rgba(51, 22, 61, 0.12)',
                }}>
                <UploadBox collaboratorId={collaboradorID} />
              </Box>
              <S.WrapperFooter>
                <S.BackButton onClick={handleGoBack}>
                  <Icon as={IoArrowBack} />
                  <Text
                    fontSize="lg"
                    fontWeight="semibold"
                    color={'gray.800'}
                    mx="2">
                    Sair
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
                  onClick={handleGoBack}>
                  Salvar
                </Button>
              </S.WrapperFooter>
            </Box>
          ) : (
            <Box borderRadius={8} bg="white" boxShadow="sm" p="8">
              <S.WrapperBox>{renderSteps()}</S.WrapperBox>
            </Box>
          )}
        </SimpleGrid>
      </Flex>
    </Flex>
  )
}
