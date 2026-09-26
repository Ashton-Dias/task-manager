import { useState } from 'react'

export default function TaskItem({ task, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false)
  const [title, setTitle] = useState(task.title)
  const [dueDate, setDueDate] = useState(task.due_date || '')

  function saveEdit(e) {
    e.preventDefault()
    if (!title.trim()) return
    onUpdate(task.id, { title: title.trim(), due_date: dueDate || null })
    setEditing(false)
  }

  function cancelEdit() {
    setTitle(task.title)
    setDueDate(task.due_date || '')
    setEditing(false)
  }

  if (editing) {
    return (
      <li className="task-item">
        <form className="edit-task-form" onSubmit={saveEdit}>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
          <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
          <button type="submit">Save</button>
          <button type="button" onClick={cancelEdit}>
            Cancel
          </button>
        </form>
      </li>
    )
  }

  return (
    <li className={`task-item ${task.is_complete ? 'complete' : ''}`}>
      <label className="task-check">
        <input
          type="checkbox"
          checked={task.is_complete}
          onChange={(e) => onUpdate(task.id, { is_complete: e.target.checked })}
        />
        <span className="task-title">{task.title}</span>
      </label>
      {task.due_date && <span className="task-due">{task.due_date}</span>}
      <div className="task-actions">
        <button type="button" onClick={() => setEditing(true)}>
          Edit
        </button>
        <button type="button" className="danger" onClick={() => onDelete(task.id)}>
          Delete
        </button>
      </div>
    </li>
  )
}
