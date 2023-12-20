import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import Header from './index'
import { appLabels } from '@/app/constants'
import { useRouter } from 'next/navigation'

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

  test('new todo button click should re-direct to /new-item route', async () => {
    const push = jest.fn()
    ;(useRouter as jest.Mock).mockImplementation(() => ({
      push,
    }))
    render(<Header />)
    const buttonEl = screen.getByRole('button')
    fireEvent.click(buttonEl)
    await waitFor(() => {
      expect(push).toHaveBeenCalledWith('/new-item')
    })
  })
})
