import { SearchEmployeeResult } from './SearchEmployeeResult'
type UpdateDependentInputData = Pick<
  SearchEmployeeResult,
  'fullName' | 'birthdate' | 'cpf'
>
export interface UpdateDependentInput extends UpdateDependentInputData {
  dependentTypeId: string
}
