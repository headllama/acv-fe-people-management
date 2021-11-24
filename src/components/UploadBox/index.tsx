import { useState } from 'react'
import cloudOnImg from '../../assets/cloud_done_on.svg'
import cloudOffImg from '../../assets/cloud_done_off.svg'
import arrowIconImg from '../../assets/arrow_upload.svg'
import { CustomModal } from '../../components/CustomModal'
import CustomDatePicker from '../../components/DatePicker'

import {
  Box,
  Button,
  Flex,
  Image,
  Heading,
  Text,
  Divider,
  FormControl,
  FormLabel,
} from '@chakra-ui/react'

export function UploadBox() {
  const [verify, setVerify] = useState(true)
  const [modalIsOpen, setModalOpen] = useState(false)
  const [startDate, setStartDate] = useState(new Date())

  const list = [
    'Certificado de Pessoa Física',
    'RG',
    'Carteira Nacional de Habilitação',
    'Carteira de Trabalho',
    'Exame Admissional',
  ]

  return (
    <>
      <Flex align="flex-start" justify="center" flexDirection="column">
        <Heading>Upload de Documentos do Colaborador</Heading>
        <Flex
          bg="white"
          boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
          p={6}
          w="100%"
          borderRadius={8}
          flexDirection="column">
          {list.map((item) => {
            return (
              <Box
                key={item}
                cursor="pointer"
                onClick={() => setModalOpen(true)}>
                <Flex
                  w="100%"
                  mt="4"
                  align="flex-start"
                  justify="space-between">
                  <Flex>
                    <Image
                      src={verify ? cloudOnImg : cloudOffImg}
                      alt={
                        verify ? 'Arquivos salvo nas nuvens' : 'Arquivos vazio'
                      }
                      mr={4}
                    />
                    <Text fontSize="1.125rem" fontWeight="bold">
                      {item}
                    </Text>
                  </Flex>
                  <Image src={arrowIconImg}></Image>
                </Flex>
                <Divider mt="4" borderColor="gray.100" />
              </Box>
            )
          })}
        </Flex>
      </Flex>
      <CustomModal
        title={'Upload de arquivo'}
        handleOpenModal={modalIsOpen}
        closeModal={() => setModalOpen(false)}
        footerContent={
          <Button
            size="lg"
            fontSize="lg"
            colorScheme="red"
            style={{
              width: '100%',
              borderRadius: '50px',
              fontFamily: 'Roboto',
              fontSize: '18px',
              fontWeight: 'normal',
            }}>
            Upload
          </Button>
        }>
        <FormControl mt={4}>
          <FormLabel>Validade</FormLabel>
          <CustomDatePicker
            selectedDate={startDate}
            onChange={(date) => setStartDate(new Date())}
          />
        </FormControl>
      </CustomModal>
    </>
  )
}
