import { render } from '@testing-library/react'

import { Dashboard } from '.'

jest.mock('react-router-dom', () => {
  return {
    useHistory: jest.fn(),

    Link: ({ children }: { children: React.ReactNode }) => children,
  }
})

describe('Dashboard component', () => {
  it('renders correctly', () => {
    const { debug } = render(<Dashboard />)

    debug()
  })
})
