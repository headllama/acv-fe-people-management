import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'

type CustomModalProps = {
  title?: string
  children?: React.ReactNode
  footerContent?: React.ReactNode
  handleOpenModal: boolean
  closeModal: () => void
}

export function CustomModal({
  title = 'Cadastro',
  children,
  footerContent,
  handleOpenModal,
  closeModal,
}: CustomModalProps) {
  const [isOpen, setOpen] = useState(false)

  useEffect(() => {
    if (handleOpenModal) setOpen(handleOpenModal)
  }, [handleOpenModal])

  function handleCloseModal() {
    setOpen(false)
    closeModal()
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          handleCloseModal()
        }}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>{children}</ModalBody>

          {footerContent ? (
            <ModalFooter>{footerContent}</ModalFooter>
          ) : (
            <ModalFooter>
              <Button
                size="lg"
                fontSize="lg"
                colorScheme="red"
                mr={3}
                style={{
                  borderRadius: '50px',
                  fontFamily: 'Roboto',
                  fontSize: '18px',
                  fontWeight: 'normal',
                }}>
                Salvar
              </Button>
              <Button
                size="lg"
                fontSize="lg"
                onClick={() => handleCloseModal()}
                style={{
                  borderRadius: '50px',
                  fontFamily: 'Roboto',
                  fontSize: '18px',
                  fontWeight: 'normal',
                }}>
                Cancelar
              </Button>
            </ModalFooter>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
