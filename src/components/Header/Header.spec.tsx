import { render } from '@testing-library/react'
import { Header } from '.'

jest.mock('react-router-dom', () => {
  return {
    useHistory: jest.fn(),
    Link: ({ children }: { children: React.ReactNode }) => children,
  }
})

describe('Header component', () => {
  it('renders correctly', () => {
    const { debug } = render(<Header />)

    debug()
  })
})
