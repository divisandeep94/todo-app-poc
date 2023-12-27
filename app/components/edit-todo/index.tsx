'use client'

import { appLabels } from '@/app/app-constants'
import { IListItemType } from '@/app/app-interfaces'
import { useAtom } from 'jotai'
import { useEffect, useMemo, useRef } from 'react'
import { todoListAtom } from '../list-item'

export interface IEditTodoProps {
  selectedTodo: IListItemType
  handleTodoEdit: (todoId: string) => void
}

const EditTodo = ({ selectedTodo, handleTodoEdit }: IEditTodoProps) => {
  const editTodoRef = useRef<HTMLInputElement>(null)
  const [todoList, setTodoList] = useAtom(todoListAtom)

  const selectedTodoName = useMemo(() => selectedTodo.name, [selectedTodo.name])

  useEffect(() => {
    if (editTodoRef.current) {
      editTodoRef.current.value = selectedTodoName
    }
  }, [selectedTodoName])

  const handleSaveEdit = (newTodo: IListItemType) => {
    const updatedTodoList = todoList.map((todo: IListItemType) => {
      if (todo.id === newTodo.id) {
        return newTodo
      } else {
        return todo
      }
    })
    setTodoList(updatedTodoList)
    handleTodoEdit('')
  }

  const handleCancel = () => {
    handleTodoEdit('')
  }

  return (
    <section className="flex gap-2 py-2 items-center">
      <input
        type="text"
        placeholder={appLabels.EDIT_TODO_INPUT_PLACEHOLDER_TEXT}
        ref={editTodoRef}
        className="border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100"
      />
      <button
        onClick={handleCancel}
        className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
      >
        {appLabels.CANCEL_LABEL}
      </button>
      <button
        onClick={() => {
          handleSaveEdit({ ...selectedTodo, name: editTodoRef.current?.value || '' })
        }}
        className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
      >
        {appLabels.SUBMIT_LABEL}
      </button>
    </section>
  )
}

export default EditTodo
