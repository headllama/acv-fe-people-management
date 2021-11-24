import React from 'react'

import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Select,
} from '@chakra-ui/react'
import { Controller } from 'react-hook-form'
import {
  FormInputDropdownProps,
  FormInputDropdownOptionsProps,
} from '../../../types'

export const FormInputDropdown: React.FC<FormInputDropdownProps> = ({
  name,
  control,
  label,
  register,
  errors,
  options,
}) => {
  const generateSingleOptions = () => {
    return options
      ? options.map((option: FormInputDropdownOptionsProps) => {
          return (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          )
        })
      : null
  }

  return (
    <FormControl
      size={'small'}
      mt={4}
      pr={2}
      isInvalid={errors[name] ? true : false}>
      <FormLabel>{label}</FormLabel>
      <Controller
        render={({ field: { value } }) => (
          <Select
            placeholder="Selecione uma opção"
            value={value}
            {...register(name, {
              required: 'Campo é obrigatório',
            })}>
            {generateSingleOptions()}
          </Select>
        )}
        control={control}
        name={name}
      />
      <FormErrorMessage>
        {errors[name] && errors[name].message}
      </FormErrorMessage>
    </FormControl>
  )
}
