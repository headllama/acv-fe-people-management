import { Flex, Text, Image } from '@chakra-ui/react'

import imgEmpty from '../assets/empty-list.svg'

type NoResultsProps = {
  text?: string
}

export function NoResults({
  text = 'Nenhum dado por aqui...',
}: NoResultsProps) {
  return (
    <Flex direction="column" alignItems="center">
      <Image src={imgEmpty} />
      <Text ml="4" fontWeight="medium" fontSize="xl" my="8">
        {text}
      </Text>
    </Flex>
  )
}
