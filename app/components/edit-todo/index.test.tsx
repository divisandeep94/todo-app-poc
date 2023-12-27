import { appLabels } from '@/app/app-constants'
import { IListItemType } from '@/app/app-interfaces'
import { TestProvider, generateRandomData } from '@/app/test-utils/utils'
import { faker } from '@faker-js/faker'
import { fireEvent, render, screen } from '@testing-library/react'
import EditTodo, { IEditTodoProps } from '.'
import ListItem, { todoListAtom } from '../list-item'

const todoItems: IListItemType[] = generateRandomData(3)

describe('Edit Todo Component:', () => {
  const editTodoProps: IEditTodoProps = {
    selectedTodo: { id: faker.string.uuid(), name: faker.word.words(), status: 'Active' },
    handleTodoEdit: jest.fn(),
  }
  const newTodoValue = 'new todo value'

  it('should render the edit todo component elements', () => {
    render(<EditTodo {...editTodoProps} />)
    expect(screen.getByPlaceholderText(appLabels.EDIT_TODO_INPUT_PLACEHOLDER_TEXT)).toBeInTheDocument()
    expect(screen.getAllByRole('button').length).toBe(2)
  })

  it('should render the selected todo value by default', () => {
    render(<EditTodo {...editTodoProps} />)
    const selectedTodoValue = screen.getByPlaceholderText(appLabels.EDIT_TODO_INPUT_PLACEHOLDER_TEXT)
    expect(selectedTodoValue).toHaveValue(editTodoProps.selectedTodo.name)
  })

  it('should edit the todo value', () => {
    render(<EditTodo {...editTodoProps} />)
    const selectedTodoValue = screen.getByPlaceholderText(appLabels.EDIT_TODO_INPUT_PLACEHOLDER_TEXT)
    expect(selectedTodoValue).toHaveValue(editTodoProps.selectedTodo.name)
    fireEvent.change(selectedTodoValue, { target: { value: newTodoValue } })
    const updatedTodoValue = screen.getByPlaceholderText(appLabels.EDIT_TODO_INPUT_PLACEHOLDER_TEXT)
    expect(updatedTodoValue).toHaveValue(newTodoValue)
  })

  describe('Save Todo:', () => {
    const currentEditTodoProps: IEditTodoProps = {
      selectedTodo: todoItems[0],
      handleTodoEdit: jest.fn(),
    }
    it('on click of cancel, should close edit section and do not update the todo value', async () => {
      render(
        <TestProvider initialValues={[[todoListAtom, todoItems]]}>
          <ListItem />
          <EditTodo {...currentEditTodoProps} />
        </TestProvider>
      )
      const currentTodoValue = currentEditTodoProps.selectedTodo.name
      const inputTodoValue = screen.getByPlaceholderText(appLabels.EDIT_TODO_INPUT_PLACEHOLDER_TEXT)
      expect(inputTodoValue).toHaveValue(currentTodoValue)
      fireEvent.change(inputTodoValue, { target: { value: newTodoValue } })
      const editCancelBt = screen.getByRole('button', { name: appLabels.CANCEL_LABEL })
      fireEvent.click(editCancelBt)
      const list = screen.getAllByRole('listitem')
      const currentTodoList = list.map((item) => item.textContent)
      expect(currentTodoList).not.toContain(newTodoValue)
      expect(currentTodoList).toContain(currentTodoValue)
    })

    it('on click of save, should close edit section and update the todo value', () => {
      render(
        <TestProvider initialValues={[[todoListAtom, todoItems]]}>
          <ListItem />
          <EditTodo {...currentEditTodoProps} />
        </TestProvider>
      )
      const currentTodoValue = currentEditTodoProps.selectedTodo.name
      const inputTodoValue = screen.getByPlaceholderText(appLabels.EDIT_TODO_INPUT_PLACEHOLDER_TEXT)
      expect(inputTodoValue).toHaveValue(currentTodoValue)
      fireEvent.change(inputTodoValue, { target: { value: newTodoValue } })
      const saveUpdateBt = screen.getByRole('button', { name: appLabels.SUBMIT_LABEL })
      fireEvent.click(saveUpdateBt)
      const list = screen.getAllByRole('listitem')
      const currentTodoList = list.map((item) => item.textContent)
      expect(currentTodoList).toContain(newTodoValue)
      expect(currentTodoList).not.toContain(currentTodoValue)
    })
  })
})
