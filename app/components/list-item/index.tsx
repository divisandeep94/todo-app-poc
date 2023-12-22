'use client'

import { IListItemType } from '@/app/app-interfaces'
import { appLabels } from '@/app/constants'
import { atom, useAtom } from 'jotai'
import Image from 'next/image'
import editIcon from '../../../images/pencil-icon.png'
import deleteIcon from '../../../images/trash-icon.png'

export const todoListAtom = atom<IListItemType[]>([])

const ListItem = () => {
  const [todoList, setTodoList] = useAtom(todoListAtom)

  const handleTodoStatusChange = (itemId: string) => {
    const updatedTodos = todoList.map((todo) => {
      if (todo.id === itemId) {
        todo.status = todo.status === 'Done' ? 'Active' : 'Done'
      }
      return todo
    })
    setTodoList(updatedTodos)
  }

  return !todoList || todoList.length === 0 ? (
    <div data-testid="no-todos-element">{appLabels.NO_TODOS_TEXT}</div>
  ) : (
    <ul data-testid="list-item-wrapper" className="pl-4">
      {todoList.map(
        (todo) =>
          todo && (
            <li key={todo.id} className="flex gap-4 items-center">
              <input
                type="checkbox"
                name="todo-list"
                id={todo.id}
                className="cursor-pointer peer"
                onChange={() => {
                  handleTodoStatusChange(todo.id)
                }}
              />
              <label htmlFor={todo.id} className="cursor-pointer  peer-checked:text-slate-500">
                {todo.name}
              </label>
              {todo.status === 'Active' && (
                <>
                  <Image src={editIcon} width={20} height={50} alt="edit-pencil-icon" className="cursor-pointer" />
                  <Image src={deleteIcon} width={20} height={50} alt="delete-trash-icon" className="cursor-pointer" />
                </>
              )}
            </li>
          )
      )}
    </ul>
  )
}

export default ListItem
