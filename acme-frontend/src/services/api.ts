import axios from 'axios'

//url base
const api_url = import.meta.env.VITE_API_URL



//sin token
export const api = axios.create({
    baseURL: api_url,
    headers:{
        "Content-Type":'application/json'
    }
})


//con token
export const apiAuth = axios.create({
    baseURL: api_url,
    headers:{
        "Content-Type":'application/json'
    }
})

//interceptors para agregar token
apiAuth.interceptors.request.use((config) => {
    const token = localStorage.getItem('acme_token') || sessionStorage.getItem('acme_token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

//interceptors para agregar token en la respuesta
apiAuth.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('acme_token')
            localStorage.removeItem('acme_user')
            sessionStorage.removeItem('acme_token')
            sessionStorage.removeItem('acme_user')
            window.location.href = '/login'
        }
        return Promise.reject(error)
    }
)