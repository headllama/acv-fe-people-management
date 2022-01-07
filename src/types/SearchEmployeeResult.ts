import { DependentViewModel } from './DependentViewModel'
import { Cnh } from './Cnh'
import { Rg } from './Rg'
import { Ctps } from './Ctps'
import { EmployeeAddressViewModel } from './EmployeeAddressViewModel'
import { EBreed, EEducation, EMaritalStatus, EEvaluationPeriod } from './Enum'

export interface SearchEmployeeResult {
  id?: string
  fullName?: string
  cpf?: string
  birthdate?: Date | string
  education?: EEducation | string | number
  breed?: EBreed | string | number
  maritalStatus?: EMaritalStatus | string | number
  motherName?: string
  fatherName?: string
  evaluationPeriod?: EEvaluationPeriod | string | number
  workPeriod?: string
  occupation?: string
  remuneration?: string
  admissionDate?: Date | string
  bankBranch: string | undefined
  bankAccount: string | undefined
  bank: string | undefined
  bankCode: string | undefined
  bankAccountType: string | number
  pixKey: string | undefined
  pixKeyType: string | number
  rg?: Rg
  cnh?: Cnh
  ctps?: Ctps
  pis?: string
  militaryCertificate?: string
  firstPhone?: string
  secondPhone?: string
  isEnabled?: boolean
  deactivationDate?: Date | string
  createdOn?: Date | string
  updatedOn?: Date | string
  dependents?: DependentViewModel[]
  employeeAddress?: EmployeeAddressViewModel
}
