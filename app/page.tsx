import { appLabels } from './app-constants'
import { IListItemType } from './app-interfaces'
import Header from './components/header'
import ListItem from './components/list-item'

const fetchInitialTodos = async () => {
  const requestUrl = `${appLabels.ROOT_URL}/todo-list`
  const responseData = await fetch(requestUrl, {
    cache: 'no-store',
  })
  if (!responseData.ok) {
    throw new Error(appLabels.ERROR_RESPONSE_TODO)
  }
  return responseData.json()
}

const Main = async () => {
  let initialList: IListItemType[] = []
  try {
    initialList = await fetchInitialTodos()
  } catch (error) {
    // logging the error message when api fails.
    console.log(appLabels.ERROR_MESSAGE_TODO)
    initialList = []
  }

  return !initialList || initialList.length === 0 ? (
    <h1>{appLabels.NO_TODO_RESULTS_TEXT}</h1>
  ) : (
    <div data-testid="main-element">
      <Header />
      <ListItem initialTodos={initialList} />
    </div>
  )
}

export default Main
