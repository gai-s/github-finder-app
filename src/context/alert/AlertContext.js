import {useReducer, createContext} from 'react'
import AlertReducer from './AlertReducer'

const AlertContext = createContext()

export const AlertContextProvider = ({children}) => {
    const initialState = null

    const [state, dispatch] = useReducer(AlertReducer, initialState)

    const setAlert = (text, type) => {
        console.log("text and type are: ", text, type)
        if (type==='error'){
            dispatch({type: 'SET_MESSAGE', payload: {text: text, type: type}})
            setTimeout(()=>dispatch({type: 'CLEAR_MESSAGE'}), 3000)
        }
    }

    return (
    <AlertContext.Provider 
        value = {{
            alert: state,
            setAlert
        }}>
            {children}
    </AlertContext.Provider>
    )
}

export default AlertContext