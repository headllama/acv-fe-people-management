import {
  Modal as ModalChakra,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  ModalProps as Props,
} from '@chakra-ui/react'

export interface ModalProps extends Props {
  footerContent?: React.ReactNode
  title: string
  maxW?: string
  className?: string
}

export function Modal({
  children,
  footerContent,
  title,
  maxW = '26rem',
  className,
  ...rest
}: ModalProps) {
  return (
    <ModalChakra {...rest}>
      <ModalOverlay />
      <ModalContent maxW={maxW} className={className} opacity="1!important">
        <ModalHeader fontWeight="500" fontSize="1.125rem">
          {title}
        </ModalHeader>
        <ModalCloseButton data-testid="modal-button-closed" />
        <ModalBody>{children}</ModalBody>
        {footerContent && <ModalFooter>{footerContent}</ModalFooter>}
      </ModalContent>
    </ModalChakra>
  )
}
