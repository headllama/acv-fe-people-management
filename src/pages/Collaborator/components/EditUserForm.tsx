/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable array-callback-return */
import { useCallback, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { IoArrowBack } from 'react-icons/io5'
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
  useToast,
} from '@chakra-ui/react'

import { Header } from '../../../components/Header'
import { api, ibgeApi, viacep } from '../../../services/api'
import { FormInputText } from '../../../components/FormInputs/FormInputText'
import { FormInputTextMask } from '../../../components/FormInputs/FormInputTextMask'
import { FormInputDropdownNoValidation } from '../../../components/FormInputs/FormInputDropdownNoValidation'
import { CustomListSimple } from '../../../components/CustomListSimple'
import { FormInputDate } from '../../../components/FormInputs/FormInputDate'
import { FormInputCurrency } from '../../../components/FormInputs/FormInputCurrency'
import {
  optionsBreed,
  optionsEducation,
  optionsMaritalStatus,
  optionsPeriodAgreement,
  optionsAccountType,
  optionsPIXType,
  optionsFirstCNH,
} from '../options'
import type { CollaboratorsCreate, Dependent } from '../../../types'
import * as S from '../styles'

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

type EditUserFormProps = {
  collaborator: CollaboratorsCreate
  id: string
}

export const EditUserForm = ({ collaborator, id }: EditUserFormProps) => {
  const history = useHistory()
  const toast = useToast()

  const [birthDate, setBirthDate] = useState<Date>(
    new Date(collaborator?.birthdate ? collaborator?.birthdate : new Date())
  )
  const [admissionDate, setAdmissionDate] = useState<Date>(
    new Date(
      collaborator?.admissionDate ? collaborator?.admissionDate : new Date()
    )
  )
  const [rgRegisterDate, setRgRegisterDate] = useState<Date>(new Date())
  const [cnhRegisterDate, setCnhRegisterDate] = useState<Date>(
    new Date(
      collaborator.cnh?.registerDate
        ? collaborator?.cnh.registerDate
        : new Date()
    )
  )
  const [cnhExpiration, setCnhExpiration] = useState<Date>(
    new Date(
      collaborator.cnh?.expiration ? collaborator?.cnh.expiration : new Date()
    )
  )
  const [ctpsRegisterDate, setCtpsRegisterDate] = useState<Date>(
    new Date(
      collaborator.ctps?.registerDate
        ? collaborator.ctps?.registerDate
        : new Date()
    )
  )
  const [dependentBirthdate, setDependentBirthdate] = useState<Date>(new Date())
  const [remuneration, setRemuneration] = useState(collaborator?.remuneration)
  const [dependents, setDependents] = useState<Dependent[]>(
    collaborator?.dependents || []
  )
  const [ufs, setUfs] = useState<UF[]>([])
  const [collaboratorForm, setCollaboratorForm] = useState<any>()

  const methods = useForm<CollaboratorsCreate>({
    defaultValues: collaborator,
  })

  const {
    handleSubmit,
    register,
    watch,
    control,
    getValues,
    setValue,
    formState: { errors, isSubmitting },
  } = methods

  useEffect(() => {
    console.log(collaborator, 'colaborador')
  }, [collaborator])

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

  const formatDropdown = useCallback(() => {
    const breedIndex = optionsBreed.findIndex(
      (arr) => arr.label === collaborator.breed
    )
    const maritalStatusIndex = optionsMaritalStatus.findIndex(
      (arr) => arr.label === collaborator.maritalStatus
    )
    const evaluationPeriodIndex = optionsPeriodAgreement.findIndex(
      (arr) => arr.label === collaborator.evaluationPeriod
    )
    const educationIndex = optionsEducation.findIndex(
      (arr) => arr.label === collaborator.education
    )
    const pixKeyTypeIndex = optionsPIXType.findIndex(
      (arr) => arr.label === collaborator.pixKeyType
    )
    const accountTypeIndex = optionsAccountType.findIndex(
      (arr) => arr.label === collaborator.bankAccountType
    )

    setValue('breed', optionsBreed[breedIndex].value)
    setValue('maritalStatus', optionsMaritalStatus[maritalStatusIndex].value)
    setValue('education', optionsEducation[educationIndex]?.value)
    setValue('pixKeyType', optionsPIXType[pixKeyTypeIndex].value)

    setValue('bankAccountType', optionsAccountType[accountTypeIndex].value)
    setValue(
      'evaluationPeriod',
      optionsPeriodAgreement[evaluationPeriodIndex].value
    )
  }, [
    collaborator.bankAccountType,
    collaborator.breed,
    collaborator.education,
    collaborator.evaluationPeriod,
    collaborator.maritalStatus,
    collaborator.pixKeyType,
    setValue,
  ])

  useEffect(() => {
    formatDropdown()
  }, [formatDropdown])

  const getAddressByZipCode = useCallback(
    (zipcode: string) => {
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
    },
    [setValue]
  )

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === 'employeeAddress.zipCode') {
        getAddressByZipCode(value?.employeeAddress?.zipCode || '')
      }
    })

    return () => subscription.unsubscribe()
  }, [getAddressByZipCode, watch])

  const onSubmit = (data: CollaboratorsCreate) => {
    const dependentsData = dependents.map((dependent) => ({
      fullName: dependent.fullName,
      birthdate: dependent.birthdate,
      cpf: dependent.cpf,
    }))

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
      remuneration,
      admissionDate,

      rgDocument: data?.rg?.document,
      rgIssuer: data?.rg?.issuer,
      rgRegisterDate,

      cnhDocument: data?.cnh?.document,
      cnhCategory: data?.cnh?.category,
      cnhRegisterDate,
      cnhExpiration,

      ctpsDocument: data.ctps?.document,
      ctpsSeries: data.ctps?.series,
      ctpsState: data.ctps?.state,
      ctpsRegisterDate: data.ctps?.registerDate,

      militaryCertificate: data.militaryCertificate,
      pis: data.pis,

      dependents: dependentsData,

      firstPhone: data.firstPhone,
      secondPhone: data.secondPhone,
      email: data.email,

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
      bankCode: data.bankCode,
      bankAccountType: parseInt(data.bankAccountType),
      pixKey: data.pixKey,
      pixKeyType: parseInt(data.pixKeyType),
    }

    setCollaboratorForm({ ...collaboratorForm, ...collaboratorCreate })
    editCollaborator(collaboratorCreate, id)
  }

  async function editCollaborator(data: any, id: string) {
    await api
      .patch(`/Employees/${id}`, data)
      .then(() => {
        toast({
          title: 'Edição concluída com sucesso!!',
          status: 'success',
          position: 'top',
        })

        history.push('/collaborator')
      })
      .catch((error) => {
        toast({
          title: 'Preencha todos os campos',
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'top',
        })
      })
  }

  function addDependents() {
    const { dependent } = getValues()
    if (!dependent.fullName) return

    const item = {
      fullName: dependent.fullName,
      birthdate: dependentBirthdate,
      cpf: dependent.cpf,
    }
    setDependents([...dependents, item])

    setValue('dependent.fullName', '')
    setValue('dependent.cpf', '')
  }

  function removeDependents(index: number) {
    const newDependents = [...dependents]
    newDependents.splice(index, 1)
    setDependents(newDependents)
  }

  function handleGoBack() {
    history.push('/collaborator')
  }

  function renderSteps() {
    return (
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
              />
              <Flex direction="row">
                <FormInputTextMask
                  name="cpf"
                  control={control}
                  label="CPF"
                  register={register}
                  errors={errors}
                  mask="999.999.999-99"
                />
                <FormInputDate
                  name="birthdate"
                  errors={errors}
                  selectedDate={birthDate}
                  onChange={(e) => setBirthDate(e)}
                  label="Data Nascimento"
                />
              </Flex>
              <FormInputDropdownNoValidation
                name="education"
                control={control}
                label="Escolaridade"
                register={register}
                errors={errors}
                options={optionsEducation}
              />
              <Flex direction="row">
                <FormInputDropdownNoValidation
                  name="breed"
                  control={control}
                  label="Raça"
                  register={register}
                  errors={errors}
                  options={optionsBreed}
                />
                <FormInputDropdownNoValidation
                  name="maritalStatus"
                  control={control}
                  label="Estado Civil"
                  register={register}
                  errors={errors}
                  options={optionsMaritalStatus}
                />
              </Flex>
              <Flex direction="row">
                <FormInputText
                  name="motherName"
                  control={control}
                  label="Nome da mãe"
                  register={register}
                  errors={errors}
                />
                <FormInputText
                  name="fatherName"
                  control={control}
                  label="Nome do pai"
                  register={register}
                  errors={errors}
                />
              </Flex>
              <Flex direction="row">
                <FormInputDropdownNoValidation
                  name="evaluationPeriod"
                  control={control}
                  label="Contrato de experiência"
                  register={register}
                  errors={errors}
                  options={optionsPeriodAgreement}
                />
                <FormInputText
                  name="workPeriod"
                  control={control}
                  label="Horário de Trabalho"
                  register={register}
                  errors={errors}
                />
              </Flex>
              <Flex direction="row">
                <FormInputText
                  name="occupation"
                  control={control}
                  label="Cargo/Função"
                  register={register}
                  errors={errors}
                />

                <FormInputCurrency
                  name="remuneration"
                  errors={errors}
                  value={remuneration}
                  onChange={(e) => setRemuneration(e)}
                  label="Salário"
                />
              </Flex>

              <FormInputDate
                name="admissionDate"
                errors={errors}
                selectedDate={admissionDate}
                onChange={(e) => setAdmissionDate(e)}
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
                  name="rg.document"
                  control={control}
                  label="Documento de identidade"
                  register={register}
                  errors={errors}
                />
                <FormInputText
                  name="rg.issuer"
                  control={control}
                  label="Emissor"
                  register={register}
                  errors={errors}
                />
              </Flex>
              <Flex direction="row">
                <FormInputDropdownNoValidation
                  name="employeeAddress.state"
                  control={control}
                  label="UF"
                  register={register}
                  errors={errors}
                  options={ufs}
                />
                <FormInputDate
                  name="rgRegisterDate"
                  errors={errors}
                  selectedDate={rgRegisterDate}
                  onChange={(e) => setRgRegisterDate(e)}
                  label="Data de Emissão"
                />
              </Flex>
              <Flex direction="row">
                <FormInputText
                  name="cnh.document"
                  control={control}
                  label="CNH"
                  register={register}
                  errors={errors}
                />

                <FormInputText
                  name="cnh.category"
                  control={control}
                  label="Categoria"
                  register={register}
                  errors={errors}
                />
              </Flex>
              <Flex direction="row">
                <FormInputDropdownNoValidation
                  name="firstCNH"
                  control={control}
                  label="Primeira Habilitação"
                  register={register}
                  errors={errors}
                  options={optionsFirstCNH}
                />

                <FormInputDate
                  name="cnhRegisterDate"
                  errors={errors}
                  selectedDate={cnhRegisterDate}
                  onChange={(e) => setCnhRegisterDate(e)}
                  label="Data de Emissão"
                />

                <FormInputDate
                  name="cnhExpiration"
                  errors={errors}
                  selectedDate={cnhExpiration}
                  onChange={(e) => setCnhExpiration(e)}
                  label="Validade da CNH"
                />
              </Flex>
              <Flex direction="row">
                <FormInputText
                  name="ctps.document"
                  control={control}
                  label="Carteira de Trabalho"
                  register={register}
                  errors={errors}
                />
                <FormInputText
                  name="ctps.series"
                  control={control}
                  label="Série"
                  register={register}
                  errors={errors}
                />
              </Flex>
              <Flex direction="row">
                <FormInputDropdownNoValidation
                  name="ctps.state"
                  control={control}
                  label="UF"
                  register={register}
                  errors={errors}
                  options={ufs}
                />

                <FormInputDate
                  name="ctps.registerDate"
                  errors={errors}
                  selectedDate={ctpsRegisterDate}
                  onChange={(e) => setCtpsRegisterDate(e)}
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
                  onChange={(e) => setDependentBirthdate(e)}
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
                <FormInputDropdownNoValidation
                  name="employeeAddress.state"
                  control={control}
                  label="UF"
                  register={register}
                  errors={errors}
                  options={ufs}
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
                  name="bankCode"
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
                <FormInputDropdownNoValidation
                  name="bankAccountType"
                  control={control}
                  label="Tipo de conta"
                  register={register}
                  errors={errors}
                  options={optionsAccountType}
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
                <FormInputDropdownNoValidation
                  name="pixKeyType"
                  control={control}
                  label="Tipo PIX"
                  register={register}
                  errors={errors}
                  options={optionsPIXType}
                />
              </Flex>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>

        <S.WrapperFooter>
          <S.BackButton onClick={handleGoBack}>
            <Icon as={IoArrowBack} />
            <Text fontSize="lg" fontWeight="semibold" color={'gray.800'} mx="2">
              Voltar
            </Text>
          </S.BackButton>
          <Button
            onClick={handleSubmit(onSubmit)}
            isLoading={isSubmitting}
            size="lg"
            fontSize="lg"
            colorScheme="red"
            ml="4"
            style={{
              borderRadius: '50px',
              fontFamily: 'Roboto',
              fontSize: '18px',
              fontWeight: 'normal',
            }}>
            Salvar
          </Button>
        </S.WrapperFooter>
      </S.RightSide>
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

      <Flex justifyContent="center" my="8" px="8">
        <SimpleGrid
          width="100%"
          maxWidth="1400px"
          flex="1"
          gap="6"
          align="flex-start">
          <Flex
            mb="2"
            flex="1"
            borderRadius={8}
            bg="white"
            p="8"
            justifyContent="space-between"
            alignItems="center">
            <Text>
              Você está editando o usuário {''}
              <span style={{ fontWeight: 'bold' }}>
                {collaborator?.fullName}
              </span>
            </Text>
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
          </Flex>
          <Box borderRadius={8} bg="white" boxShadow="sm" p="8">
            <S.WrapperBox>{renderSteps()}</S.WrapperBox>
          </Box>
        </SimpleGrid>
      </Flex>
    </Flex>
  )
}
