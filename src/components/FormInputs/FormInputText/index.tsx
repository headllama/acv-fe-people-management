import { Controller } from 'react-hook-form'

import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
} from '@chakra-ui/react'

import { FormInputProps } from '../../../types'

export const FormInputText = ({
  name,
  control,
  label,
  register,
  errors,
  required = false,
  validations,
}: FormInputProps) => {
  const inputValidation = required
    ? { required: 'Campo é obrigatório' }
    : { ...validations }

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value } }) => (
        <FormControl mt={2} pr={2} isInvalid={errors[name] ? true : false}>
          <FormLabel style={{ fontSize: '14px' }} htmlFor={name}>
            {label}
          </FormLabel>
          <Input
            id={name}
            value={value}
            placeholder={label}
            {...register(name, inputValidation)}
          />
          <FormErrorMessage>
            {errors[name] && errors[name].message}
          </FormErrorMessage>
        </FormControl>
      )}
    />
  )
}
