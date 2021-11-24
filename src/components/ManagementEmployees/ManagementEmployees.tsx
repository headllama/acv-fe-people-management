import {
  Divider,
  Flex,
  Heading,
  Progress,
  Spacer,
  Text,
} from '@chakra-ui/react'

type StateProps = {
  title: string
  quantity: string
  progressValue: number
  progressColor: string
}

type ManagementEmployeesProps = {
  total: number
  title: string
  description: string
  states?: StateProps[]
}

export function ManagementEmployees({
  total,
  title,
  description,
  states = [],
}: ManagementEmployeesProps) {
  return (
    <>
      <Heading as="h1" color="gray.800" fontFamily="Roboto">
        {total}
      </Heading>
      <Text fontSize="lg" mb="6">
        {title}
      </Text>
      <Divider m="3px" borderColor="gray.100" />
      <Text fontSize="lg" color="gray.300" my="6">
        {description}
      </Text>
      {states.map((state, index) => {
        return (
          <div key={index}>
            <Flex>
              <Text fontSize="lg" mb="1">
                {state.title}
              </Text>
              <Spacer />
              <Text fontSize="lg" mb="1">
                {state.quantity}
              </Text>
            </Flex>
            <Progress
              mb="6"
              value={state.progressValue}
              colorScheme={state.progressColor}
              style={{ backgroundColor: '#F6F6F6', borderRadius: '100px ' }}
            />
          </div>
        )
      })}
    </>
  )
}
