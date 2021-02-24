import React, {useReducer} from 'react'
import authContext from "./authContext"
import authReducer from "./authReducer"
import axiosCliente from "../../config/axios"
import tokenAuth from "../../config/tokenAuth"
import {
    AUTHENTICATED_USER,
    SUCCESSFUL_SIGNUP,
    UNSUCCESSFUL_SIGNUP,
    CLEAN_ALERT,
    SUCCESSFUL_LOGIN,
    UNSUCCESSFUL_LOGIN,
    LOGOUT
} from "../../types/index"

const AuthState = ({children}) => {
    
    const initialState = {
        token: typeof window !== "undefined" ? localStorage.getItem("token") : "",
        authenticated: null,
        user: null,
        message: null
    }

    const [state, dispatch] = useReducer(authReducer, initialState)

    // Clean alerts 
    const handleCleanAlerts = () => {
        setTimeout(() => {
            dispatch({
                type: CLEAN_ALERT
            })
        }, 3000)
    }

    // Register New Users
    const registerUser = async data => {

        try {
            const reply = await axiosCliente.post("/api/users", data)
            dispatch({
                type: SUCCESSFUL_SIGNUP,
                payload: reply.data.msg
            })

        } catch (error) {
            dispatch({
                type: UNSUCCESSFUL_SIGNUP,
                payload: error.response.data.msg
            })
        }

        handleCleanAlerts()
        
    }

    const logIn = async data => {
        
        try {
            const reply = await axiosCliente.post("/api/auth", data)
   
            dispatch({
                type: SUCCESSFUL_LOGIN,
                payload: reply.data.token
            })


        } catch (error) {
            dispatch({
                type: UNSUCCESSFUL_LOGIN,
                payload: error.response.data.msg
            })
        }

        handleCleanAlerts()
    }

    // Returns authenticated user based on JWT
    const authenticatedUser = async () => {
        const token = localStorage.getItem("token")
        if(token) {
            tokenAuth(token)
        }

        try {
            const reply = await axiosCliente.get("/api/auth")
            if(reply.data.user) {
                dispatch({
                    type: AUTHENTICATED_USER,
                    payload: reply.data.user
                })
            } 

        } catch (error) {
            dispatch({
                type: UNSUCCESSFUL_LOGIN,
                payload: error.response.data.msg
            })
        }
    }

    // Logout
    const logOut = () => {
        dispatch({
            type: LOGOUT
        })
    }

    return (
        <authContext.Provider
            value={{
                token: state.token,
                authenticated: state.authenticated,
                user: state.user,
                message: state.message,
                registerUser,
                authenticatedUser,
                logIn,
                logOut
            }}
        >
            {children}
        </authContext.Provider>
    )
}

export default AuthState