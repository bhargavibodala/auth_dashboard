import { useEffect, useState } from 'react'
import api from '../services/api'
import { useNavigate } from 'react-router-dom'

function Dashboard() {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get('/me')
        setUser(res.data)
      } catch (err) {
        localStorage.removeItem('token')
        navigate('/login')
      }
    }

    fetchProfile()
  }, [])

  const logout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between">
        <h2>Dashboard</h2>
        <button onClick={logout} className="btn btn-danger">
          Logout
        </button>
      </div>

      {user ? (
        <div className="card mt-4 p-3">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  )
}

export default Dashboard
