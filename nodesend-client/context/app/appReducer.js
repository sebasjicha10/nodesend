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


export default (state, action) => {

    switch(action.type) {

        case SHOW_ALERT:
            return {
                ...state,
                file_message: action.payload
            }

        case HIDE_ALERT:
            return {
                ...state,
                file_message: null
        }

        case UPLOAD_FILE:
            return {
                ...state,
                loading: true
            }

        case UPLOAD_FILE_SUCCESS:
            return {
                ...state,
                name: action.payload.name,
                original_name: action.payload.original_name,
                loading: null
        }

        case UPLOAD_FILE_UNSUCCESS:
            return {
                ...state,
                file_message: action.payload,
                loading: null
        }

        case CREATE_URL_SUCCESS:
            return {
                ...state,
                url: action.payload
        }

        case CLEAN_STATE:
            return {
                ...state,
                file_message: null,
                name: "",
                original_name: "",
                loading: null,
                downloads: 1,
                password: "",
                author: null,
                url: ""
        }
        
        case ADD_PASSWORD:
            return {
                ...state,
                password: action.payload
        }

        case ADD_DOWNLOADS:
            return {
                ...state,
                downloads: action.payload
        }

        default: 
            return state
    }

}