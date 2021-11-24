import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'

import { theme } from './styles/theme'
import { Routes } from './routes'

import { AppProvider } from './hooks'

export function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <AppProvider>
          <Routes />
        </AppProvider>
      </BrowserRouter>
    </ChakraProvider>
  )
}
