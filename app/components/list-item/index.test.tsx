import { render, screen } from '@testing-library/react'
import ListItem from '.'
import { IListItemType } from '@/app/app-interfaces'
import { faker } from '@faker-js/faker'
import { appLabels } from '@/app/constants'

describe('List-item Component', () => {
  const todoItems: IListItemType[] = [
    {
      id: faker.string.uuid(),
      name: faker.word.words(),
    },
    {
      id: faker.string.uuid(),
      name: faker.word.words(),
    },
  ]
  test('render list-item component', () => {
    render(<ListItem items={todoItems} />)
    const listItemEl = screen.getByTestId('list-item-wrapper')
    expect(listItemEl).toBeInTheDocument()
  })

  test('load the list elements', () => {
    render(<ListItem items={todoItems} />)
    const listItemEl = screen.getAllByRole('listitem')
    expect(listItemEl.length).toBe(2)
  })

  test('label is rendered with the right value', () => {
    render(<ListItem items={todoItems} />)
    const labelText = todoItems[0].name
    const renderedLabelName = screen.getByText(labelText)
    expect(renderedLabelName).toBeInTheDocument()
    expect(renderedLabelName.textContent).toBe(labelText)
  })

  test('no todos message should display, when no records are available', () => {
    render(<ListItem items={[]} />)
    expect(screen.getByTestId('no-todos-element')).toBeInTheDocument()
    expect(screen.getByText(appLabels.NO_TODOS_TEXT)).toBeInTheDocument()
    expect(screen.queryByTestId('list-item-wrapper')).not.toBeInTheDocument()
  })
})
