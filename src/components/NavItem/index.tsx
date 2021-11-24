import { Flex, Text, Icon, Link, Menu, MenuButton } from '@chakra-ui/react'
import { Link as ReachLink } from 'react-router-dom'

export function NavItem({ icon, title, active, navSize, header, link }: any) {
  return (
    <Flex
      mt={4}
      flexDir="column"
      w="100%"
      alignItems={navSize == 'small' ? 'center' : 'flex-start'}>
      <Menu placement="right">
        {header && (
          <Text fontSize="lg" color="gray.500" mb={4}>
            {header}
          </Text>
        )}
        <Link
          as={ReachLink}
          to={`/${link}`}
          backgroundColor={active && '#FF4F4F'}
          p={3}
          rounded={40}
          w="full"
          _hover={{ textDecor: 'none', backgroundColor: 'none' }}>
          <MenuButton w="100%">
            <Flex>
              <Icon
                as={icon}
                fontSize="xl"
                color={active ? 'white' : 'gray.500'}
              />
              <Text
                ml={5}
                display={navSize == 'small' ? 'none' : 'flex'}
                color={active ? 'white' : 'gray.500'}>
                {title}
              </Text>
            </Flex>
          </MenuButton>
        </Link>
      </Menu>
    </Flex>
  )
}
