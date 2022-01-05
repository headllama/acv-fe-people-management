import { FiMenu, FiHome } from 'react-icons/fi'
import { Flex, IconButton } from '@chakra-ui/react'
import { HiOutlineAcademicCap } from 'react-icons/hi'
import { IoPeopleOutline } from 'react-icons/io5'
import { NavItem } from '../NavItem'
import { useLocation } from 'react-router-dom'
import { useState } from 'react'

export function Sidebar() {
  const [navSize, changeNavSize] = useState('large')
  const location = useLocation()
  return (
    <Flex
      bg="white"
      boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
      flexDir="column"
      h="100vh"
      justifyContent="space-between"
      p={4}
      left="5"
      pos="sticky"
      width="100%"
      minWidth="300px"
      maxWidth={navSize == 'small' ? '75px' : '350px'}>
      <Flex
        p="5%"
        flexDir="column"
        w="100%"
        alignItems={navSize == 'small' ? 'center' : 'flex-start'}
        as="nav">
        {/* <IconButton
          aria-label="menu"
          background="none"
          mt={5}
          _hover={{ background: 'none' }}
          icon={<FiMenu />}
          onClick={() => {
            if (navSize == 'small') changeNavSize('large')
            else changeNavSize('small')
          }}
        /> */}
        <NavItem
          header="Início"
          navSize={navSize}
          icon={FiHome}
          title="Dashboard"
          link="dashboard"
          active={location.pathname === '/dashboard'}
        />
        <NavItem
          header="Gestão"
          navSize={navSize}
          icon={IoPeopleOutline}
          title="Colaboradores"
          link="collaborator"
          active={location.pathname === '/collaborator'}
        />
        <NavItem
          navSize={navSize}
          icon={HiOutlineAcademicCap}
          title="Treinamentos"
          link="training"
          active={location.pathname === '/training'}
        />
      </Flex>
    </Flex>
  )
}
