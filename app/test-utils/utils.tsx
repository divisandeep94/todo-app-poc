import { useHydrateAtoms } from 'jotai/utils'
import { Provider } from 'jotai'
import { IListItemType } from '../app-interfaces'
import { faker } from '@faker-js/faker'

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

export const TestProvider: React.FC<ITestProviderProps> = ({ initialValues, children }) => (
  <Provider>
    <HydrateAtoms initialValues={initialValues}>{children}</HydrateAtoms>
  </Provider>
)

export const generateRandomData = (dataCount: number) => {
  let randomItems: IListItemType[] = []
  for (let index = 0; index < dataCount; index++) {
    randomItems.push({
      id: faker.string.uuid(),
      name: faker.word.words(),
      status: 'Active',
    })
  }
  return randomItems
}
