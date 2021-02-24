import axios from "axios"


const axiosCliente = axios.create({
    baseURL: process.env.backendURL
})

export default axiosCliente