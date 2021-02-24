import React, {useReducer} from 'react'
import appContenxt from "./appContext"
import appReducer from "./appReducer"
import axiosCliente from "../../config/axios"
import {
    SHOW_ALERT,
    HIDE_ALERT,
    UPLOAD_FILE,
    UPLOAD_FILE_SUCCESS,
    UPLOAD_FILE_UNSUCCESS,
    CREATE_URL_SUCCESS,
    CREATE_URL_UNSUCCESS,
    CLEAN_STATE,
    ADD_PASSWORD,
    ADD_DOWNLOADS
} from "../../types"
import axios from "axios"


const AppState = ({children}) => {

    const initialState = {
        file_message: null,
        name: "",
        original_name: "",
        loading: null,
        downloads: 1,
        password: "",
        author: null,
        url: ""
    }

    const [state, dispatch] = useReducer(appReducer, initialState)

    const showAlert = msg => {
        dispatch({
            type: SHOW_ALERT,
            payload: msg
        })
        setTimeout(() => {
            dispatch({
                type: HIDE_ALERT
            })
        }, 3000);
    }

    const uploadFile = async (formData, fileName) => {

        dispatch({
            type: UPLOAD_FILE
        })

        try {
            const result = await axiosCliente.post("/api/files", formData)

            dispatch({
                type: UPLOAD_FILE_SUCCESS,
                payload: {
                    name: result.data.file,
                    original_name: fileName
                }
            })
        } catch (error) {
            dispatch({
                type: UPLOAD_FILE_UNSUCCESS,
                payload: error.response.data.msg
            })
        }
    }

    // Create URL once the file was uploaded
    const createUrl = async () => {
        const data ={
            name: state.name,
            original_name: state.original_name,
            downloads: state.downloads,
            password: state.password,
            author: state.author
        }

        try {
            const result = await axiosCliente.post("/api/urls", data)
            dispatch({
                type: CREATE_URL_SUCCESS,
                payload: result.data.msg
            })
        } catch (error) {
            console.log(error)
        }
    }

    const cleanState = () => {
        dispatch({
            type: CLEAN_STATE
        })
    }

    const addPassword = password => {
        dispatch({
            type: ADD_PASSWORD,
            payload: password
        })
    }

    const addDownloads = downloads => {
        dispatch({
            type: ADD_DOWNLOADS,
            payload: downloads
        })
    }

    return (
        <appContenxt.Provider
            value={{
                file_message: state.file_message,
                name: state.name,
                original_name: state.original_name,
                loading: state.loading,
                downloads: state.downloads,
                password: state.password,
                author: state.author,
                url: state.url,
                showAlert,
                uploadFile,
                createUrl,
                cleanState,
                addPassword,
                addDownloads
            }}
        >
            {children}
        </appContenxt.Provider>
    )
}

export default AppState