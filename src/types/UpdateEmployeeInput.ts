import { SearchEmployeeResult } from './SearchEmployeeResult'
import { UpdateDependentInput } from './UpdateDependentInput'
import { UpdateEmployeeAddressInput } from './UpdateEmployeeAddressInput'

type UpdateEmployeeInputData = Omit<
  SearchEmployeeResult,
  'id' | 'isEnabled' | 'deactivationDate' | 'createdOn' | 'updatedOn'
>

export type UpdateEmployeeInput = UpdateEmployeeInputData
