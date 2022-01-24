import { FormErrorMessage, FormLabel, FormControl } from '@chakra-ui/react'
import CurrencyInput, { CurrencyInputProps } from 'react-currency-input-field'

interface Props extends CurrencyInputProps {
  onChange: (e: any) => void
  label: string
  name: string
  errors: any
}

export const FormInputCurrency = ({
  onChange,
  label,
  name,
  errors,
  ...rest
}: Props) => {
  return (
    <FormControl mt={2} pr={2} isInvalid={errors[name] ? true : false}>
      <FormLabel style={{ fontSize: '14px' }} htmlFor={name}>
        {label}
      </FormLabel>

      <CurrencyInput
        {...rest}
        intlConfig={{ locale: 'pt-BR', currency: 'BRL' }}
        id={name}
        name={name}
        decimalSeparator=","
        groupSeparator="."
        decimalScale={2}
        style={{
          border: '1px solid #9699B0 ',
          borderRadius: '6px',
          width: '100%',
          padding: '7px',
        }}
        onValueChange={(value) => onChange(value)}
      />
      <FormErrorMessage>
        {errors[name] && errors[name].message}
      </FormErrorMessage>
    </FormControl>
  )
}
