import {
  FormControl,
  FormLabel,
  Input as ChackraInput,
  InputProps as ChakraInputProps,
} from '@chakra-ui/react'

interface InputProps extends ChakraInputProps {
  name: string
  label?: string
}

export function Input({ name, label, ...rest }: InputProps) {
  return (
    <FormControl>
      {!!label && <FormLabel htmlFor="email">E-mail</FormLabel>}
      <ChackraInput
        name={name}
        id={name}
        focusBorderColor="red.500"
        size="lg"
        color="gray.800"
        {...rest}
      />
    </FormControl>
  )
}
