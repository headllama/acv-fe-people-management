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

export const FormInputDropdownNoValidation: React.FC<FormInputDropdownProps> =
  ({ name, control, label, register, errors, options }) => {
    const generateSingleOptions = () => {
      return options
        ? options.map((option: FormInputDropdownOptionsProps, index) => {
            return (
              <option
                selected={index === 0}
                key={option.value}
                value={option.value}>
                {option.label}
              </option>
            )
          })
        : null
    }

    return (
      <FormControl
        size={'small'}
        mt={2}
        pr={2}
        isInvalid={errors[name] ? true : false}>
        <FormLabel style={{ fontSize: '14px' }}>{label}</FormLabel>
        <Controller
          control={control}
          name={name}
          render={({ field: { value } }) => (
            <Select
              {...register(name)}
              value={value}
              placeholder="Selecione uma opção">
              {generateSingleOptions()}
            </Select>
          )}
        />
        <FormErrorMessage>
          {errors[name] && errors[name].message}
        </FormErrorMessage>
      </FormControl>
    )
  }
