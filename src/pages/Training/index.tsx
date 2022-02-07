/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import moment from 'moment'
import {
  Box,
  Button,
  Flex,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  InputRightElement,
  Spacer,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useToast,
  MenuButton,
  IconButton,
  Menu,
  MenuItem,
  MenuList,
} from '@chakra-ui/react'

import { api } from '../../services/api'
import { yupResolver } from '@hookform/resolvers/yup'
import { Header } from '../../components/Header'
import * as yup from 'yup'
import { IoAddCircleOutline } from 'react-icons/io5'
import { IoSearchOutline } from 'react-icons/io5'
import { MdMoreVert, MdEdit, MdOutlineDelete } from 'react-icons/md'
import { ManagementEmployees } from '../../components/ManagementEmployees'
import { NoResults } from '../../components/NoResults'
import { Pagination } from '../../components/Pagination'
import { Sidebar } from '../../components/Sidebar'
import CustomDatePicker from '../../components/DatePicker'
import { useForm } from 'react-hook-form'
import { CustomInput } from '../../components/Form/CustomInput'
import { TrainingProps } from '../../types/Trainings'

const states = [
  {
    title: 'Inativos',
    quantity: '3',
    progressValue: 40,
    progressColor: 'red',
  },
  {
    title: 'Ativos',
    quantity: '7',
    progressValue: 80,
    progressColor: 'green',
  },
]

const signInFormSchema = yup.object().shape({
  name: yup.string().required('Nome do treinamento obrigatório'),
  hours: yup.string().required('Carga horária obrigatória'),
})

