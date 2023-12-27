import { IListItemType } from '@/app/app-interfaces'
import { TestProvider, generateRandomData } from '@/app/test-utils/utils'
import { faker } from '@faker-js/faker'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { useRouter } from 'next/navigation'
import CreateTodo from '.'
import { appLabels } from '../../app-constants'
import ListItem, { todoListAtom } from '../list-item'

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

describe('New Todo Create Component:', () => {
  it('should render the new todo component elements', () => {
    render(<CreateTodo />)
    const inputEl = screen.getByPlaceholderText(appLabels.NEW_TODO_INPUT_PLACEHOLDER_TEXT)
    const cancelButtonEl = screen.getByRole('button', { name: appLabels.CANCEL_LABEL })
    const submitButtonEl = screen.getByRole('button', { name: appLabels.SUBMIT_LABEL })
    expect(inputEl).toBeInTheDocument()
    expect(cancelButtonEl).toBeInTheDocument()
    expect(submitButtonEl).toBeInTheDocument()
  })

  it('new todo input should change', () => {
    render(<CreateTodo />)
    const inputEl = screen.getByPlaceholderText(appLabels.NEW_TODO_INPUT_PLACEHOLDER_TEXT)
    expect(inputEl.textContent).toEqual('')
    const testValue = faker.word.words()
    fireEvent.change(inputEl, { target: { value: testValue } })
    expect(inputEl).toHaveValue(testValue)
  })

  it('onclick of cancel should re-direct to home page', async () => {
    const push = jest.fn()
    const mockRouter = useRouter as jest.Mock
    mockRouter.mockImplementation(() => ({
      push,
    }))
    render(<CreateTodo />)
    const cancelButtonEl = screen.getByRole('button', { name: appLabels.CANCEL_LABEL })
    fireEvent.click(cancelButtonEl)
    await waitFor(() => {
      expect(push).toHaveBeenCalledWith('/')
    })
  })

  it('onclick of create should create new todo items and re-direct to home page', async () => {
    const push = jest.fn()
    const mockRouter = useRouter as jest.Mock
    mockRouter.mockImplementation(() => ({
      push,
    }))
    render(<CreateTodo />)
    const inputEl = screen.getByPlaceholderText(appLabels.NEW_TODO_INPUT_PLACEHOLDER_TEXT)
    const testValue = faker.word.words()
    fireEvent.change(inputEl, { target: { value: testValue } })
    const submitButtonEl = screen.getByRole('button', { name: appLabels.SUBMIT_LABEL })
    fireEvent.click(submitButtonEl)
    await waitFor(() => {
      expect(push).toHaveBeenCalledWith('/')
    })
  })
})

describe('New Todo List:', () => {
  const todoItems: IListItemType[] = generateRandomData(3)
  it('onclick of create should create new todo item', () => {
    const push = jest.fn()
    const mockRouter = useRouter as jest.Mock
    mockRouter.mockImplementation(() => ({
      push,
    }))
    render(
      <TestProvider initialValues={[[todoListAtom, todoItems]]}>
        <ListItem />
        <CreateTodo />
      </TestProvider>
    )
    const inputEl = screen.getByPlaceholderText(appLabels.NEW_TODO_INPUT_PLACEHOLDER_TEXT)
    const testValue = faker.word.words()
    fireEvent.change(inputEl, { target: { value: testValue } })
    const createButtonEl = screen.getByRole('button', { name: appLabels.SUBMIT_LABEL })
    fireEvent.click(createButtonEl)
    const list = screen.getAllByRole('listitem')
    const currentList = list.map((item) => item.textContent)
    expect(currentList).toContain(testValue)
    expect(currentList.length).toEqual(todoItems.length + 1)
  })
})
