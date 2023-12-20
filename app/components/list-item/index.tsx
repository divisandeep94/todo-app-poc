import { IListItemType } from '@/app/app-interfaces'
import { appLabels } from '@/app/constants'

interface IListItemProps {
  items: IListItemType[]
}

const ListItem = (props: IListItemProps) => {
  return !props.items || props.items.length === 0 ? (
    <div data-testid="no-todos-element">{appLabels.NO_TODOS_TEXT}</div>
  ) : (
    <ul data-testid="list-item-wrapper" className="pl-4">
      {props.items.map(
        (listItem) =>
          listItem && (
            <li key={listItem.id} className="flex gap-4 items-center">
              <input type="checkbox" name="todo-list" id={listItem.id} className="cursor-pointer peer" />
              <label
                htmlFor={listItem.id}
                className="cursor-pointer peer-checked:line-through peer-checked:text-slate-500"
              >
                {listItem.name}
              </label>
            </li>
          )
      )}
    </ul>
  )
}

export default ListItem
