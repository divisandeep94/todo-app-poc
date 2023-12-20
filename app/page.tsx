import Header from './components/header'
import ListItem from './components/list-item'
import { IListItemType } from './app-interfaces'

const listItems: IListItemType[] = [
  {
    id: '1',
    name: 'Laundry',
  },
  {
    id: '2',
    name: 'Shopping',
  },
]

const Main = () => {
  return (
    <div data-testid="main-element">
      <Header />
      <ListItem items={listItems} />
    </div>
  )
}

export default Main
