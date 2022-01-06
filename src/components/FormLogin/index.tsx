import { useState } from 'react'
import { Flex } from '@chakra-ui/react'

import { StepEmail, StepPassword } from '../Form'

export enum LoginSteps {
  email,
  password,
}

export function FormLogin() {
  const [currentStep, setCurrentStep] = useState<LoginSteps>(0)

  function _changeCurrentStep(step: 'next' | 'previous') {
    if (step === 'next') {
      setCurrentStep(currentStep + 1)
    } else {
      setCurrentStep(currentStep - 1)
    }
  }

  function renderSteps() {
    switch (currentStep) {
      case LoginSteps.email:
        return <StepEmail _changeCurrentStep={_changeCurrentStep} />
      case LoginSteps.password:
        return <StepPassword _changeCurrentStep={_changeCurrentStep} />
      default:
        return <></>
    }
  }

  return (
    <Flex w={['100%', '100%', '50%']} h="100vh" align="center" justify="center">
      <Flex
        as="form"
        direction="column"
        width="100%"
        maxWidth={360}
        background="#FFF">
        {renderSteps()}
      </Flex>
    </Flex>
  )
}
