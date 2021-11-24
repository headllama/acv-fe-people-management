import { Flex } from '@chakra-ui/react'

interface ContainerBoxProps {
  isLoading: boolean
  steps: { label: string }[]
  stepperTitle?: string
  currentStep: number
  children: React.ReactNode
  _close: () => void
}

export function ContainerBox({
  isLoading,
  steps,
  stepperTitle,
  currentStep,
  children,
  _close,
}: ContainerBoxProps) {
  return <Flex></Flex>
}
