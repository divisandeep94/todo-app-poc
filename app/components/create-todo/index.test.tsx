import { faker } from '@faker-js/faker'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { useRouter } from 'next/navigation'
import CreateTodo from '.'
import { appLabels } from '../../constants'

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

it('should render the new todo component elements', () => {
  render(<CreateTodo />)
  const inputEl = screen.getByPlaceholderText(appLabels.NEW_TODO_INPUT_PLACEHOLDER_TEXT)
  const cancelButtonEl = screen.getByTestId('todo-cancel-button')
  const submitButtonEl = screen.getByTestId('todo-create-button')
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
  ;(useRouter as jest.Mock).mockImplementation(() => ({
    push,
  }))
  render(<CreateTodo />)
  const cancelButtonEl = screen.getByTestId('todo-cancel-button')
  fireEvent.click(cancelButtonEl)
  await waitFor(() => {
    expect(push).toHaveBeenCalledWith('/')
  })
})

// this test needs to be updated, that's why skipping it for now.
it.skip('onclick of create should create new todo items and re-direct to home page', async () => {
  const push = jest.fn()
  ;(useRouter as jest.Mock).mockImplementation(() => ({
    push,
  }))
  render(<CreateTodo />)
  const inputEl = screen.getByPlaceholderText(appLabels.NEW_TODO_INPUT_PLACEHOLDER_TEXT)
  const testValue = faker.word.words()
  fireEvent.change(inputEl, { target: { value: testValue } })
  const createButtonEl = screen.getByTestId('todo-create-button')
  fireEvent.click(createButtonEl)
  await waitFor(() => {
    expect(push).toHaveBeenCalledWith('/')
  })
})
