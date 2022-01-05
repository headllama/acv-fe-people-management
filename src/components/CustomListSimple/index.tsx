import {
  Avatar,
  Button,
  Divider,
  Flex,
  List,
  ListItem,
  Text,
  Icon,
  Box,
} from '@chakra-ui/react'

import { IoRemoveOutline } from 'react-icons/io5'
import { format } from 'date-fns'

type CustomListProps = {
  items: any[]
  disableLastDivider?: boolean
  handleRemove?: (index: number) => void
  boxShadow?: string
}

export function CustomListSimple({
  items,
  disableLastDivider = false,
  handleRemove,
  boxShadow = 'sm',
}: CustomListProps) {
  return (
    <Box borderRadius={8} bg="white" boxShadow={boxShadow} mb="4">
      <List spacing={4} px="8" pb="8">
        {items.map((item, index) => {
          return (
            <>
              {index === 0 && <Divider />}
              <ListItem
                w="100%"
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                key={index}>
                <Flex align="center" justify="flex-start">
                  <Avatar bg="gray.50" size="md" name={item.fullName} mr="2" />
                  <Box display="flex" flexDirection="column">
                    <Text color="purple.900" fontSize="lg">
                      {item.fullName}
                    </Text>
                    <Text color="purple.900" fontSize="sm">
                      CPF: {item.cpf} - Data de Nascimento:{' '}
                      {format(new Date(item?.birthdate), 'dd/MM/yyyy')}
                    </Text>
                  </Box>
                </Flex>
                {!!handleRemove && (
                  <Button
                    colorScheme="red"
                    borderRadius="full"
                    boxShadow="lg"
                    p={0}
                    onClick={() => handleRemove(index)}>
                    <Icon as={IoRemoveOutline} fontSize="20" />
                  </Button>
                )}
              </ListItem>
              <Divider />
            </>
          )
        })}
      </List>
    </Box>
  )
}
