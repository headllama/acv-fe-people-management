import { useState, useEffect } from 'react'
import cloudOnImg from '../../assets/cloud_done_on.svg'
import cloudOffImg from '../../assets/cloud_done_off.svg'
import arrowIconImg from '../../assets/arrow_upload.svg'
import { CustomModal } from '../../components/CustomModal'
import CustomDatePicker from '../../components/DatePicker'
import { useToast } from '@chakra-ui/react'

import {
  Box,
  Button,
  Flex,
  Image,
  Text,
  Divider,
  FormControl,
  FormLabel,
} from '@chakra-ui/react'
import { api } from '../../services/api'
import { SearchFilesTypesResult } from '../../types/SearchFilesTypesResult'
import Dropzone from '../Dropzone'
import { SearchEmployeeFilesResult } from '../../types'

interface UploadBoxProps {
  collaboratorId: string
}

export function UploadBox({ collaboratorId }: UploadBoxProps) {
  const toast = useToast()

  const [collaboratorFilesUploaded, setCollaboratorFilesUploaded] = useState<
    SearchEmployeeFilesResult[]
  >([])
  const [modalIsOpen, setModalOpen] = useState(false)
  const [expirationDate, setExpirationDate] = useState<Date>(new Date())
  const [selectedFileType, setSelectedFileType] =
    useState<SearchFilesTypesResult>()
  const [selectedFile, setSelectedFile] = useState<File>()

  const [files, setFiles] = useState<SearchFilesTypesResult[]>([])

  useEffect(() => {
    api.get('Files/FileTypes').then((response) => {
      setFiles(response.data)
    })
  }, [])

  useEffect(() => {
    api.get(`Files/Employee/${collaboratorId}`).then((response) => {
      setCollaboratorFilesUploaded(response.data)
    })
  }, [collaboratorId, modalIsOpen])

  function handleFileModal(file: SearchFilesTypesResult) {
    setSelectedFileType(file)
    setModalOpen(true)
  }

  function collaboratorHasFileUploaded(typeId: string) {
    const fileUploaded = collaboratorFilesUploaded.filter(
      (item) => item.fileTypeId === typeId
    )
    return fileUploaded.length > 0
  }

  function uploadFiles() {
    const data = new FormData()
    if (selectedFileType && selectedFile) {
      data.append('fileTypeId', selectedFileType.id)
      data.append('expirationDate', expirationDate.toDateString())
      data.append('tag', selectedFileType.description!)

      if (selectedFile) {
        data.append('file', selectedFile)
      }

      api
        .post(`Files/Employee/${collaboratorId}/Upload`, data)
        .then((response) => {
          setModalOpen(false)
        })
        .catch((error) => {
          console.log('error mobile approve - ', error)
          toast({
            title: `${
              error.response.data.errors[0].message
                ? error.response.data.errors[0].message
                : error.response.data.message
            }`,
            status: 'error',
            duration: 5000,
            isClosable: true,
            position: 'top',
          })
          setModalOpen(false)
        })
    }
  }

  return (
    <>
      <Flex align="flex-start" justify="center" flexDirection="column">
        <Flex
          bg="white"
          boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
          p={6}
          w="100%"
          borderRadius={8}
          flexDirection="column">
          {files.map((item) => {
            return (
              <Box
                key={item.id}
                cursor="pointer"
                onClick={() => handleFileModal(item)}>
                <Flex
                  w="100%"
                  mt="4"
                  align="flex-start"
                  justify="space-between">
                  <Flex>
                    <Image
                      src={
                        collaboratorHasFileUploaded(item.id)
                          ? cloudOnImg
                          : cloudOffImg
                      }
                      alt={
                        item.verify
                          ? 'Arquivos salvo nas nuvens'
                          : 'Arquivos vazio'
                      }
                      mr={4}
                    />
                    <Text fontSize="1.125rem" fontWeight="bold">
                      {item.description}
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
            onClick={() => uploadFiles()}
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
        <Dropzone onFileUploaded={setSelectedFile} />
        {selectedFileType?.verify && (
          <FormControl mt={4}>
            <FormLabel>Validade</FormLabel>
            <CustomDatePicker
              selectedDate={expirationDate}
              onChange={(date, e) => setExpirationDate(date)}
            />
          </FormControl>
        )}
      </CustomModal>
    </>
  )
}
