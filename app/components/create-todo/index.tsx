'use client'

import { useAtom } from 'jotai'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { v4 as uuid } from 'uuid'
import { appLabels } from '../../constants'
import { todoListAtom } from '../list-item'

const CreateTodo = () => {
  const router = useRouter()
  const [todoValue, setTodoValue] = useState('')
  const [todoList, setTodoList] = useAtom(todoListAtom)

  const handleCancel = () => {
    router.push('/')
  }

  const handleCreate = () => {
    setTodoList([...todoList, { name: todoValue, status: 'Active', id: uuid() }])
    router.push('/')
  }

  return (
    <>
      <label htmlFor="new-todo-input">{appLabels.NEW_TODO_INPUT_LABEL}</label>
      <input
        type="text"
        name="new-todo-form"
        id="new-todo-input"
        placeholder={appLabels.NEW_TODO_INPUT_PLACEHOLDER_TEXT}
        value={todoValue}
        onChange={(e) => setTodoValue(e.target.value)}
        className="border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100"
      />
      <button
        data-testid="todo-cancel-button"
        onClick={handleCancel}
        className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
      >
        {appLabels.NEW_TODO_CANCEL_LABEL}
      </button>
      <button
        data-testid="todo-create-button"
        onClick={handleCreate}
        className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
      >
        {appLabels.NEW_TODO_SUBMIT_LABEL}
      </button>
    </>
  )
}

export default CreateTodo
