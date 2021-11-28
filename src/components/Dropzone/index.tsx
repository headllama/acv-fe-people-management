import { Box, Icon } from '@chakra-ui/react'
import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { IoCloudUploadOutline, IoDocumentAttachOutline } from 'react-icons/io5'

import './styles.css'

interface Props {
  onFileUploaded: (file: File) => void //void nao tem retorno
}

const Dropzone: React.FC<Props> = ({ onFileUploaded }) => {
  const [selectedFileUrl, setSelectedFileUrl] = useState('')
  const [selectedFileName, setSelectedFileName] = useState('')

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0]
      const fileUrl = URL.createObjectURL(file)
      setSelectedFileUrl(fileUrl)
      onFileUploaded(file)
      setSelectedFileName(file.name)
    },
    [onFileUploaded]
  )

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: ['.pdf', '.jpg', '.png'],
  })

  return (
    <div className="dropzone" {...getRootProps()}>
      <input {...getInputProps()} />

      {selectedFileUrl ? (
        <>
          <Icon as={IoDocumentAttachOutline} color="#FF4F4F" mr={2} />
          {selectedFileName}
        </>
      ) : (
        <Box className="wrapper">
          <Box
            className="title"
            display="flex"
            justifyContent="center"
            alignItems="center"
            mb={2}>
            <Icon as={IoCloudUploadOutline} color="#FF4F4F" mr={2} />
            <p className="title">Inserir arquivo </p>
          </Box>
          <p className="description">
            (aceitamos os formatos .png, .jpg e .pdf)
          </p>
        </Box>
      )}
    </div>
  )
}

export default Dropzone
