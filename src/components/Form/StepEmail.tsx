import { useState, useCallback, useEffect } from 'react'
import { Input } from './Input'
import { IoLogInOutline } from 'react-icons/io5'
import { Stack, Image, Text, Button, Icon } from '@chakra-ui/react'
import logoImg from '../../assets/logo.png'
import { useAuth } from '../../hooks/useAuth'

type StepEmailProps = {
  _changeCurrentStep: (step: 'next' | 'previous') => void
}

export function StepEmail({ _changeCurrentStep }: StepEmailProps) {
  const [email, setEmail] = useState('')
  const { searchUser } = useAuth()

  function onChangeEmail(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value)
  }

  const handleSignIn = useCallback(async () => {
    await searchUser(email)
  }, [email, searchUser])

  useEffect(() => {
    const user = localStorage.getItem('@Aceville:user')
    if (user) {
      _changeCurrentStep('next')
    }
  }, [_changeCurrentStep])

  return (
    <>
      <Image src={logoImg} alt="Aceville Transportes" mb="10" />
      <Text
        align="center"
        color="gray.400"
        mb="4"
        style={{ fontFamily: "'Inter', sans-serif" }}>
        Entre com seu email para acessar sua conta.
      </Text>

      <Stack spacing="4">
        <Input
          name="email"
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => onChangeEmail(e)}
        />
        <Button
          type="button"
          mt="6"
          size="lg"
          colorScheme="red"
          onClick={handleSignIn}
          leftIcon={<Icon as={IoLogInOutline} w={6} h={6} />}>
          Próximo
        </Button>
      </Stack>
    </>
  )
}
