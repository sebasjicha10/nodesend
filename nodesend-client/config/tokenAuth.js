import axiosCliente from "./axios"


const tokenAuth = token => {
    if(token) {
        axiosCliente.defaults.headers.common["Authorization"] = `Bearer ${token}`
    } else {
        delete axiosCliente.defaults.headers.common["Authorization"]
    }
}
 
export default tokenAuth