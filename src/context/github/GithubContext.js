import React from 'react'
import {createContext, useReducer} from 'react'
import GithubReducer from './GithubReducer'

const GithubContext = createContext()

export const GithubContextProvider = ({children}) => {
    
    const initialState = {
        users: [],
        user: {},
        repos: [],
        isLoading: false
    }

    const[state ,dispatch] = useReducer(GithubReducer, initialState)

    return(
        <GithubContext.Provider 
            value = {{
                ...state,
                dispatch,
            }}
        >
            {children}
        </GithubContext.Provider>
    )
}

export default GithubContext