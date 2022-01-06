import { FormErrorMessage, FormLabel, FormControl } from '@chakra-ui/react'
import CurrencyInput from 'react-currency-input-field'

interface Props {
  onChange: (e: any) => void
  label: string
  name: string
  errors: any
}

export const FormInputCurrency = ({ onChange, label, name, errors }: Props) => {
  return (
    <FormControl mt={2} pr={2} isInvalid={errors[name] ? true : false}>
      <FormLabel style={{ fontSize: '14px' }} htmlFor={name}>
        {label}
      </FormLabel>

      <CurrencyInput
        intlConfig={{ locale: 'pt-BR', currency: 'BRL' }}
        id={name}
        name={name}
        decimalSeparator=","
        groupSeparator="."
        decimalScale={2}
        defaultValue={0}
        style={{
          border: '1px solid #9699B0 ',
          borderRadius: '6px',
          width: '100%',
          padding: '7px',
        }}
        onValueChange={(value, name) => {
          onChange(value)
          console.log(value, name)
        }}
      />
      <FormErrorMessage>
        {errors[name] && errors[name].message}
      </FormErrorMessage>
    </FormControl>
  )
}
