import { useState } from 'react'

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
import { api } from '../../services/api'

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
  remuneration: 0,
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

export function CollaboratorCreate() {
  const history = useHistory()
  const [step, setStep] = useState(0)
  const [dependents, setDependents] = useState<Dependent[]>([])

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
    updateStep()
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
      }
      setDependents([...dependents, item])
    }
  }

  function updateStep() {
    const formatedStep = step
    setStep(formatedStep + 1)
    if (step === 5) console.log('last one')
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
              label="Nome do assinante"
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
              <FormInputTextMask
                name="birthdate"
                control={control}
                label="Data Nascimento"
                register={register}
                errors={errors}
                mask="99/99/9999"
              />
            </Flex>
            <FormInputDropdown
              name="education"
              control={control}
              label="Escolaridade"
              register={register}
              errors={errors}
              options={optionsEducation}
            />
            <Flex direction="row">
              <FormInputDropdown
                name="breed"
                control={control}
                label="Raça"
                register={register}
                errors={errors}
                options={optionsBreed}
              />
              <FormInputDropdown
                name="maritalStatus"
                control={control}
                label="Estado Civi"
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
              <FormInputDropdown
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
              <FormInputText
                name="remuneration"
                control={control}
                label="Salário"
                register={register}
                errors={errors}
              />
            </Flex>
            <FormInputTextMask
              name="admissionDate"
              control={control}
              label="Data de Admissão"
              register={register}
              errors={errors}
              mask="99/99/9999"
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
              />
              <FormInputText
                name="rgIssuer"
                control={control}
                label="Emissor"
                register={register}
                errors={errors}
              />
            </Flex>
            <Flex direction="row">
              <FormInputText
                name="rgUf"
                control={control}
                label="UF"
                register={register}
                errors={errors}
              />
              <FormInputTextMask
                name="rgRegisterDate"
                control={control}
                label="Data de Emissão"
                register={register}
                errors={errors}
                mask="99/99/9999"
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
              <FormInputTextMask
                name="cnhExpiration"
                control={control}
                label="Validade da CNH"
                register={register}
                errors={errors}
                mask="99/99/9999"
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
              <FormInputText
                name="ctpsState"
                control={control}
                label="UF"
                register={register}
                errors={errors}
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
                <FormInputDropdown
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
                />
                <FormInputTextMask
                  name="dependent.admissionDate"
                  control={control}
                  label="Data de Admissão"
                  register={register}
                  errors={errors}
                  mask="99/99/9999"
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
              <FormInputText
                name="employeeAddress.address"
                control={control}
                label="E-mail"
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
                <FormInputText
                  name="employeeAddress.state"
                  control={control}
                  label="UF"
                  register={register}
                  errors={errors}
                />
              </Flex>
              <Flex direction="row">
                <FormInputTextMask
                  name="employeeAddress.zipCode"
                  control={control}
                  label="CEP"
                  register={register}
                  errors={errors}
                  mask="99.999-999"
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
            <div>
              <Heading
                fontSize="lg"
                color="gray.800"
                fontFamily="Roboto"
                mb="4">
                Upload de Documentos do Colaborador
              </Heading>
              <FormControl mt={4}>
                <FormLabel>Endereço</FormLabel>
                <Input placeholder="Endereço" />
              </FormControl>
              <Flex direction="row">
                <FormControl mt={4} pr={2}>
                  <FormLabel>Nº</FormLabel>
                  <Input placeholder="Nº" />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Bairro</FormLabel>
                  <Input placeholder="Bairro" />
                </FormControl>
              </Flex>
              <Flex direction="row">
                <FormControl mt={4} pr={2}>
                  <FormLabel>Cidade</FormLabel>
                  <Input placeholder="Cidade" />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>UF</FormLabel>
                  <Input placeholder="UF" />
                </FormControl>
              </Flex>
              <Flex direction="row">
                <FormControl mt={4} pr={2}>
                  <FormLabel>CEP</FormLabel>
                  <Input placeholder="CEP" />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Nacionalidade</FormLabel>
                  <Input placeholder="Nacionalidade" />
                </FormControl>
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
