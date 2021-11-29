import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Spacer,
} from '@chakra-ui/react'

import { CustomModal } from '../../components/CustomModal'
import { Header } from '../../components/Header'
import { IoAddCircleOutline } from 'react-icons/io5'
import { IoSearchOutline } from 'react-icons/io5'
import { ManagementEmployees } from '../../components/ManagementEmployees'
import { NoResults } from '../../components/NoResults'
import { Pagination } from '../../components/Pagination'
import { Sidebar } from '../../components/Sidebar'
import { useState } from 'react'
import CustomDatePicker from '../../components/DatePicker'

const states = [
  {
    title: 'Inativos',
    quantity: '3',
    progressValue: 40,
    progressColor: 'red',
  },
  {
    title: 'Aivos',
    quantity: '7',
    progressValue: 80,
    progressColor: 'green',
  },
]

const trainings = [
  {
    name: 'Operar de Empilhadeira',
  },
  {
    name: 'Operador de Muck',
  },
  {
    name: 'Operar de Empilhadeira',
  },
  {
    name: 'Operador de Muck',
  },
]

const hasList = true

export function Training() {
  const [startDate, setStartDate] = useState(new Date())
  const [modalIsOpen, setModalOpen] = useState(false)

  return (
    <>
      <Flex
        width="100%"
        borderBottomStyle="solid"
        borderBottomWidth={1}
        borderColor="gray.100"
        bg="white">
        <Header />
      </Flex>

      <Flex direction="row" bg="gray.50">
        <Flex>
          <Sidebar />
        </Flex>

        <Flex direction="column" bg="gray.50" width="100%">
          <Flex>
            <Box flex="1" bg="white" p="8" display="flex" alignItems="center">
              <Heading size="xl" fontWeight="normal" fontFamily="Roboto">
                Gestão de Treinamentos
              </Heading>
              <Spacer />
              <Button
                as="a"
                size="lg"
                fontSize="lg"
                colorScheme="red"
                rightIcon={<Icon as={IoAddCircleOutline} />}
                onClick={() => setModalOpen(true)}
                style={{
                  borderRadius: '50px',
                  fontFamily: 'Roboto',
                  fontSize: '18px',
                  fontWeight: 'normal',
                }}>
                Adicionar Treinamento
              </Button>
            </Box>
          </Flex>
          <Flex m="4">
            <Box borderRadius={8} bg="white" flex="1">
              <Box p={8}>
                <InputGroup>
                  <Input placeholder="Busque por nome" size="lg" />
                  <InputRightElement
                    top="4px"
                    // eslint-disable-next-line react/no-children-prop
                    children={<Icon as={IoSearchOutline} />}
                  />
                </InputGroup>
              </Box>
              {hasList ? (
                <>
                  {/* <CustomList items={trainings} /> */}
                  <Flex align="center" justify="center">
                    <Pagination />
                  </Flex>
                </>
              ) : (
                <Flex align="center" justify="center" p={10}>
                  <NoResults text={'Nenhum treinamento por aqui...'} />
                </Flex>
              )}
            </Box>

            <Box
              borderRadius={8}
              bg="white"
              boxShadow="sm"
              p="8"
              ml="4"
              minWidth="364px">
              <ManagementEmployees
                total={10}
                title="Total de treinamentos"
                description="Status dos treinamentos"
                states={states}
              />
            </Box>
          </Flex>
          <CustomModal
            title={'Cadastro de Treinamento'}
            handleOpenModal={modalIsOpen}
            closeModal={() => setModalOpen(false)}>
            <FormControl mt={4}>
              <FormLabel>Treinamento</FormLabel>
              <Input placeholder="Treinamento" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Carga horária</FormLabel>
              <Input placeholder="Carga horária" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Validade</FormLabel>
              <CustomDatePicker
                selectedDate={startDate}
                onChange={(date) => setStartDate(new Date())}
              />
            </FormControl>
          </CustomModal>
        </Flex>
      </Flex>
    </>
  )
}
