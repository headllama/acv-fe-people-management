import { CreateEmployeeAddressInput } from './CreateEmployeeAddressInput'

import { CreateDependentInput } from './CreateDependentInput'

export interface CreateEmployeeInput {
  fullName?: string
  cpf?: string
  birthdate?: string
  education?: string
  breed?: string
  maritalStatus?: string
  motherName?: string
  fatherName?: string
  evaluationPeriod?: string
  workPeriod?: string
  occupation?: string
  remuneration?: string
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
  dependent: {
    fullName: ''
    birthdate: ''
  }
}
