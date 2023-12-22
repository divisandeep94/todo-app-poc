import { IListItemType } from '@/app/app-interfaces'
import { appLabels } from '@/app/constants'
import { faker } from '@faker-js/faker'
import { fireEvent, render, screen } from '@testing-library/react'
import { Provider } from 'jotai'
import { useHydrateAtoms } from 'jotai/utils'
import ListItem, { todoListAtom } from '.'

interface IHydrateAtomsProps {
  initialValues: any
  children: React.ReactNode
}

interface ITestProviderProps {
  initialValues: any
  children: React.ReactNode
}

const HydrateAtoms: React.FC<IHydrateAtomsProps> = ({ initialValues, children }) => {
  useHydrateAtoms(initialValues)
  return children
}

const TestProvider: React.FC<ITestProviderProps> = ({ initialValues, children }) => (
  <Provider>
    <HydrateAtoms initialValues={initialValues}>{children}</HydrateAtoms>
  </Provider>
)

const todoItems: IListItemType[] = [
  {
    id: faker.string.uuid(),
    name: faker.word.words(),
    status: 'Active',
  },
  {
    id: faker.string.uuid(),
    name: faker.word.words(),
    status: 'Active',
  },
  {
    id: faker.string.uuid(),
    name: faker.word.words(),
    status: 'Active',
  },
]

describe('List-item Component', () => {
  it('render list-item component', () => {
    render(
      <TestProvider initialValues={[[todoListAtom, []]]}>
        <ListItem />
      </TestProvider>
    )
    expect(screen.getByTestId('no-todos-element')).toBeInTheDocument()
    expect(screen.getByText(appLabels.NO_TODOS_TEXT)).toBeInTheDocument()
    expect(screen.queryByTestId('list-item-wrapper')).not.toBeInTheDocument()
  })

  it('render list-item component', () => {
    render(
      <TestProvider initialValues={[[todoListAtom, todoItems]]}>
        <ListItem />
      </TestProvider>
    )
    const listItemEl = screen.getAllByRole('listitem')
    expect(listItemEl.length).toBe(3)
  })

  it('label is rendered with the right value', () => {
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
})
