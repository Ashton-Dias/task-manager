import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'
import TaskItem from './TaskItem'

export default function Tasks({ user }) {
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  async function fetchTasks() {
    setLoading(true)
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) setError(error.message)
    else setTasks(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  async function addTask(e) {
    e.preventDefault()
    if (!title.trim()) return

    const { data, error } = await supabase
      .from('tasks')
      .insert({ title: title.trim(), due_date: dueDate || null, user_id: user.id })
      .select()
      .single()

    if (error) {
      setError(error.message)
      return
    }

    setTasks((prev) => [data, ...prev])
    setTitle('')
    setDueDate('')
  }

  async function updateTask(id, updates) {
    const { data, error } = await supabase
      .from('tasks')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      setError(error.message)
      return
    }

    setTasks((prev) => prev.map((t) => (t.id === id ? data : t)))
  }

  async function deleteTask(id) {
    const { error } = await supabase.from('tasks').delete().eq('id', id)

    if (error) {
      setError(error.message)
      return
    }

    setTasks((prev) => prev.filter((t) => t.id !== id))
  }

  return (
    <div className="tasks">
      <form className="add-task-form" onSubmit={addTask}>
        <input
          type="text"
          placeholder="Add a task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
        <button type="submit">Add</button>
      </form>

      {error && <p className="form-message error">{error}</p>}

      {loading ? (
        <p className="empty-state">Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <p className="empty-state">No tasks yet. Add one above.</p>
      ) : (
        <ul className="task-list">
          {tasks.map((task) => (
            <TaskItem key={task.id} task={task} onUpdate={updateTask} onDelete={deleteTask} />
          ))}
        </ul>
      )}
    </div>
  )
}
