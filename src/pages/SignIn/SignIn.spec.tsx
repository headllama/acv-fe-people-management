import { render } from '@testing-library/react'

import { SignIn } from '.'

jest.mock('react-router-dom', () => {
  return {
    useHistory: jest.fn(),

    Link: ({ children }: { children: React.ReactNode }) => children,
  }
})

describe('SignIn component', () => {
  it('renders correctly', () => {
    const { debug } = render(<SignIn />)

    debug()
  })
})
