import {
    AUTHENTICATED_USER,
    SUCCESSFUL_SIGNUP,
    UNSUCCESSFUL_SIGNUP,
    CLEAN_ALERT,
    SUCCESSFUL_LOGIN,
    UNSUCCESSFUL_LOGIN,
    LOGOUT
} from "../../types/index"


export default (state, action) => {
    switch(action.type) {

        case UNSUCCESSFUL_LOGIN:
        case SUCCESSFUL_SIGNUP:
        case UNSUCCESSFUL_SIGNUP:
            return {
                ...state,
                message: action.payload
            }

        case CLEAN_ALERT:
            return {
                ...state,
                message: null
            }

        case SUCCESSFUL_LOGIN:
            localStorage.setItem("token", action.payload)
            return {
                ...state,
                token: action.payload,
                authenticated: true
            }

        case AUTHENTICATED_USER: 
            return {
                ...state,
                user: action.payload,
                authenticated: true
            }

        case LOGOUT:
            localStorage.removeItem("token")
            return {
                ...state,
                user: null,
                token: null,
                authenticated: null, 
            }
            
        default: 
            return state
    }
} 