'use client'

import { appLabels } from '@/app/app-constants'
import { useRouter } from 'next/navigation'

const Header = () => {
  const router = useRouter()

  const handleNewTodo = () => {
    router.push('/new-todo')
  }
  return (
    <section className="py-4">
      <button
        className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
        onClick={handleNewTodo}
      >
        {appLabels.NEW_TODO_BUTTON_LABEL}
      </button>
    </section>
  )
}

export default Header
