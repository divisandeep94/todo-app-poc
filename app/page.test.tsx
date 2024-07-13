import { render, screen } from '@testing-library/react'
import { useRouter } from 'next/navigation'
import Main from './page'
import { generateRandomData } from './test-utils/utils'

const mockResponse = generateRandomData(1)

// fetchMock.enableMocks()

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

// describe('Main Page:', () => {
//   beforeEach(() => {
//     fetchMock.resetMocks()
//     const push = jest.fn()
//     const mockRouter = useRouter as jest.Mock
//     mockRouter.mockImplementation(() => ({
//       push,
//     }))
//   })

//   it('should render the main page elements', async () => {
//     fetchMock.mockResponseOnce(JSON.stringify(mockResponse))
//     render(await Main())
//     expect(screen.getByTestId('main-element')).toBeInTheDocument()
//     expect(screen.getAllByRole('listitem').length).toBe(mockResponse.length)
//   })

//   it('should render the right todo list element', async () => {
//     fetchMock.mockResponseOnce(JSON.stringify(mockResponse))
//     render(await Main())
//     const initialTodoName = mockResponse[0].name
//     const listElements = screen.getAllByRole('listitem')
//     expect(listElements[0].textContent).toBe(initialTodoName)
//   })

//   it('should display the error message, when fetch todo fails', async () => {
//     fetchMock.mockRejectOnce()
//     render(await Main())
//     expect(screen.getByText(appLabels.NO_TODO_RESULTS_TEXT)).toBeInTheDocument()
//   })

//   it('should call the fetch with valid request url', async () => {
//     fetchMock.mockResponseOnce(JSON.stringify(mockResponse))
//     render(await Main())
//     expect(fetchMock).toHaveBeenCalledWith(`${appLabels.ROOT_URL}/todo-list`, { cache: 'no-store' })
//   })
// })

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve(mockResponse),
  })
) as jest.Mock

describe('Test Main', () => {
  beforeEach(() => {
    const push = jest.fn()
    const mockRouter = useRouter as jest.Mock
    mockRouter.mockImplementation(() => ({
      push,
    }))
  })

  it('should render the main page elements', async () => {
    const mockFetch = fetch as jest.Mock
    mockFetch.mockResolvedValueOnce(mockResponse)
    render(await Main())
    expect(screen.getByTestId('main-elements')).toBeInTheDocument()
    expect(screen.getAllByRole('listitem').length).toBe(mockResponse.length)
  })

  it('should show the failed message', async () => {
    const mockFetch = fetch as jest.Mock
    mockFetch.mockRejectedValue(new Error('Error while fetching'))
    render(await Main())
    expect(screen.queryByTestId('main-elements')).not.toBeInTheDocument()
  })
})
