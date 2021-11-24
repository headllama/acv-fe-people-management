import { useCallback, useState } from 'react'
import { Avatar, Heading, Stack, Text, Button, Icon } from '@chakra-ui/react'
import { Input } from './Input'
import { IoLogInOutline } from 'react-icons/io5'
import { useAuth } from '../../hooks/useAuth'

export function StepPassword() {
  const [password, setPassword] = useState('')

  const { user, signIn } = useAuth()

  function onChangePassword(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value)
  }

  const handleSignIn = useCallback(async () => {
    await signIn({ email: user.email, password })
  }, [password, user.email])

  return (
    <>
      <Stack align="center" spacing="4" mb="4">
        <Avatar size="xl" name={user.userName} src={user.profileUri} />
        <Heading
          size="lg"
          color="gray.800"
          style={{ fontFamily: "'Inter', sans-serif" }}>
          Olá! {user.userName}
        </Heading>
        <Text
          align="center"
          color="gray.400"
          mb="4"
          style={{ fontFamily: "'Inter', sans-serif" }}>
          <Text align="center" color="gray.400">
            Entre com sua senha para acessar sua conta.
          </Text>
        </Text>
      </Stack>

      <Stack spacing="4">
        <Input
          name="senha"
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => onChangePassword(e)}
        />
        <Button
          onClick={handleSignIn}
          mt="6"
          size="lg"
          colorScheme="red"
          leftIcon={<Icon as={IoLogInOutline} w={6} h={6} />}>
          Entrar
        </Button>
      </Stack>
    </>
  )
}
