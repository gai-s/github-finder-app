import React from 'react'
import {createContext, useReducer} from 'react'
import GithubReducer from './GithubReducer'

const GithubContext = createContext()

export const GithubContextProvider = ({children}) => {
    
    const GITHUB_API_URL = process.env.REACT_APP_GITHUB_URL
    
    const initialState = {
        users: [],
        user: {},
        repos: [],
        isLoading: false
    }

    const[state ,dispatch] = useReducer(GithubReducer, initialState)

    const searchUsers = async (text) => {
        setLoading()
        const params = `q=${text}`
        console.log("params is: ", `${GITHUB_API_URL}/search/users?${params}`)
        const response = await fetch(`${GITHUB_API_URL}/search/users?${params}`, {
            headers: {
            },
        })
        const {items} = await response.json()
        console.log(items)
        dispatch({
            type: 'GET_USERS',
            payload:{
                users: items,
                isLoading: false
            }
        })
    }
    //Get single user
    const getUser = async (login) => {
        setLoading()
        console.log("params is: ", `${GITHUB_API_URL}/users/${login}`)
        const response = await fetch(`${GITHUB_API_URL}/users/${login}`, {
            headers: {
            },
        })
        if(response === 404){
            window.location = '/notfound'
        } else{
            const data = await response.json()
            console.log(data)
            dispatch({
                type: 'GET_USER',
                payload:{
                    user: data,
                }
            })
        }
    
    }
    //Get user repos
    const getUserRepos = async (login) => {
        setLoading()
        const params = new URLSearchParams({
            sort: 'created',
            per_page: 10,
        })
        console.log("params are: ", params)
        const response = await fetch(`${GITHUB_API_URL}/users/${login}/repos?${params}`, {
            headers: {
            },
        })
        if(response === 404){
            window.location = '/notfound'
        } else{
            const data = await response.json()
            console.log(data)
            dispatch({
                type: 'GET_REPOS',
                payload:{
                    repos: data,
                }
            })
        }
    
    }

    /*Clear User from state*/
    const clearUsers = () => {
        dispatch({type: 'RESET_USERS'})
    }

    const setLoading = () => {
        dispatch({type: 'SET_LOADING'})
    }

    return(
        <GithubContext.Provider 
            value = {{
                users: state.users,
                user: state.user,
                repos: state.repos,
                isLoading: state.isLoading,
                searchUsers,
                getUser,
                getUserRepos,
                clearUsers
            }}
        >
            {children}
        </GithubContext.Provider>
    )
}

export default GithubContext