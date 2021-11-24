import welcomeImg from '../../assets/welcome.svg'

import {
  Box,
  Flex,
  Image,
  Heading,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react'

export function SideLogin() {
  const isMobile = useBreakpointValue({
    base: false,
    md: true,
  })

  return (
    <>
      {isMobile && (
        <Flex bg="gray.900" w="50%" h="100vh" align="flex-end" justify="center">
          <Box px={16} pb={{ base: 6, '2xl': 20 }}>
            <Image src={welcomeImg} alt="ilustração" mb="4" />
            <Heading as="h2" size="xl" mb="4" color="gray.50">
              Mais Controle no lifecycle dos seus colaboradores!
            </Heading>
            <Text fontSize="xl" mb="4" opacity="0.70" color="gray.50">
              Melhore o fluxo de ideias da sua <br /> empresa.
            </Text>
          </Box>
        </Flex>
      )}
    </>
  )
}
