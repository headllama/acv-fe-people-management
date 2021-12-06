import {
  Flex,
  Text,
  Icon,
  HStack,
  Box,
  Avatar,
  Image,
  Button,
} from '@chakra-ui/react'
import { useHistory } from 'react-router-dom'

import logoImg from '../../assets/logo.png'
import { useAuth } from '../../hooks/useAuth'

export function Header() {
  const { user, signOut } = useAuth()
  const history = useHistory()

  return (
    <Flex as="header" w="100%" h="20" mx="auto" mt="4" px="6" align="center">
      <HStack spacing="2">
        <Image
          w="64"
          src={logoImg}
          onClick={() => history.push('/')}
          style={{ cursor: 'pointer' }}
        />
      </HStack>

      <Flex align="center" ml="auto">
        <Flex align="center">
          {!!user && (
            <>
              <Avatar size="md" name={user.userName} src={user.profileUri} />
              <Box ml="4" textAlign="left">
                <Text color="gray.800" fontSize="lg">
                  {user.userName}
                </Text>
              </Box>
            </>
          )}
        </Flex>
        <HStack spacing="8" mx="2" color="gray.300">
          <Button onClick={signOut}>
            <Text>Sair</Text>
          </Button>
        </HStack>
      </Flex>
    </Flex>
  )
}
