'use client'

import { appLabels } from '@/app/app-constants'
import { IListItemType } from '@/app/app-interfaces'
import { atom, useAtom } from 'jotai'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import editIcon from '../../../images/pencil-icon.png'
import deleteIcon from '../../../images/trash-icon.png'
import EditTodo from '../edit-todo'

export const todoListAtom = atom<IListItemType[]>([])

interface IListProps {
  initialTodos: IListItemType[]
}

const ListItem = ({ initialTodos }: IListProps) => {
  const [todoList, setTodoList] = useAtom(todoListAtom)
  const [editItem, setEditItem] = useState('')

  useEffect(() => {
    if (todoList.length === 0) {
      setTodoList([...initialTodos])
    }
  }, [])

  const handleTodoStatusChange = (editTodoId: string) => {
    const updatedTodos = todoList.map((todo) => {
      if (todo.id === editTodoId) {
        todo.status = todo.status === 'Done' ? 'Active' : 'Done'
      }
      return todo
    })
    setTodoList(updatedTodos)
  }

  const handleTodoEdit = (editiTodoId: string) => {
    setEditItem(editiTodoId)
  }

  const handleDeleteTodo = (deleteTodoId: string) => {
    const filteredTodos = todoList.filter((todo) => todo.id !== deleteTodoId)
    setTodoList(filteredTodos)
  }

  return !todoList || todoList.length === 0 ? (
    <div data-testid="no-todos-element">{appLabels.NO_TODOS_TEXT}</div>
  ) : (
    <ul data-testid="list-item-wrapper" className="pl-4">
      {todoList.map(
        (todo) =>
          todo && (
            <li key={todo.id} className="flex gap-4 items-center">
              {editItem === todo.id ? (
                <EditTodo selectedTodo={todo} handleTodoEdit={handleTodoEdit} />
              ) : (
                <>
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
                      <Image
                        src={editIcon}
                        width={20}
                        height={50}
                        alt="edit-pencil-icon"
                        className="cursor-pointer"
                        onClick={() => handleTodoEdit(todo.id)}
                      />
                      <Image
                        src={deleteIcon}
                        width={20}
                        height={50}
                        alt="delete-trash-icon"
                        className="cursor-pointer"
                        onClick={() => handleDeleteTodo(todo.id)}
                      />
                    </>
                  )}
                </>
              )}
            </li>
          )
      )}
    </ul>
  )
}

export default ListItem
