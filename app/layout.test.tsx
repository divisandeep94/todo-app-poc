import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import RootLayout from './layout'
import { appLabels } from './constants'

describe('Root Layout', () => {
  test('render the root layout', () => {
    render(
      <RootLayout>
        <div>Child Components</div>
      </RootLayout>
    )
    const appHeading = screen.getByRole('heading')
    expect(appHeading).toHaveTextContent(appLabels.APP_TITLE)
  })
})
