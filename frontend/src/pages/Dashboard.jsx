
import { useEffect, useState } from 'react'
import api from '../services/api'
import { useNavigate } from 'react-router-dom'

function Dashboard() {
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState('')

  const [editId, setEditId] = useState(null)
const [editTitle, setEditTitle] = useState('')

  const navigate = useNavigate()


  const fetchTasks = async () => {
    try {
      const res = await api.get('/tasks')
      setTasks(res.data)
    } catch (err) {
      localStorage.removeItem('token')
      navigate('/login')
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  

  const deleteTask = async (id) => {
    await api.delete(`/tasks/${id}`)
    fetchTasks()
  }

 const startEdit = (task) => {
  setEditId(task._id)
  setEditTitle(task.title)
}

const updateTask = async () => {
  if (!editTitle) return

  await api.put(`/tasks/${editId}`, {
    title: editTitle,
  })

  setEditId(null)
  setEditTitle('')
  fetchTasks()
}

const handleAddOrUpdate = async () => {
  if (editId) {
    await api.put(`/tasks/${editId}`, {
      title: editTitle,
    })
    setEditId(null)
    setEditTitle('')
  } else {
    if (!title) return
    await api.post('/tasks', { title })
    setTitle('')
  }

  fetchTasks()
}




  const logout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <div className="container mt-5" style={{ maxWidth: '500px' }}>
      <div className="d-flex justify-content-between mb-3">
        <h3>Dashboard</h3>
        <button onClick={logout} className="logout">
          Logout
        </button>
      </div>

      {/* Add Task */}
      <div className="d-flex mb-3">
        <input
          className="form-control me-2"
          placeholder="New task"
         
           value={editId ? editTitle : title}
       
          onChange={(e) =>
  editId ? setEditTitle(e.target.value) : setTitle(e.target.value)
}

        />

        <button className="add_button" onClick={handleAddOrUpdate}>
  Add
</button>

        

      </div>

      {/* Task List */}
      {tasks.length === 0 ? (
        <p className='task_p'>No tasks yet</p>
      ) : (
        <ul className="list-group">
          {tasks.map((task) => (
            <li
              key={task._id}
              className="list"
            >
              {task.title}

              <button
                  className="update_btn"
                      onClick={() => startEdit(task)}
>
                      Update
                      </button>


              <button
                className="del_btn"
                onClick={() => deleteTask(task._id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Dashboard
