import { Controller } from 'react-hook-form'

import { FormInputMaskProps } from '../../../types'

import InputMask from 'react-input-mask'

import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
} from '@chakra-ui/react'

export const FormInputTextMask = ({
  name,
  control,
  label,
  mask = '',
  register,
  errors,
}: FormInputMaskProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <InputMask mask={mask} value={value} onChange={onChange}>
          {() => (
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
        </InputMask>
      )}
    />
  )
}
