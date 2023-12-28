import { appLabels } from '@/app/app-constants'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { useRouter } from 'next/navigation'
import Header from './index'

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

describe('Header Component', () => {
  test('header components element should be rendered', () => {
    render(<Header />)
    const buttonEl = screen.getByRole('button')
    expect(buttonEl).toBeInTheDocument()
  })

  test('button text should be new todo', () => {
    render(<Header />)
    const buttonEl = screen.getByRole('button')
    expect(buttonEl).toHaveTextContent(appLabels.NEW_TODO_BUTTON_LABEL)
  })

  test('new todo button click should re-direct to /new-todo route', async () => {
    const push = jest.fn()
    const mockRouter = useRouter as jest.Mock
    mockRouter.mockImplementation(() => ({
      push,
    }))
    render(<Header />)
    const buttonEl = screen.getByRole('button')
    fireEvent.click(buttonEl)
    await waitFor(() => {
      expect(push).toHaveBeenCalledWith('/new-todo')
    })
  })
})
