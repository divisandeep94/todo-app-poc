import CreateTodo from '../components/create-todo'

const NewTodo = () => {
  return (
    <section data-testid="new-todo-section" className="flex gap-2 py-10 items-center">
      <CreateTodo />
    </section>
  )
}

export default NewTodo
