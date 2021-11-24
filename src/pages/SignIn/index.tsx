import { Flex } from '@chakra-ui/react'

import { SideLogin } from '../../components/SideLogin'

import { FormLogin } from '../../components/FormLogin'

export function SignIn() {
  return (
    <Flex direction="row">
      <SideLogin />
      <FormLogin />
    </Flex>
  )
}
