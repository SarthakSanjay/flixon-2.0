import axios from 'axios'

const api = axios.create({
  baseURL: "http://localhost:4000",
  withCredentials: true, // Send cookies with requests
})

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        await axios.post(
          "http://localhost:4000/api/refresh",
          {},
          { withCredentials: true }
        )

        return api(originalRequest)
      } catch (refreshError) {
        if (typeof window !== 'undefined') {
          window.location.href = '/login'
        }
      }
    }
    return Promise.reject(error)
  }
)

export default api
