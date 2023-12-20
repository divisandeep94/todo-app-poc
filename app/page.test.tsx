import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Main from './page'

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

describe('Main Page', () => {
  test('main page renders', () => {
    render(<Main />)
    const pageElement = screen.getByTestId('main-element')
    expect(pageElement).toBeVisible()
  })
})
