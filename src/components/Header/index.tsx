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

import { IoArrowBack } from 'react-icons/io5'

import logoImg from '../../assets/logo.png'
import { useAuth } from '../../hooks/useAuth'

export function Header() {
  const { user, signOut } = useAuth()

  return (
    <Flex as="header" w="100%" h="20" mx="auto" mt="4" px="6" align="center">
      <HStack spacing="2">
        <Image w="64" src={logoImg} />
        {/* <Button colorScheme="red" borderRadius="full" boxShadow="lg" p={0}>
          <Icon as={IoArrowBack} fontSize="20" />
        </Button> */}
      </HStack>

      <Flex align="center" ml="auto">
        <HStack spacing="8" mx="8" pr="8" py="1" color="gray.300">
          <Button onClick={signOut}>
            <Icon as={IoArrowBack} fontSize="24" />
            <Text>Sair</Text>
          </Button>
        </HStack>

        <Flex align="center">
          <Avatar size="md" name={user.userName} src={user.profileUri} />
          <Box ml="4" textAlign="left">
            <Text color="gray.800" fontSize="lg">
              {user.userName}
            </Text>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  )
}
