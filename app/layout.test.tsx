import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import RootLayout from './layout'

describe('Root Layout', () => {
  test('render the root layout', () => {
    render(
      <RootLayout>
        <div data-testid="child-elements">Child Elements</div>
      </RootLayout>
    )
    expect(screen.getByTestId('child-elements')).toBeInTheDocument()
  })
})
