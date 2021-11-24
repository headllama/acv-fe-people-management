import { Stack, Button, Box, Icon } from '@chakra-ui/react'

import { IoArrowBack, IoArrowForward } from 'react-icons/io5'

export function Pagination() {
  return (
    <Stack
      direction="row"
      spacing="6"
      my="8"
      align="center"
      justify="space-between">
      <Box>
        <Stack direction="row" spacing="4">
          <Button
            size="md"
            fontSize="md"
            w="4"
            colorScheme="red"
            borderRadius="full"
            boxShadow="xl"
            disabled
            _disabled={{
              bgColor: 'red.500',
              cursor: 'default',
            }}>
            <Icon as={IoArrowBack} />
          </Button>
          <Button
            size="md"
            fontSize="md"
            w="4"
            bg="grau.700"
            borderRadius="full"
            borderWidth="1px"
            borderStyle="solid"
            borderColor="red.500"
            color="red.500"
            boxShadow="xl"
            _hover={{
              bgColor: 'red.500',
              color: 'white',
            }}>
            1
          </Button>
          <Button
            size="md"
            fontSize="md"
            w="4"
            bg="grau.700"
            borderRadius="full"
            borderWidth="1px"
            borderStyle="solid"
            borderColor="gray.100"
            color="black"
            boxShadow="xl"
            _hover={{
              bgColor: 'gray.200',
            }}>
            2
          </Button>

          <Button
            size="md"
            fontSize="md"
            w="4"
            colorScheme="red"
            borderRadius="full"
            boxShadow="xl"
            disabled
            _disabled={{
              bgColor: 'red.500',
              cursor: 'default',
            }}>
            <Icon as={IoArrowForward} />
          </Button>
        </Stack>
      </Box>
    </Stack>
  )
}
