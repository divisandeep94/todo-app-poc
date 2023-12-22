import { fireEvent, render, screen } from '@testing-library/react'
import Navbar from '.'

describe('Navbar page: test cases', () => {
  test('render the navbar component', () => {
    render(<Navbar />)
    expect(screen.getByTestId('app-title')).toBeInTheDocument()
  })

  test('redirect to home page', async () => {
    render(<Navbar />)
    const pagetitle = screen.getByTestId('app-title')
    fireEvent.click(pagetitle)
    expect(window.location.pathname).toBe('/')
  })
})
