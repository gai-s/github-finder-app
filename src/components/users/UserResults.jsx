import React from "react"
import { useContext } from 'react'
import GithubContext from '../../context/github/GithubContext'
import UserItem from './UserItem'
import Spinner from '../layout/Spinner'

function UserResults() {   

   const {isLoading, users} = useContext(GithubContext)

  if(isLoading){
    return (<Spinner />)
  } 
  else{
    return (
            <div className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
                {users.map((user) => (<UserItem key={user.id} user={user}/>))}
            </div>
    )
    }
}

export default UserResults