import { Avatar, Divider, List, ListItem, Text, Spacer } from '@chakra-ui/react'

type CustomListProps = {
  items: any[]
  disableLastDivider?: boolean
}

export function CustomListSimple({
  items,
  disableLastDivider = false,
}: CustomListProps) {
  console.log('itemns', typeof items)

  return (
    <List spacing={4} px="8" pb="4">
      {items.map((item, index) => {
        return (
          <>
            {index === 0 && <Divider />}
            <ListItem
              display="flex"
              alignItems="center"
              justifyContent="center"
              key={index}>
              <Avatar bg="gray.50" size="md" name={item.fullName} mr="2" />
              <Text color="purple.900" fontSize="lg">
                {item.fullName}
              </Text>
              <Spacer></Spacer>
            </ListItem>
            {!disableLastDivider && <Divider />}
          </>
        )
      })}
    </List>
  )
}
