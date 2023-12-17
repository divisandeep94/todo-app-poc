import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Main from './page'

describe('Main page: test cases', () => {
    it('Render the main component', () => {
        render(<Main />)
        const headingName = screen.getByRole('heading')
        expect(headingName).toHaveTextContent('Root page')
    })
})
