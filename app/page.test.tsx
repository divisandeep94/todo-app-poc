import { render, screen } from '@testing-library/react'
import fetchMock from 'jest-fetch-mock'
import { useRouter } from 'next/navigation'
import { appLabels } from './app-constants'
import Main from './page'
import { generateRandomData } from './test-utils/utils'

const mockResponse = generateRandomData(1)

fetchMock.enableMocks()

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

describe('Main Page:', () => {
  beforeEach(() => {
    fetchMock.resetMocks()
    const push = jest.fn()
    const mockRouter = useRouter as jest.Mock
    mockRouter.mockImplementation(() => ({
      push,
    }))
  })

  it('should render the main page elements', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockResponse))
    render(await Main())
    expect(screen.getByTestId('main-element')).toBeInTheDocument()
    expect(screen.getAllByRole('listitem').length).toBe(mockResponse.length)
  })

  it('should render the right todo list element', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockResponse))
    render(await Main())
    const initialTodoName = mockResponse[0].name
    const listElements = screen.getAllByRole('listitem')
    expect(listElements[0].textContent).toBe(initialTodoName)
  })

  it('should display the error message, when fetch todo fails', async () => {
    fetchMock.mockRejectOnce()
    render(await Main())
    expect(screen.getByText(appLabels.NO_TODO_RESULTS_TEXT)).toBeInTheDocument()
  })

  it('should call the fetch with valid request url', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockResponse))
    render(await Main())
    expect(fetchMock).toHaveBeenCalledWith(`${appLabels.ROOT_URL}/todo-list`, { cache: 'no-store' })
  })
})
