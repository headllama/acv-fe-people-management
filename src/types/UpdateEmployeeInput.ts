import { SearchEmployeeResult } from './SearchEmployeeResult'
import { UpdateDependentInput } from './UpdateDependentInput'
import { UpdateEmployeeAddressInput } from './UpdateEmployeeAddressInput'

type UpdateEmployeeInputData = Omit<
  SearchEmployeeResult,
  | 'id'
  | 'isEnabled'
  | 'deactivationDate'
  | 'createdOn'
  | 'updatedOn'
  | 'employeeAddress'
  | 'dependents'
>

export interface UpdateEmployeeInput extends UpdateEmployeeInputData {
  employeeAddress?: UpdateEmployeeAddressInput
  dependents?: UpdateDependentInput[]
}
