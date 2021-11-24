import { render } from '@testing-library/react'

import { Collaborator } from '.'

jest.mock('react-router-dom', () => {
  return {
    useHistory: jest.fn(),

    Link: ({ children }: { children: React.ReactNode }) => children,
  }
})

describe('Collaborator component', () => {
  it('renders correctly', () => {
    const { debug } = render(<Collaborator />)

    debug()
  })
})
