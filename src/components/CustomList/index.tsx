import {
  Avatar,
  Divider,
  List,
  ListIcon,
  ListItem,
  Text,
  Spacer,
} from '@chakra-ui/react'
import { useHistory } from 'react-router-dom'
import { BsChevronRight } from 'react-icons/bs'

type CustomListItemProps = {
  name: string
  redirectRoute: string
  avatarUri?: string
}

type CustomListProps = {
  items: CustomListItemProps[]
  disableLastDivider?: boolean
}

export function CustomList({
  items,
  disableLastDivider = false,
}: CustomListProps) {
  const history = useHistory()

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
              <Avatar
                bg="gray.50"
                size="md"
                name={item.name}
                mr="2"
                src={item.avatarUri}
              />
              <Text color="purple.900" fontSize="lg">
                {item.name}
              </Text>
              <Spacer></Spacer>
              <ListIcon
                as={BsChevronRight}
                color="purple.900"
                cursor="pointer"
                onClick={() => history.push(item.redirectRoute)}
              />
            </ListItem>
            {!disableLastDivider && <Divider />}
          </>
        )
      })}
    </List>
  )
}
