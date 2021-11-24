import { Text, Box } from '@chakra-ui/react'

type CollaboratorUserDataProps = {
  label: string
  userData: string
}

export function CollaboratorUserData({
  label,
  userData,
}: CollaboratorUserDataProps) {
  return (
    <Box style={{ minWidth: '200px', marginRight: '50px' }}>
      <Text mt="4" color="gray.600" fontSize="sm">
        {label}
      </Text>
      <Text fontWeight="600" color="gray.800">
        {userData}
      </Text>
    </Box>
  )
}
