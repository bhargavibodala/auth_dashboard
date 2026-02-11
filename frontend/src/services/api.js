// import axios from 'axios'

// const api = axios.create({
//   baseURL:  'http://localhost:5000/api',


// })

// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token')
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`
//   }
//   return config
// })

// export default api

import axios from 'axios'

// Replace with your Render backend URL
const api = axios.create({
  baseURL: 'https://authdashboard.onrender.com/api',
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api


