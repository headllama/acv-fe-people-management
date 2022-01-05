import { FormErrorMessage, FormLabel, FormControl } from '@chakra-ui/react'
import DatePicker from 'react-datepicker'
import MaskedInput from 'react-maskedinput'

interface Props {
  isClearable?: boolean
  onChange: (date: Date, e: any) => void
  selectedDate: Date | undefined
  showPopperArrow?: boolean
  label: string
  name: string
  errors: any
}

export const FormInputDate = ({
  selectedDate,
  onChange,
  isClearable = false,
  showPopperArrow = false,
  label,
  name,
  errors,
}: Props) => {
  return (
    <FormControl mt={2} pr={2} isInvalid={errors[name] ? true : false}>
      <FormLabel style={{ fontSize: '14px' }} htmlFor={name}>
        {label}
      </FormLabel>

      <DatePicker
        selected={selectedDate}
        onChange={onChange}
        isClearable={isClearable}
        dateFormat="dd/MM/yyyy"
        showPopperArrow={showPopperArrow}
        customInput={<MaskedInput mask="11/11/1111" />}
      />
      <FormErrorMessage>
        {errors[name] && errors[name].message}
      </FormErrorMessage>
    </FormControl>
  )
}
