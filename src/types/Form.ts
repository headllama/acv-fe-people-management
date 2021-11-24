import { FieldErrors, UseFormRegister } from 'react-hook-form'

export interface FormInputDropdownOptionsProps {
  label: string
  value: string
}

export interface FormInputProps {
  name: string
  control: any
  register: UseFormRegister<any>
  errors: FieldErrors<any>
  label: string
  setValue?: any
  required?: boolean
}

export interface FormInputMaskProps extends FormInputProps {
  mask?: string | Array<string | RegExp>
}

export interface FormInputDropdownProps extends FormInputProps {
  options?: FormInputDropdownOptionsProps[]
}
