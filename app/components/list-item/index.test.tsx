import { appLabels } from '@/app/app-constants'
import { IListItemType } from '@/app/app-interfaces'
import { TestProvider, generateRandomData } from '@/app/test-utils/utils'
import { fireEvent, render, screen } from '@testing-library/react'
import ListItem, { todoListAtom } from '.'

let todoItems: IListItemType[] = []

beforeEach(() => {
  todoItems = generateRandomData(3)
})

describe('List-item Component', () => {
  it('should render no todos message when no records are present', () => {
    render(
      <TestProvider initialValues={[[todoListAtom, []]]}>
        <ListItem />
      </TestProvider>
    )
    expect(screen.getByTestId('no-todos-element')).toBeInTheDocument()
    expect(screen.getByText(appLabels.NO_TODOS_TEXT)).toBeInTheDocument()
    const todoListWrapper = screen.queryByRole('list')
    expect(todoListWrapper).not.toBeInTheDocument()
  })

  it('should render the available list-items', () => {
    render(
      <TestProvider initialValues={[[todoListAtom, todoItems]]}>
        <ListItem />
      </TestProvider>
    )
    const listItemEl = screen.getAllByRole('listitem')
    expect(listItemEl.length).toBe(3)
  })

  it('should render the list-items with the right value', () => {
    render(
      <TestProvider initialValues={[[todoListAtom, todoItems]]}>
        <ListItem />
      </TestProvider>
    )
    const labelText = todoItems[0].name
    const renderedLabelName = screen.getByText(labelText)
    expect(renderedLabelName).toBeInTheDocument()
    expect(renderedLabelName.textContent).toBe(labelText)
  })

  it('on-check of todo, should hide the edit and bin icon', () => {
    render(
      <TestProvider initialValues={[[todoListAtom, todoItems]]}>
        <ListItem />
      </TestProvider>
    )
    const listElements = screen.getAllByRole('checkbox')
    fireEvent.click(listElements[0])
    const editIconElements = screen.getAllByAltText('edit-pencil-icon')
    const binIconElements = screen.getAllByAltText('delete-trash-icon')
    expect(editIconElements.length).toEqual(listElements.length - 1)
    expect(binIconElements.length).toEqual(listElements.length - 1)
    fireEvent.click(listElements[1])
    const newEditIconElements = screen.getAllByAltText('edit-pencil-icon')
    const newBinIconElements = screen.getAllByAltText('delete-trash-icon')
    expect(newEditIconElements.length).toEqual(listElements.length - 2)
    expect(newBinIconElements.length).toEqual(listElements.length - 2)
  })

  it('should delete that todo item, when delete icon is clicked', async () => {
    render(
      <TestProvider initialValues={[[todoListAtom, todoItems]]}>
        <ListItem />
      </TestProvider>
    )
    const selectedTodoName = todoItems[0].name
    expect(screen.getByText(selectedTodoName)).toBeInTheDocument()
    const deleteIconElements = screen.getAllByAltText('delete-trash-icon')
    fireEvent.click(deleteIconElements[0])
    expect(screen.queryByText(selectedTodoName)).not.toBeInTheDocument()
  })

  it('should show no todos message, when the last todo item is deleted', () => {
    const todoItems = generateRandomData(1)
    render(
      <TestProvider initialValues={[[todoListAtom, todoItems]]}>
        <ListItem />
      </TestProvider>
    )
    expect(screen.getAllByRole('listitem').length).toBe(1)
    expect(screen.queryByText(appLabels.NO_TODOS_TEXT)).not.toBeInTheDocument()
    const deleteIconElements = screen.getAllByAltText('delete-trash-icon')
    fireEvent.click(deleteIconElements[0])
    const availableTodoItems = screen.queryAllByRole('listitem')
    expect(availableTodoItems.length).toBe(0)
    expect(screen.getByText(appLabels.NO_TODOS_TEXT)).toBeInTheDocument()
  })

  it('should enable the edit field, when edit icon is clicked', () => {
    render(
      <TestProvider initialValues={[[todoListAtom, todoItems]]}>
        <ListItem />
      </TestProvider>
    )
    const editIconElements = screen.getAllByAltText('edit-pencil-icon')
    fireEvent.click(editIconElements[0])
    expect(screen.getByRole('textbox')).toBeInTheDocument()
    expect(screen.getByText(appLabels.CANCEL_LABEL)).toBeInTheDocument()
    expect(screen.getByText(appLabels.SUBMIT_LABEL)).toBeInTheDocument()
  })
})