export function Training() {
  const [startDate, setStartDate] = useState(new Date())
  const [modalIsOpen, setModalOpen] = useState(false)
  const [modalDeleteIsOpen, setModalDeleteIsOpen] = useState(false)
  const [modalEditIsOpen, setModalEditIsOpen] = useState(false)
  const [selectedTraining, setSelectedTraining] =
    useState<TrainingProps | null>(null)
  const [trainings, setTrainings] = useState<TrainingProps[]>([])
  const toast = useToast()
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signInFormSchema),
  })

  useEffect(() => {
    api.get('/Training').then((response) => {
      setTrainings(response.data)
    })
  }, [])

  const handleCreateTraining = (date: { name: string; hours: string }) => {
    const dateFormated = startDate.toISOString()
    api
      .post('Training', {
        trainingName: date.name,
        workload: date.hours,
        validDate: dateFormated,
      })
      .then((response) => {
        const newTraining = {
          id: response.data,
          workload: date.hours,
          name: date.name,
          validDate: dateFormated,
        }

        setTrainings([...trainings, newTraining])
        toast({
          title: 'Treinamento criado com sucesso',
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
      })
      .catch(() => {
        toast({
          title: 'Ops! Aconteceu algum error ao criar o treinamento',
          description: 'Verifique se a data limite está correta',
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
      })
    setModalOpen(false)
  }

  const handleOpenDeleteTraining = (training: TrainingProps) => {
    setModalDeleteIsOpen(true)
    setSelectedTraining(training)
    console.log(training)
  }

  const handleCloseDeleteTraining = () => {
    setModalDeleteIsOpen(false)
    setSelectedTraining(null)
  }

  const handleDeleteTraining = (id?: string) => {
    api
      .delete(`Training/${id}`)
      .then(() => {
        setTrainings([...trainings.filter((item) => item.id !== id)])
        toast({
          title: 'Treinamento excluído com sucesso',
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
      })
      .catch((error) => {
        console.log(error)
        toast({
          title: 'Ops! Aconteceu algum error ao excluir o treinamento',
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
      })

    setModalDeleteIsOpen(false)
  }

  const handleOpenEditingTraining = (training: TrainingProps) => {
    setSelectedTraining(training)
    setModalEditIsOpen(true)
  }

  const handleCloseEditingTraining = () => {
    setSelectedTraining(null)
    setModalEditIsOpen(false)
  }

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
              {trainings.length > 0 ? (
                <>
                  <Table variant="simple" overflowY="scroll">
                    <Thead>
                      <Tr>
                        <Th>Nome</Th>
                        <Th>Carga horária</Th>
                        <Th>Data limite</Th>
                        <Th></Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {trainings.map((item) => (
                        <Tr key={item.id}>
                          <Td>{item.name}</Td>
                          <Td textAlign="center">{item.workload}</Td>
                          <Td>{moment(item.validDate).format('MM/DD/YYYY')}</Td>
                          <Td>
                            <Menu>
                              <MenuButton
                                as={IconButton}
                                aria-label="Options"
                                icon={<MdMoreVert />}
                                variant="unstiled"
                              />
                              <MenuList>
                                <MenuItem
                                  onClick={() =>
                                    handleOpenEditingTraining(item)
                                  }
                                  icon={<MdEdit />}>
                                  Editar
                                </MenuItem>
                                <MenuItem
                                  onClick={() => handleOpenDeleteTraining(item)}
                                  color="red"
                                  icon={<MdOutlineDelete />}>
                                  Excluir
                                </MenuItem>
                              </MenuList>
                            </Menu>
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>

                  {/* <Flex align="center" justify="center">
                    <Pagination />
                  </Flex> */}
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

          <Modal
            isCentered
            isOpen={modalEditIsOpen}
            onClose={() => setModalEditIsOpen(false)}>
            <ModalOverlay />
            <form onSubmit={handleSubmit(handleCreateTraining)}>
              <ModalContent>
                <ModalHeader>
                  Você está editando o {selectedTraining?.name}
                </ModalHeader>
                <ModalBody>
                  <CustomInput
                    label="Treinamento"
                    defaultValue={selectedTraining?.name}
                    {...register('name')}
                    error={formState.errors.name}
                    placeholder="Treinamento"
                  />

                  <CustomInput
                    label="Carga Horária"
                    defaultValue={selectedTraining?.workload}
                    {...register('hours')}
                    error={formState.errors.hours}
                    placeholder="Carga horária"
                  />

                  <FormLabel>Validade</FormLabel>
                  <CustomDatePicker
                    //@ts-ignore
                    selectedDate={new Date(selectedTraining?.validDate)}
                    onChange={(date) => setStartDate(date)}
                  />
                </ModalBody>
                <ModalCloseButton />
                <ModalFooter>
                  <Button mr={3} onClick={handleCloseEditingTraining}>
                    Cancelar
                  </Button>
                  <Button
                    background="green.400"
                    color="white"
                    type="submit"
                    variant="red">
                    Salvar
                  </Button>
                </ModalFooter>
              </ModalContent>
            </form>
          </Modal>

          <Modal
            isCentered
            isOpen={modalDeleteIsOpen}
            onClose={() => setModalDeleteIsOpen(false)}>
            <ModalOverlay />

            <ModalContent>
              <ModalHeader>
                Deseja excluir o {selectedTraining?.name}?
              </ModalHeader>
              <ModalCloseButton />
              <ModalFooter>
                <Button mr={3} onClick={handleCloseDeleteTraining}>
                  Cancelar
                </Button>
                <Button
                  background="red"
                  color="white"
                  type="submit"
                  variant="red"
                  onClick={() => handleDeleteTraining(selectedTraining?.id)}>
                  Excluir
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>

          <Modal isOpen={modalIsOpen} onClose={() => setModalOpen(false)}>
            <ModalOverlay />

            <ModalContent>
              <form onSubmit={handleSubmit(handleCreateTraining)}>
                <ModalHeader>Novo treinamento</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <CustomInput
                    label="Treinamento"
                    {...register('name')}
                    error={formState.errors.name}
                    placeholder="Treinamento"
                  />

                  <CustomInput
                    label="Carga Horária"
                    {...register('hours')}
                    error={formState.errors.hours}
                    placeholder="Carga horária"
                  />

                  <FormLabel>Validade</FormLabel>
                  <CustomDatePicker
                    selectedDate={startDate}
                    onChange={(date) => setStartDate(date)}
                  />
                </ModalBody>

                <ModalFooter>
                  <Button mr={3} onClick={() => setModalOpen(false)}>
                    Cancelar
                  </Button>
                  <Button
                    background="red"
                    color="white"
                    type="submit"
                    variant="red">
                    Salvar
                  </Button>
                </ModalFooter>
              </form>
            </ModalContent>
          </Modal>
        </Flex>
      </Flex>
    </>
  )
}
