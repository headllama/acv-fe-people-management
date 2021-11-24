import { CreateEmployeeAddressInput } from './CreateEmployeeAddressInput'

import { CreateDependentInput } from './CreateDependentInput'

export interface CreateEmployeeInput {
  fullName?: string
  cpf?: string
  birthdate?: Date | string
  education?: number
  breed?: number
  maritalStatus?: number
  motherName?: string
  fatherName?: string
  evaluationPeriod?: number
  workPeriod?: string
  occupation?: string
  remuneration?: number
  admissionDate?: Date | string
  rgDocument?: string
  rgIssuer?: string
  rgRegisterDate?: Date | string
  cnhDocument?: string
  cnhCategory?: string
  cnhRegisterDate?: Date | string
  cnhExpiration?: Date | string
  ctpsDocument?: string
  ctpsSeries?: string
  ctpsState?: string
  ctpsRegisterDate?: Date | string
  pis?: string
  militaryCertificate?: string
  firstPhone?: string
  secondPhone?: string
  employeeAddress?: CreateEmployeeAddressInput
  dependents?: CreateDependentInput[]
}
