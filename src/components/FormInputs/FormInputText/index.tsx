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
}: FormInputProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value } }) => (
        <FormControl mt={4} pr={2} isInvalid={errors[name] ? true : false}>
          <FormLabel htmlFor={name}>{label}</FormLabel>
          <Input
            id={name}
            value={value}
            placeholder={label}
            {...register(name, {
              required: 'Campo é obrigatório',
            })}
          />
          <FormErrorMessage>
            {errors[name] && errors[name].message}
          </FormErrorMessage>
        </FormControl>
      )}
    />
  )
}
