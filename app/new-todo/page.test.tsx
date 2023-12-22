import { render, screen } from '@testing-library/react'
import Newtodo from './page'

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

describe('new todo page: test cases', () => {
  it('should render the new todo page', () => {
    render(<Newtodo />)
    const newtodosection = screen.getByTestId('new-todo-section')
    expect(newtodosection).toBeInTheDocument()
  })
})
