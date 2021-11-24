import { CreateFileTypeInput } from './CreateFileTypeInput'
type CreateFileTypeInputData = Omit<CreateFileTypeInput, 'id'>
export interface SearchFilesTypesResult extends CreateFileTypeInputData {
  id: string
}
