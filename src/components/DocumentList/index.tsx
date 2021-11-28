import {
  Divider,
  List,
  ListItem,
  Text,
  Spacer,
  ListIcon,
} from '@chakra-ui/react'
import CloudON from '../../assets/cloud_done_on.svg'
import CloudOFF from '../../assets/cloud_done_off.svg'
import { api } from '../../services/api'
import { useEffect, useState } from 'react'
import { SearchFilesTypesResult } from '../../types/SearchFilesTypesResult'
import { BsChevronRight } from 'react-icons/bs'

export function DocumentList() {
  const [files, setFiles] = useState<SearchFilesTypesResult[]>([])
  useEffect(() => {
    api.get('Files/FileTypes').then((response) => {
      setFiles(response.data)
    })
  }, [])

  return (
    <List spacing={4} px="8" py="6">
      {files.map((item, index) => {
        return (
          <>
            <ListItem
              display="flex"
              alignItems="center"
              justifyContent="center"
              py={2}
              key={index}>
              {item.isRequired ? <img src={CloudON} /> : <img src={CloudOFF} />}
              <Text color="purple.900" fontSize="lg" ml={2}>
                {item.description}
              </Text>
              <Spacer></Spacer>
              <ListIcon
                as={BsChevronRight}
                color="purple.900"
                cursor="pointer"
              />
            </ListItem>
            <Divider />
          </>
        )
      })}
    </List>
  )
}
