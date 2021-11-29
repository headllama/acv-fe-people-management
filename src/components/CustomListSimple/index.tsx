import {
  Avatar,
  Button,
  Divider,
  Flex,
  List,
  ListItem,
  Text,
  Icon,
} from '@chakra-ui/react'

import { IoRemoveOutline } from 'react-icons/io5'

type CustomListProps = {
  items: any[]
  disableLastDivider?: boolean
  handleRemove?: (index: number) => void
}

export function CustomListSimple({
  items,
  disableLastDivider = false,
  handleRemove,
}: CustomListProps) {
  return (
    <List spacing={4} px="8" pb="4">
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
                <Text color="purple.900" fontSize="lg">
                  {item.fullName}
                </Text>
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
            {!disableLastDivider && <Divider />}
          </>
        )
      })}
    </List>
  )
}
