import { ReactNode } from 'react'
import { Rg } from './Rg'
import { Cnh } from './Cnh'
import { Ctps } from './Ctps'

export type { ApiError } from './ApiError'
export type { ApiErrorDetail } from './ApiErrorDetail'
export type { ApiErrorDetailProperty } from './ApiErrorDetailProperty'
export type { AuthenticateInput } from './AuthenticateInput'
export type { AuthenticateResult } from './AuthenticateResult'
export type { Cnh } from './Cnh'
export type { CreateDependentInput } from './CreateDependentInput'
export type { CreateEmployeeAddressInput } from './CreateEmployeeAddressInput'
export type { CreateEmployeeInput } from './CreateEmployeeInput'
export type { CreateEmployeeResult } from './CreateEmployeeResult'
export type { CreateFileTypeInput } from './CreateFileTypeInput'
export type { CreateUserInput } from './CreateUserInput'
export type { CreateUserResult } from './CreateUserResult'
export type { Ctps } from './Ctps'
export type { DependentViewModel } from './DependentViewModel'
export type { EmployeeAddressViewModel } from './EmployeeAddressViewModel'
export type {
  EBreed,
  EEducation,
  EEvaluationPeriod,
  EMaritalStatus,
} from './Enum'
export type {
  FormInputDropdownOptionsProps,
  FormInputProps,
  FormInputMaskProps,
  FormInputDropdownProps,
} from './Form'
export type { GetEmployeeResult } from './GetEmployeeResult'
export type { Rg } from './Rg'
export type { SearchEmployeeFilesResult } from './SearchEmployeeFilesResult'
export type { SearchEmployeeResult } from './SearchEmployeeResult'
export type { SearchFilesTypesResult } from './SearchFilesTypesResult'
export type { SearchUserResult } from './SearchUserResult'
export type { UpdateDependentInput } from './UpdateDependentInput'
export type { UpdateEmployeeAddressInput } from './UpdateEmployeeAddressInput'
export type { UpdateEmployeeInput } from './UpdateEmployeeInput'

export type children = { children: ReactNode }

export interface Dependent {
  fullName: string
  birthdate: Date | string
  cpf?: string
}

export interface EmployeeAddress {
  address: string
  number: string
  neighborhood: string
  city: string
  state: string
  zipCode: string
  nationality: string
}

export interface Collaborators {
  fullName: string
  cpf: string
  birthdate: Date | string
  education: string
  breed: string
  maritalStatus: string
  motherName: string
  fatherName: string
  evaluationPeriod: string
  workPeriod: string
  occupation: string
  remuneration: number
  admissionDate: Date | string
  pis: string
  militaryCertificate: string
  firstPhone: string
  secondPhone: string
  dependents: Dependent[]
  employeeAddress: EmployeeAddress
}

export interface CollaboratorsCreate extends Collaborators {
  rgDocument: string
  rgIssuer: string
  rgRegisterDate: Date | string
  cnhDocument: string
  cnhCategory: string
  cnhRegisterDate: Date | string
  cnhExpiration: Date | string
  ctpsDocument: string
  ctpsSeries: string
  ctpsState: string
  ctpsRegisterDate: Date | string
  dependent: {
    fullName: string
    birthdate: Date | string
  }
}

export interface CollaboratorsGet extends Collaborators {
  id: string
  rg: Rg
  cnh: Cnh
  ctps: Ctps
  isEnabled: boolean
  deactivationDate: Date | string
  createdOn: Date | string
  updatedOn: Date | string
}

export type CollaboratorsType = Pick<CollaboratorsGet, 'id' | 'fullName'>
